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
  const swiperFrontElRef = useRef(null);

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

  useEffect(() => {
    swiperFrontElRef.current.addEventListener('touchstart', handleTouchStart);        
    swiperFrontElRef.current.addEventListener('touchmove', handleTouchMove);

    var xDown = null;                                                        
    var yDown = null;

    function getTouches(evt) {
      return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }                                                     
                                                                            
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    };                                                
                                                                            
    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;
                                                                            
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* right swipe */
                console.log('right swipe');
                if (swiperElRef.current) {
                  swiperElRef.current.swiper.slideNext();
                }
            } else {
                /* left swipe */
                console.log('left swipe');
                if (swiperElRef.current) {
                  swiperElRef.current.swiper.slidePrev();
                }
            }                       
        } else {
            if ( yDiff > 0 ) {
                /* down swipe */
            } else { 
                /* up swipe */
            }                                                                 
        }
        /* reset values */
        xDown = null;
        yDown = null;                                             
    };



  }, []);

  return (
    <div className='chapter-card room-page'>
      <div className='chapter-background-image-container'>
        <img className='chapter-background-image' alt="" src={`../chapters/${chapterImage}_square.png`}/>
      </div>
      <div className='chapter-location-title'>{locationTitle}</div>
      <div className='room-swiper-wrapper'>
        <swiper-container ref={swiperElRef} slides-per-view="1" effect="coverflow">
          {roomList.map(room => <swiper-slide key={`room-${room.id}`}><RoomItem room={{...room}}></RoomItem></swiper-slide>)}
        </swiper-container>
      </div>
      <div ref={swiperFrontElRef} className='room-swiper-wrapper-front'></div>
      <RoomChooser roomNumbers={roomList.map(currentRoom => currentRoom.number)}/>
      <Link to={`/${chapterId}`}>
        <Back />
      </Link>
    </div>
  );
}
 
export default Rooms;