
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navbar-brand'>
        Pepe
      </span>

      <button className='btn btn-outline-danger'>
        <FontAwesomeIcon icon={solid("arrow-right-from-bracket")} />
        <span> Salir</span>
      </button>
    </div>
  )
}
