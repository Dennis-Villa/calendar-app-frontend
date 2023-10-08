import { DateTime } from "luxon";
import { types } from "../types/types";

const now = DateTime.now();

const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        start: now.toISO(),
        end: now.plus({ hours: 2}).toISO(),
        bgColor: '#fafafa',
        notes: 'Comprar el pastel',
        user: {
          _id: '123',
          name: 'Dennis'
        }
      }],
    active: null,
    shortcut: null,
};

export const eventReducer = (state = initialState, action) => {

    switch (action.type){
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            };

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                        e => ( e.id === action.payload.id ) ? action.payload : e
                    )
            };

        case types.eventSetActive:
            return {
                ...state,
                active: action.payload
            };

        case types.eventClearActive:
            return {
                ...state,
                active: null
            };

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                        e => ( e.id !== state.active.id )
                    ),
                active:null
            };

        case types.eventCreateShortcut:
            return {
                ...state,
                shortcut: action.payload
            };

        case types.eventDeleteShortcut:
            return {
                ...state,
                shortcut: null
            };

        default:
            return state;
    }

};