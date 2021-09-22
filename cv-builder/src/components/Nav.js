import React from 'react';
import '../css/Nav.css';

function Nav({ onClickPreview, isPreview, onClear }) {
  return (
    <nav className="nav">
      <h1 className="nav__heading">CV Builder</h1>
      <ul className="nav__list">
        {isPreview ? '' : <li onClick={onClear}>Clear Template Data</li>}
        <li onClick={onClickPreview}>
          {
            isPreview
              ? 'Fill Details'
              : 'Preview'
          }
        </li>
        {
          isPreview ? <li onClick={() => window.print()}>Print</li> : ''
        }
      </ul>
    </nav>
  )
}

export default Nav;
