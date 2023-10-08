import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { CalendarApp } from './CalendarApp';
import './styles/styles.sass';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(    
    <CalendarApp />
);