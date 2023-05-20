import { useState } from 'react';

import './CreateEntry.css'
import 'react-quill/dist/quill.snow.css';

import CreateEntryChapter from './CreateEntryChapter';
import CreateEntryLocation from './CreateEntryLocation';
import CreateEntryRoom from './CreateEntryRoom';

const CreateEntry = (props) => {
  const { createEntry, newEntryData, setNewEntryData, table, chapterList, locationList } = props;

  const [nextPlace, setNextPlace] = useState(0);
  const [placeClicked, setPlaceClicked] = useState(false);

  function setProperty (property, value) {
    let newEntryDataCopy = {...newEntryData};
    newEntryDataCopy[property] = value;
    setNewEntryData({...newEntryDataCopy});
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
  const tableIsRooms = table === 'rooms';

  setTimeout(() => {
    const newNextPlace = document.querySelectorAll('.entry').length + 1;
    setNextPlace(newNextPlace);
  }, 150);
  
  return (
    <div className='create-entry-wrapper'>
      { tableIsChapters &&
        <CreateEntryChapter
          nextPlace={nextPlace}
          createEntry={createEntry}
          setProperty={setProperty}
          placeInputClickHandler={placeInputClickHandler}
        />
      }
      { tableIsLocations &&
        <CreateEntryLocation
          nextPlace={nextPlace}
          createEntry={createEntry}
          chapterList={chapterList}
          newEntryData={newEntryData}
          setProperty={setProperty}
          placeInputClickHandler={placeInputClickHandler}
        />
      }
      { tableIsRooms &&
        <CreateEntryRoom
          nextPlace={nextPlace}
          createEntry={createEntry}
          chapterList={chapterList}
          locationList={locationList}
          newEntryData={newEntryData}
          setProperty={setProperty}
          placeInputClickHandler={placeInputClickHandler}
        />
      }
    </div>
  );
}
 
export default CreateEntry;