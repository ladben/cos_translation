import './Rooms.css';

import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import { db } from '../../firebase-config';
import { collection, getDocs, getDoc, orderBy, query, where, doc } from 'firebase/firestore';

import RoomItem from './RoomItem';
import RoomChooser from './RoomChooser';
import Back from './Back';

const Rooms = () => {
  register();

  const { chapterId, locationId } = useParams();
  const swiperElRef = useRef(null);

  const [chapterImage, setChapterImage] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const [roomList, setRoomList] = useState([]);

  const roomCollectionRef = collection(db, 'rooms');

  useEffect(() => {
    const getCurrChapterImage = async () => {
      const chapterRef = doc(db, 'chapters', chapterId);
      const chapterSnap = await getDoc(chapterRef);

      setChapterImage(chapterSnap.data().image);
      console.log('got chapter image');
    };

    getCurrChapterImage();

    const getCurrLocationTitle = async () => {
      const locationRef = doc(db, 'locations', locationId);
      const locationSnap = await getDoc(locationRef);

      setLocationTitle(locationSnap.data().title);
      console.log('got location title');
    }

    getCurrLocationTitle();

    const getRooms = async () => {
      const q = query(roomCollectionRef, where('locationId', '==', locationId), orderBy('place'));
      const data = await getDocs(q);
      setRoomList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getRooms();
    console.log('got rooms');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   swiperElRef.current.swiper.on('slideChange', function () {
  //     console.log('slide changed');
  //   });
  // }, []);

  return (
    <div className='chapter-card room-page'>
      <div className='chapter-background-image-container'>
        <img className='chapter-background-image' alt="" src={`../chapters/${chapterImage}`}/>
      </div>
      <div className='chapter-location-title'>{locationTitle}</div>
      <div className='room-swiper-wrapper'>
        <swiper-container ref={swiperElRef} slides-per-view="1" effect="coverflow">
          {roomList.map(room => <swiper-slide key={`room-${room.id}`}><RoomItem room={{...room}}></RoomItem></swiper-slide>)}
          <swiper-slide><div className='phantom-slide-max-height'>PHANTOM</div></swiper-slide>
        </swiper-container>
      </div>
      <RoomChooser roomNumbers={roomList.map(currentRoom => currentRoom.number)}/>
      <Link to={`/${chapterId}`}>
        <Back />
      </Link>
    </div>
  );
}
 
export default Rooms;