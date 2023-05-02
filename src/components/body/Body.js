import './Body.css'

import Back from './Back';
import Chapter from './Chapter';

function Body () {
  return (
    <div className='body-wrapper flex-column-center'>
      <Chapter />
      <Back />
    </div>
  );
}

export default Body;