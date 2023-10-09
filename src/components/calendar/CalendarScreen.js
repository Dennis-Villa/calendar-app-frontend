
import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import {DateTime, Settings} from 'luxon';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventCreateShortcut, eventSetActive, eventStartLoading } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

Settings.defaultLocale = 'es-ES';
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, active } = useSelector( state => state.event );
  const { uid } = useSelector( state => state.auth );

  useEffect(() => {
    dispatch( eventStartLoading() );
  }, [dispatch])
  

  const correctedEvents = events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  const {defaultDate} = useMemo(() => ({
    defaultDate: DateTime.now().toJSDate()
  }), []);

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const onDoubleClick = () => {
    dispatch(
      uiOpenModal()
    );
  };

  const onSelect = (e) => {
    dispatch(
      eventSetActive({
        ...e,
        start: DateTime.fromJSDate(e.start).toISO(),
        end: DateTime.fromJSDate(e.end).toISO()
      })
    );
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    dispatch(
      eventClearActive()
    );

    if(e.action === "doubleClick" || e.action === "select"){
      dispatch(
        eventCreateShortcut({
          start: DateTime.fromJSDate(e.start).toISO(),
          end: DateTime.fromJSDate(e.end).toISO()
        })
      );
      dispatch(
        uiOpenModal()
      );
    }
  };

  const eventStyleGetter = ( event, start, end, isSelected ) => {

      const style = {
        backgroundColor: `${ uid === event.user._id ? '#367cf7' : '#465660' }`,
        borderRadius: '0px',
        opacity: 0.8,
        display: 'block',
        color: 'white'
      }

      return {
        style
      }
   };

  return (
    <div className='calendar-screen'>

      <Navbar/>

      <Calendar defaultDate={defaultDate}
        localizer={localizer}
        view={lastView}
        events={ correctedEvents }
        startAccessor="start"
        endAccessor="end"
        messages={ messages }
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onSelectSlot={ onSelectSlot }
        selectable={true}
        onView={ onViewChange }
        components={{
          event: CalendarEvent
        }}
      />

      {
        ( !!active ) &&
        <DeleteEventFab/>
      }
      
      <AddNewFab/>

      <CalendarModal/>

    </div>
  );
}
