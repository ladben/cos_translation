import './Rooms.css';
import chapterList from '../../assets/files/chapterList.json';
import locationList from '../../assets/files/locationList.json';
import roomList from '../../assets/files/roomList.json';

import { useParams, Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';

import RoomItem from './RoomItem';
import Back from './Back';

const Rooms = () => {
  register();

  const { chapterId, locationId } = useParams();

  const currentChapter = chapterList.filter(chapter => chapter.id === parseInt(chapterId))[0];
  const currentLocation = locationList.filter(location => location.id === parseInt(locationId))[0];
  const currentRoomList = roomList.filter(room => room.locationId === parseInt(locationId));

  console.log(currentLocation);
  console.log(currentRoomList);

  return (
    <div className='chapter-card'>
      <div className='chapter-background-image-container'>
        <img className='chapter-background-image' alt="" src={`../chapters/${currentChapter.image}`}/>
      </div>
      <div className='chapter-location-title'>{currentLocation.title}</div>
      <div className='room-swiper-wrapper'>
        <swiper-container slides-per-view="1" effect="coverflow">
          {currentRoomList.map(room => <swiper-slide><RoomItem key={`room-${room.id}`} room={{...room}}></RoomItem></swiper-slide>)}
        </swiper-container>
      </div>
      <Link to={`/${chapterId}`}>
        <Back />
      </Link>
    </div>
  );
}
 
export default Rooms;