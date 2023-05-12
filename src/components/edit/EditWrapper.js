import './EditWrapper.css'

import { Link } from 'react-router-dom';

const EditWrapper = () => {
  return (
    <div className='edit-wrapper'>
      <Link to="/edit/chapters">Chapters</Link>
      <Link to="/edit/locations">Locations</Link>
      <Link to="/edit/rooms">Rooms</Link>
      <Link to="/" className="back">{'<'}</Link>
    </div>
  );
}
 
export default EditWrapper;