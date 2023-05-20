import './Locations.css'

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../../firebase-config';
import { collection, getDocs, doc, getDoc, query, orderBy, where } from 'firebase/firestore';

import LocationItem from './LocationItem';
import Back from './Back';

const Locations = () => {
  const { chapterId } = useParams();

  const [chapterImage, setChapterImage] = useState('');
  const [locationList, setLocationList] = useState([]);
  const locationCollectionRef = collection(db, 'locations');

  useEffect(() => {
    const getLocations = async () => {
      const q = query(locationCollectionRef, where('chapterId', '==', chapterId), orderBy('place'));
      const data = await getDocs(q);
      setLocationList(data.docs
        .map((doc) => ({...doc.data(), id: doc.id})));
    };

    getLocations();
    console.log('got locations');

    const getCurrChapterImage = async () => {
      const chapterRef = doc(db, 'chapters', chapterId);
      const chapterSnap = await getDoc(chapterRef);

      setChapterImage(chapterSnap.data().image);
    };

    getCurrChapterImage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='chapter-card'>
      <div className='chapter-background-image-container'>
        <img className='chapter-background-image' alt="" src={`chapters/${chapterImage}_square.png`}/>
      </div>
      <div className='body-wrapper'>
        <div className='location-container grid-1'>
          {locationList.map(location => <LocationItem key={`location-${location.id}`} location={{...location}} />)}
        </div>
      </div>
      <Link to="/">
        <Back />
      </Link>
    </div>
  );
}
 
export default Locations;