
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import {DateTime} from 'luxon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActive, eventDeleteShortcut, eventUpdated } from '../../actions/event';

// Estilos del Modal
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

// Fecha y hora de Luxon sin tener en cuenta minutos ni segundos
const now = DateTime.now();
const plainNow = DateTime.fromObject({
    year: now.year,
    month: now.month,
    day: now.day,
    hour: now.hour
});

const initEvent = {
    title: 'Evento',
    notes: '',
    start: plainNow.toJSDate(),
    end: plainNow.plus({hours: 1}).toJSDate(),
    id: new Date().getTime(),
    user: {
        _id: '123',
        name: 'Dennis'
    }
};

export const CalendarModal = () => {

    const dispatch = useDispatch();
    const { modalOpen } = useSelector( state => state.ui );
    const { active, shortcut } = useSelector( state => state.event );

    // Estados para la hora del formulario
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [isTitleValid, setIsTitleValid] = useState(true)

    const [formValues, setFormValues] = useState( initEvent );

    const { title, notes, start, end } = formValues;

    useEffect(() => {
        if(!!active){
            setFormValues({
                ...active,
                start: new Date(active.start),
                end: new Date(active.end)
            });
            setStartDate(new Date(active.start));
            setEndDate(new Date(active.end));
        }
        else if(!!shortcut){
            setFormValues({
                ...initEvent,
                start: new Date(shortcut.start),
                end: new Date(shortcut.end)
            });
            setStartDate(new Date(shortcut.start));
            setEndDate(new Date(shortcut.end));
        }
        else{
            setFormValues(initEvent);
            setStartDate(plainNow.toJSDate());
            setEndDate(plainNow.plus({hours: 1}).toJSDate());
        }
    }, [active, shortcut]);

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    };

    const closeModal = () => {
        // Cerrar el Modal
        dispatch(
            uiCloseModal()
        );
        dispatch(
            eventClearActive()
        );
        dispatch(
            eventDeleteShortcut()
        );

        setFormValues( initEvent );
    };

    const handleStartDateChange = (e) => {
        setStartDate( e );
        setFormValues({
            ...formValues,
            start: e
        });
    };

    const handleEndDateChange = (e) => {
        setEndDate( e );
        setFormValues({
            ...formValues,
            end: e
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if( !(start < end) ){
            Swal.fire('Error', 'La fecha de fin debe ser menor a la de inicio', 'error');
            return;
        }

        if( title.trim().length < 2 ){
            setIsTitleValid(false);
            return;
        }

        // Acceder a la DB
        if(!!active){
            dispatch(
                eventUpdated({
                    ...formValues,
                    start: DateTime.fromJSDate(start).toISO(),
                    end: DateTime.fromJSDate(end).toISO()
                })
            );
        }
        else{
            dispatch(
                eventAddNew({
                    ...formValues,
                    start: DateTime.fromJSDate(start).toISO(),
                    end: DateTime.fromJSDate(end).toISO()
                })
            );
        }
            
        setIsTitleValid(true);
        closeModal();
    };

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {(!!active) ? "Editar Evento" : "Nuevo Evento"} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmit }
            >

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        className="form-control"
                        onChange={ handleStartDateChange } 
                        value={ startDate } 
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        className="form-control"
                        minDate={ startDate }
                        onChange={ handleEndDateChange } 
                        value={ endDate } 
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !isTitleValid ? 'is-invalid' : 'is-valid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <div className="d-grid gap-2 ">
                    <button
                        type="submit"
                        className="btn btn-outline-primary"
                    >
                        <FontAwesomeIcon icon={regular("floppy-disk")} />
                        <span> Guardar</span>
                    </button>
                </div>

            </form>
        </Modal>
    );
}
