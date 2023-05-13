import { Link } from 'react-router-dom';
import { useState } from 'react';

import './EditSideBar.css'

const EditSideBar = () => {
  
  const [title, setTitle] = useState('Edit');

  const navigationClickHandler = (e) => {
    const links = document.querySelectorAll('.links a');
    links.forEach((link) => {
      if (link === e.target) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  return (
    <div className='navigation'>
      <div className='title'>{title}</div>
      <div className='links'>
        <Link to="/edit/chapter-edit"
          onClick={(e) => {
            setTitle('Edit Chapters');
            navigationClickHandler(e);
          }}>
            Chapters
        </Link>
        <Link to="/edit/location-edit"
          onClick={(e) => {
            setTitle('Edit Locations');
            navigationClickHandler(e);
          }}>
            Locations
        </Link>
        <Link to="/edit/room-edit"
          onClick={(e) => {
            setTitle('Edit Rooms');
            navigationClickHandler(e);
          }}>
            Rooms
        </Link>
      </div>
      <Link to="/" className="back">Back</Link>
    </div>
  );
}
 
export default EditSideBar;