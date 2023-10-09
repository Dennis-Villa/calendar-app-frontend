import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {

            const resp = await fetchConToken( 
                'events', 
                event, 
                'POST' 
            );
            const body = await resp.json();


            if( body.ok ){
                event.id = body.evento.id;
                event.user = {
                    uid: uid,
                    name: name
                }
            
                dispatch( eventAddNew({
                    event
                }));

                dispatch( eventStartLoading() );
            }
            else {
                Swal.fire('Error', body.msg, 'error');
            }
        }
        catch (e) {
            console.log(e);
        }

    };
};

const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventStartUpdate = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        if( uid !== event.id ){
            Swal.fire('Error', 'No tiene privilegios para editar este evento', 'error');
        }
        else{
            try {

                const resp = await fetchConToken( 
                    `events/${event.id}`, 
                    event, 
                    'PUT' 
                );
                const body = await resp.json();
    
    
                if( body.ok ){
                    dispatch( eventUpdated( event ) );
                }
                else {
                    Swal.fire('Error', body.msg, 'error');
                }
            }
            catch (e) {
                console.log(e);
            }
        }

    };
};

const eventUpdated = (event) => ({
    type: types.eventUpdated,
    payload: event
});

export const eventSetActive = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventClearActive = () => ({
    type: types.eventClearActive,
});

export const eventStartDelete = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const { active } = getState().event;

        if( uid !== active.user._id ){
            Swal.fire('Error', 'No tiene privilegios para borrar este evento', 'error');
        }
        else{
            try {

                const resp = await fetchConToken( 
                    `events/${active.id}`, 
                    {}, 
                    'DELETE' 
                );
                const body = await resp.json();
    
    
                if( body.ok ){
                    dispatch( eventDeleted() );
                }
                else {
                    Swal.fire('Error', body.msg, 'error');
                }
            }
            catch (e) {
                console.log(e);
            }
        }

    };
};

const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventCreateShortcut = (shortcut) => ({
    type: types.eventCreateShortcut,
    payload: shortcut
});

export const eventDeleteShortcut = () => ({
    type: types.eventDeleteShortcut,
});

export const eventStartLoading = () => {
    return async( dispatch ) => {

        try {

            const resp = await fetchConToken( 'events' );
            const body = await resp.json();

            if( body.ok ){
                dispatch( eventLoaded( body.eventos ) );
            }
            else {
                Swal.fire('Error', body.msg, 'error');
            }
        }
        catch (e) {
            console.log(e);
        }

    };
};

const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventLogout = () => ({
    type: types.eventLogout
});
