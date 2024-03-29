
import React from 'react';
import { eventStartDelete } from '../../actions/event';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useDispatch } from 'react-redux';

export const DeleteEventFab = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
      dispatch(
        eventStartDelete()
      );
    };
  
    return (
      <div onClick={handleClick}>
        <button 
            className="btn btn-danger rounded-pill fab-danger"
        >
            <FontAwesomeIcon icon={solid("trash")}/>
        </button>
      </div>
      
    )
}
