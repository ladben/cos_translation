import { useState } from 'react';
import ReactQuill from 'react-quill';

import './CreateEntry.css'
import 'react-quill/dist/quill.snow.css';

const CreateEntry = (props) => {
  const { createEntry, newEntryData, setNewEntryData, table, chapterList } = props;

  const [nextPlace, setNextPlace] = useState(0);
  const [placeClicked, setPlaceClicked] = useState(false);

  function setProperty (property, value) {
    let newEntryDataCopy = {...newEntryData};
    newEntryDataCopy[property] = value;
    setNewEntryData({...newEntryDataCopy});
    console.log(`ran with ${property}: ${value}`);
  }

  function placeInputClickHandler (e) {
    if (!placeClicked) {
      e.target.value = e.target.placeholder;
      setProperty ('place', Number(e.target.placeholder));
      setPlaceClicked(true);
    }
  }

  const tableIsChapters = table === 'chapters';
  const tableIsLocations = table === 'locations';

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
                onClick={(event) => {placeInputClickHandler(event)}}
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
      { tableIsLocations &&
        <div className='create-entry'>
          <div className='create-entry-title'>Create new location</div>
          <div className='create-entry-inputs'>
            <div className='chapter-id-input'>
              <select
                name="chapter-id"
                onChange={(event) => {setProperty("chapterId", event.target.value)}}
              >
                <option value="">Select a chapter</option>
                {chapterList.map((chapter, index) =>
                  <option key={`chapter-option-${index}`} value={chapter.id}>{chapter.title}</option>)
                }
              </select>
            </div>
            <div className='place-input'>
              <label htmlFor="place">Place</label>
              <input
                name="place"
                placeholder={nextPlace}
                onChange={(event) => {setProperty("place", Number(event.target.value))}}
                onClick={(event) => {placeInputClickHandler(event)}}
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
            <div className='text-input'>
              <label htmlFor="text">Text</label>
              <ReactQuill
                theme="snow"
                value={newEntryData.text}
                onChange={(event) => {setProperty("text", event)}} />
            </div>
            <div className='note-input'>
              <label htmlFor="note">Note</label>
              <input
                name="note"
                onChange={(event) => {setProperty("note", event.target.value)}}
              />
            </div>
          </div>
        <div className='create-entry-button' onClick={() => {createEntry(); console.log(newEntryData)}}>Create Location</div>
      </div>
      }
    </div>
  );
}
 
export default CreateEntry;