import { types } from "../types/types";

export const eventAddNew = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventUpdated = (event) => ({
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

export const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventCreateShortcut = (shortcut) => ({
    type: types.eventCreateShortcut,
    payload: shortcut
});

export const eventDeleteShortcut = () => ({
    type: types.eventDeleteShortcut,
});