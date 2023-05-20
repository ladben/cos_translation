import './EditDashboard.css';

import { useEffect, useState } from "react";
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

import EntryList from './EntryList';
import CreateEntry from './CreateEntry';
import DeleteConfirm from './modals/DeleteConfirm';

const EditDashboard = (props) => {

  const { table } = props;

  const [newEntryData, setNewEntryData] = useState({});

  const [entries, setEntries] = useState([]);
  const [chapterList, setChapterList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [deleteEntryId, setDeleteEntryId] = useState(0);
  const [deleteEntryTitle, setDeleteEntryTitle] = useState('');

  const tableCollectionRef = collection(db, table);

  const createEntry = async () => {
    await addDoc(tableCollectionRef, { ...newEntryData });
    window.location.reload(false);
  }

  const updateEntry = async (id, image) => {
    const tableDoc = doc(db, table, id);
    const newFields = {image: image + '1'};
    await updateDoc(tableDoc, newFields);
  }

  const deleteEntry = async (id) => {
    const tableDoc = doc(db, table, id);
    await deleteDoc(tableDoc);
    window.location.reload(false);
  }

  useEffect(() => {
    const getEntries = async () => {
      const data = await getDocs(tableCollectionRef);
      setEntries(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    console.log('got data');

    getEntries();

    if (table === 'locations' || table === 'rooms') {
      const chapterCollectionRef = collection(db, 'chapters');
      const getChapters = async () => {
        const data = await getDocs(chapterCollectionRef);
        setChapterList(data.docs.map((doc) => {
          const chapterData = {...doc.data()};
          return {place: chapterData.place, title: chapterData.title, id: doc.id};
        }).sort((currChapter, nextChapter) => {
          if (currChapter.place < nextChapter.place) {
            return -1;
          }
  
          if (currChapter.place > nextChapter.place) {
            return 1;
          }
  
          return 0;
        }));
      }

      getChapters();
    }

    if (table === 'rooms') {
      const locationCollectionRef = collection(db, 'locations');
      const getLocations = async () => {
        const data = await getDocs(locationCollectionRef);
        setLocationList(data.docs.map((doc) => {
          const locationData = {...doc.data()};
          return {place: locationData.place, title: locationData.title, chapterId: locationData.chapterId, id: doc.id};
        }).sort((currLocation, nextLocation) => {
          if (currLocation.place < nextLocation.place) {
            return -1;
          }

          if (currLocation.place > nextLocation.place) {
            return 1;
          }

          return 0;
        }));
      }

      getLocations();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CreateEntry
        createEntry={createEntry}
        newEntryData={newEntryData}
        setNewEntryData={setNewEntryData}
        table={table}
        chapterList={chapterList}
        locationList={locationList}
      />
      <EntryList
        entries={[...entries]}
        updateEntry={updateEntry}
        setDeleteEntryId={setDeleteEntryId}
        setDeleteEntryTitle={setDeleteEntryTitle}
        chapterList={chapterList}
        locationList={locationList}
      />
      <DeleteConfirm entryId={deleteEntryId} entryTitle={deleteEntryTitle} deleteEntry={deleteEntry} />
    </div>
  );
}
 
export default EditDashboard;