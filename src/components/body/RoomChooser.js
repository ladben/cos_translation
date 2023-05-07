import './RoomChooser.css'

function toggleChooser (e) {
  const roomChooser = e.target.closest('.room-chooser-wrapper');
  roomChooser.classList.toggle('closed');
  if (roomChooser.classList.contains('closed')) {
    const ctaChoose = roomChooser.querySelector('.cta-choose');
    ctaChoose.classList.add('closing');
    setTimeout(() => {
      ctaChoose.classList.remove('closing');
    }, 300);
  }
}

function setSlider (roomPosition) {
  const sliderElement = document.querySelector('.room-swiper-wrapper swiper-container');
  if (sliderElement) {
    sliderElement.swiper.slideTo(roomPosition, 500, false);
  }
}

const RoomChooser = (props) => {
  const { roomNumbers } = props;

  return (
    <div className='room-chooser-wrapper closed' onClick={(e) => toggleChooser(e)}>
      <div className='cta-choose'>
        Válassz szobát!
        <div className='cta-options'>
          <div className='cta-options-grid'>
            {roomNumbers.map((roomNumber, i) => <div key={`room-number-${i}`} onClick={() => setSlider(i)}><div>{roomNumber}</div></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default RoomChooser;