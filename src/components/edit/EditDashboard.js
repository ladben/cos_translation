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

    getEntries()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CreateEntry
        createEntry={createEntry}
        newEntryData={newEntryData}
        setNewEntryData={setNewEntryData}
        table={table}
      />
      <EntryList
        entries={[...entries]}
        updateEntry={updateEntry}
        setDeleteEntryId={setDeleteEntryId}
        setDeleteEntryTitle={setDeleteEntryTitle}
      />
      <DeleteConfirm entryId={deleteEntryId} entryTitle={deleteEntryTitle} deleteEntry={deleteEntry} />
    </div>
  );
}
 
export default EditDashboard;