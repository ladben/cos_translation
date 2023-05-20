import './Chapters.css'

import { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import ChapterItem from './ChapterItem';

// function calculateParallax (element) {
//   const rect = element.getBoundingClientRect();

  
//   const marginTop = 90;
//   const boundingTop = rect.top;
//   const parentHeight = element.parentElement.offsetHeight;

//   const limitTop = -30;
//   const limitBottom = parentHeight + marginTop;
//   const bottomPosition = limitBottom - limitTop

//   if (boundingTop > limitBottom) {
//     return 70;
//   } 
//   if (boundingTop < limitTop) {
//     return 30;
//   }

//   const offsetPercent = boundingTop / bottomPosition
//   const parallax = 30 + (40 * offsetPercent);

//   return parallax;
// }

// function updateImagesOffset (chapter) {
//   const chapterWrappers = chapter.querySelectorAll('a.chapter-wrapper');
//   chapterWrappers.forEach(chapterWrapper => {
//     const parallax = calculateParallax(chapterWrapper);
//     const chapterImage = chapterWrapper.querySelector('img.chapter-image');
//     chapterImage.style.transform = `translate(-50%, -${parallax}%)`
//   });
//   console.log('images edited');
// }

function Chapters () {
  const [chapterList, setChapterList] = useState([]);
  const chapterCollectionRef = collection(db, 'chapters');
  useEffect(() => {
    const getChapters = async () => {
      const q = query(chapterCollectionRef, orderBy('place'));
      const data = await getDocs(q);
      setChapterList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }

    getChapters();
    console.log('got chapters');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const chapterEl = useRef(null);

  // useEffect(() =>  updateImagesOffset (chapterEl.current), []);

  return (
    <div
      className='body-wrapper grid-1'
      // ref={chapterEl}
      // onScroll={() => {updateImagesOffset(chapterEl.current)}}
    >
      {chapterList.map(chapter => <ChapterItem key={`chapter-${chapter.id}`} chapterId={chapter.id} number={chapter.number} title={chapter.title} imageName={chapter.image} />)}
    </div>
  );
}

export default Chapters;