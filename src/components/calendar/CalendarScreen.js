
import React, { useMemo, useState } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import {DateTime, Settings} from 'luxon';
import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive, eventCreateShortcut, eventSetActive } from '../../actions/event';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

Settings.defaultLocale = 'es-ES';
const localizer = luxonLocalizer(DateTime, { firstDayOfWeek: 1 });

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const { events, active } = useSelector( state => state.event );

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
        backgroundColor: '#367cf7',
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
