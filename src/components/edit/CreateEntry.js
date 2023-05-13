import { useState } from 'react';
import './CreateEntry.css'

const CreateEntry = (props) => {
  const { createEntry, newEntryData, setNewEntryData, table } = props;

  const [nextPlace, setNextPlace] = useState(0);

  function setProperty (property, value) {
    let newEntryDataCopy = {...newEntryData};
    newEntryDataCopy[property] = value;
    setNewEntryData({...newEntryDataCopy});
  }

  const tableIsChapters = table === 'chapters';

  setTimeout(() => {
    const newNextPlace = document.querySelectorAll('.entry').length + 1;
    setNextPlace(newNextPlace);
  }, 150);
  
  return (
    <div className='create-entry-wrapper'>
      { tableIsChapters &&
        <div className='create-entry'>
          <div className='create-entry-title'>Create new chapter</div>
          <div className='create-entry-inputs'>
            <div className='place-input'>
              <label htmlFor="place">Place</label>
              <input
                name="place"
                placeholder={nextPlace}
                onChange={(event) => {setProperty("place", Number(event.target.value))}}
              />
            </div>
            <div className='number-input'>
              <label htmlFor="number">Number</label>
              <input
                name="number"
                onChange={(event) => {setProperty("number", event.target.value)}}
              />
            </div>
            <div className='title-input'>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                onChange={(event) => {setProperty("title", event.target.value)}}
              />
            </div>
            <div className='image-input'>
              <label htmlFor="image">Image</label>
              <input
                name="image"
                onChange={(event) => {setProperty("image", event.target.value)}}
              />
            </div>
          </div>
          <div className='create-entry-button' onClick={() => {createEntry()}}>Create Chapter</div>
        </div>
      }
    </div>
  );
}
 
export default CreateEntry;