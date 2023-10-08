
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from 'react'
import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActive } from '../../actions/event';

export const AddNewFab = () => {

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      eventClearActive()
    );
    dispatch(
      uiOpenModal()
    );
  };

  return (
    <div onClick={handleClick}>
<button 
        className="btn btn-primary rounded-circle fab"
    >
        <FontAwesomeIcon icon={solid("plus")}/>
    </button>
    </div>
    
  )
}
