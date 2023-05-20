import ReactQuill from 'react-quill';
import CreateEntryInput from './CreateEntryInput';

import './CreateEntryLocation.css'

const CreateEntryLocation = (props) => {
  const { nextPlace, createEntry, chapterList, newEntryData, setProperty, placeInputClickHandler } = props;

  return (
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
 
export default CreateEntryLocation;