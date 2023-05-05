import './RoomItem.css';

const parse = require('html-react-parser');

const RoomItem = (props) => {
  const { room } = props;
  console.log(room);
  return (
    <div className='room-wrapper'>
      <div className='room-title'>{room.title}</div>
      <div className='room-text'>{parse(room.text)}</div>
    </div>
  );
}
 
export default RoomItem;