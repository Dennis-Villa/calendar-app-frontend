
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector( state => state.auth );

  const handleLogout = () => {
    dispatch( startLogout() );
  };

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>
        {name}
      </span>

      <button 
        className='btn btn-outline-danger'
        onClick={handleLogout}
      >
        <FontAwesomeIcon icon={solid("arrow-right-from-bracket")} />
        <span> Salir</span>
      </button>
    </div>
  )
}
