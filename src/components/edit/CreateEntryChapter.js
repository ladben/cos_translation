import CreateEntryInput from './CreateEntryInput';

import './CreateEntryChapter.css'

const CreateEntryChapter = (props) => {
  const { nextPlace, createEntry, setProperty, placeInputClickHandler } = props;

  return (
    <div className='create-entry'>
      <div className='create-entry-title'>Create new chapter</div>
      <div className='create-entry-inputs'>
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
        <CreateEntryInput
          className='image-input'
          inputName='image'
          label='Image'
          placeholder={undefined}
          changeHandler={(event) => {setProperty("image", event.target.value)}}
          clickHandler={undefined}
        />
      </div>
      <div className='create-entry-button' onClick={() => {createEntry()}}>Create Chapter</div>
    </div>
  );
}
 
export default CreateEntryChapter;