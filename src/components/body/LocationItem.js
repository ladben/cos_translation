import './LocationItem.css'
import roomList from '../../assets/files/roomList.json'

import { useEffect, useRef } from 'react';

const parse = require('html-react-parser');

const LocationItem = (props) => {
  const { location } = props;
  const currentRoomList = roomList.filter(room => room.locationId === parseInt(location.id));
  const locationHasRooms = currentRoomList.length === 0 ? false : true;

  const locationRef = useRef(null);
  const locationNoteRef = useRef(null);

  useEffect(() => {
      locationRef.current.addEventListener('click', (e) => {
        if (!e.target.closest('.location-note-container')) {
          e.target.closest('.location-wrapper').classList.toggle('closed');
           if (locationNoteRef.current) {
            locationNoteRef.current.classList.add('closed');
           }
        }
      });

      if (locationNoteRef.current) {
        locationNoteRef.current.addEventListener('click', (e) => {
          e.target.closest('.location-note-container').classList.toggle('closed');
        });
      }
  }, []);

  return (
    <div ref={locationRef} className='location-wrapper closed'>
      <div className='location-number'>{location.number}</div>
      {location.note && <div ref={locationNoteRef} className='location-note-container closed'><div className='location-note'>{location.note}</div></div>}
      <div className='location-body flex-column-center'>
        <div className='location-title'>{location.title}</div>
        <div className='location-text'>{parse(location.text)}</div>
        {locationHasRooms && <div className='location-jump-to-rooms'>TOVÁBB</div>}
      </div>
    </div>
  );
}
 
export default LocationItem;