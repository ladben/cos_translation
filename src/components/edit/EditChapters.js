import './EditChapters.css';

import { useEffect, useState } from "react";
import { db } from '../../firebase-config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const EditChapters = () => {

  const [newNumber, setNewNumber] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newImage, setNewImage] = useState("");
  const [chapters, setChapters] = useState([]);
  const chaptersCollectionRef = collection(db, "chapters");

  const createChapter = async () => {
    await addDoc(chaptersCollectionRef, { number: newNumber, title: newTitle, image: newImage });
  }

  const updateChapter = async (id, image) => {
    const chapterDoc = doc(db, "chapters", id);
    const newFields = {image: image + '1'};
    await updateDoc(chapterDoc, newFields);
  }

  const deleteChapter = async (id) => {
    const chapterDoc = doc(db, "chapters", id);
    await deleteDoc(chapterDoc);
  }

  useEffect(() => {
    const getChapters = async () => {
      const data = await getDocs(chaptersCollectionRef);
      setChapters(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getChapters()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="edit-wrapper">
      <input placeholder="Number..." onChange={(event) => {setNewNumber(event.target.value)}}/>
      <input placeholder="Title..." onChange={(event) => {setNewTitle(event.target.value)}}/>
      <input placeholder="Image..." onChange={(event) => {setNewImage(event.target.value)}}/>
      <button onClick={createChapter}>Create Chapter</button>
      {chapters.map((chapter, index) => {
        return (
          <div key={`chapter-mapping-${index}`}>
            <h1>Number: {chapter.number}</h1>
            <h1>Title: {chapter.title}</h1>
            <h1>Image: {chapter.image}</h1>
            <button onClick={() => {updateChapter(chapter.id, chapter.image)}}>Change Image</button>
            <button onClick={() => {deleteChapter(chapter.id)}}>Delete Chapter</button>
          </div>
        )
      })}
      <Link to="/edit" className="back">{'<'}</Link>
    </div>
  );
}
 
export default EditChapters;