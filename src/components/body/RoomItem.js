import './RoomItem.css';

const parse = require('html-react-parser');

const RoomItem = (props) => {
  const { room } = props;

  return (
    <div className='room-wrapper'>
      <div className='room-title'>
        <span className='room-number'>{room.number} </span>
        {room.title}
      </div>
      {room.note && <div className='room-note'>{room.note}</div>}
      <div className='room-text'>{parse(room.text)}</div>
    </div>
  );
}
 
export default RoomItem;