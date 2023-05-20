import './ChapterItem.css'

import { Link } from 'react-router-dom';

const ChapterItem = (props) => {
  const {chapterId, number, title, imageName } = props;

  return (
    <Link to={`/${chapterId}`} className="chapter-wrapper">
      <div className='chapter-number'>{number}</div>
      <div className='chapter-title'>{title}</div>
      <div className='chapter-image-container'>
        <img className='chapter-image' alt="" src={`chapters/${imageName}`} />
      </div>
    </Link>
  );
}
 
export default ChapterItem;