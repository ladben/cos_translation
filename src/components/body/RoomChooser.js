import './RoomChooser.css'

function toggleChooser (e) {
  e.target.closest('.room-chooser-wrapper').classList.toggle('closed');
}

const RoomChooser = (props) => {
  const { roomNumbers } = props;

  return (
    <div className='room-chooser-wrapper closed' onClick={(e) => toggleChooser(e)}>
      <div className='cta-choose'>
        Válassz szobát!
        <div className='cta-options'>
          <div className='cta-options-grid'>
            {roomNumbers.map((roomNumber, i) => <div key={`room-number-${i}`}>{roomNumber}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default RoomChooser;