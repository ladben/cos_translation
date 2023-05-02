import './Back.css'
import pageturn from '../../assets/images/back.png';

function Back () {
  return (
    <div className='back-button-container'>
      <img alt="back" src={pageturn}></img>
    </div>
  );
}

export default Back;