import './LocationItem.css'
// import roomList from '../../assets/files/roomList.json'

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, getDocs, query, where } from 'firebase/firestore';

const parse = require('html-react-parser');

const LocationItem = (props) => {
  const { location } = props;

  const [roomList, setRoomList] = useState([]);
  const roomCollectionRef = collection(db, 'rooms');

  useEffect(() => {
    const getRooms = async () => {
      const q = query(roomCollectionRef, where('locationId', '==', location.id));
      const data = await getDocs(q);
      setRoomList(data.docs
        .map((doc) => ({...doc.data(), id: doc.id})));
    };

    getRooms();
    console.log('got rooms');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const locationHasRooms = roomList.length === 0 ? false : true;

  const locationRef = useRef(null);
  const locationNoteRef = useRef(null);

  useEffect(() => {
      locationRef.current.addEventListener('click', (e) => {
        if (!e.target.closest('.location-note-container') && !e.target.closest('.location-jump-to-rooms')) {
          const locationWrapper = e.target.closest('.location-wrapper');
          locationWrapper.classList.toggle('closed');
          document.querySelectorAll('.location-note-container').forEach(locationNote => locationNote.classList.add('closed'));
          setTimeout(() => {
            if (!locationWrapper.classList.contains('closed')) {
              const topPosition = locationWrapper.offsetTop;
              locationWrapper.parentElement.parentElement.scrollTo({top: topPosition, left: 0, behavior: 'smooth'});
            }
          }, 50);
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
      {location.note && <div ref={locationNoteRef} className='location-note-container closed'><div className='location-note'>{location.note}</div></div>}
      <div className='location-title'>{location.number} {location.title}</div>
      <div className='location-text'>{parse(location.text)}</div>
      {locationHasRooms && <Link to={`/${location.chapterId}/${location.id}`} className='location-jump-to-rooms'>TOVÁBB</Link>}
    </div>
  );
}
 
export default LocationItem;