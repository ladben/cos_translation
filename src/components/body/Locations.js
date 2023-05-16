import './Locations.css'
import locationList from '../../assets/files/locationList.json';
import chapterList from '../../assets/files/chapterList.json';

import { useParams, Link } from 'react-router-dom';

import LocationItem from './LocationItem';
import Back from './Back';

const Locations = () => {
  const { chapterId } = useParams();

  const currentChapter = chapterList.filter(chapter => chapter.id === parseInt(chapterId))[0];
  const currentLocationList = locationList.filter(location => location.chapterId === parseInt(chapterId));

  return (
    <div className='chapter-card'>
      <div className='chapter-background-image-container'>
        <img className='chapter-background-image' alt="" src={`chapters/${currentChapter.image}_square.png`}/>
      </div>
      <div className='body-wrapper'>
        <div className='location-container grid-1'>
          {currentLocationList.map(location => <LocationItem key={`location-${location.id}`} location={{...location}} />)}
        </div>
      </div>
      <Link to="/">
        <Back />
      </Link>
    </div>
  );
}
 
export default Locations;