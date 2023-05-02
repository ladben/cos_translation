import './Locations.css'
import locationList from '../../assets/files/locationList.json';

import { useParams, Link } from 'react-router-dom';

import LocationItem from './LocationItem';
import Back from './Back';

const Locations = () => {
  const { chapterId } = useParams();

  const currentLocationList = locationList.filter(location => location.chapterId === parseInt(chapterId));

  return (
    <div className='body-wrapper grid-1'>
      {currentLocationList.map(location => <LocationItem key={`location-${location.id}`} location={{...location}} />)}
      <Link to="/">
        <Back />
      </Link>
    </div>
  );
}
 
export default Locations;