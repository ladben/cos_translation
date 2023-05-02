import './Chapters.css'
import chapterList from '../../assets/files/chapterList.json';

import ChapterItem from './ChapterItem';

function Chapters () {
  return (
    <div className='body-wrapper grid-1'>
      {chapterList.map(chapter => <ChapterItem key={`chapter-${chapter.id}`} chapterId={chapter.id} number={chapter.number} title={chapter.title} imageName={chapter.image} />)}
    </div>
  );
}

export default Chapters;