import ReactQuill from 'react-quill';
import CreateEntryInput from './CreateEntryInput';

import './CreateEntryRoom.css'
import { useState } from 'react';

const CreateEntryRoom = (props) => {
  const { nextPlace, createEntry, chapterList, locationList, newEntryData, setProperty, placeInputClickHandler } = props;

  const [currentChapterId, setCurrentChapterId] = useState('');

  const selectChangeHandler = (chapterId) => {
    setCurrentChapterId(chapterId);
  }

  const chapterArr = chapterList.map((chapter, index) => {
    return (
      <option key={`chapter-option-${index}`} value={chapter.id}>{chapter.title}</option>
    );
  });

  const locationArr = locationList
    .filter((location) => location.chapterId === currentChapterId)
    .map((location, index) => {
    return (
      <option key={`location-option-${index}`} value={location.id}>{location.title}</option>
    );
  });

  return (
    <div className='create-entry'>
      <div className='create-entry-title'>Create new room</div>
      <div className='create-entry-inputs'>
        <div className='chapter-id-input'>
          <select
            name="chapter-id"
            onChange={(event) => {
              setProperty("chapterId", event.target.value);
              selectChangeHandler(event.target.value);
            }}
          >
            <option value="">Select a chapter</option>
            {chapterArr}
          </select>
        </div>
        <div className='location-id-input'>
          <select
            name="location-id"
            onChange={(event) => {setProperty("locationId", event.target.value)}}
          >
            <option value="">Select a location</option>
            {locationArr}
          </select>
        </div>
        <CreateEntryInput
          className='place-input'
          inputName='place'
          label='Place'
          placeholder={nextPlace}
          changeHandler={(event) => {setProperty("place", Number(event.target.value))}}
          clickHandler={(event) => {placeInputClickHandler(event)}}
        />
        <CreateEntryInput
          className='number-input'
          inputName='number'
          label='Number'
          placeholder={undefined}
          changeHandler={(event) => {setProperty("number", event.target.value)}}
          clickHandler={undefined}
        />
        <CreateEntryInput
          className='title-input'
          inputName='title'
          label='Title'
          placeholder={undefined}
          changeHandler={(event) => {setProperty("title", event.target.value)}}
          clickHandler={undefined}
        />
        <div className='text-input'>
          <label htmlFor="text">Text</label>
          <ReactQuill
            theme="snow"
            value={newEntryData.text}
            onChange={(event) => {setProperty("text", event)}} />
        </div>
        <CreateEntryInput
          className='note-input'
          inputName='note'
          label='Note'
          placeholder={undefined}
          changeHandler={(event) => {setProperty("note", event.target.value)}}
          clickHandler={undefined}
        />
      </div>
      <div className='create-entry-button' onClick={() => {createEntry()}}>Create Location</div>
    </div>
  );
}
 
export default CreateEntryRoom;