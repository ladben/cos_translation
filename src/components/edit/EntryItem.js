import Icon from 'react-crud-icons';

import './EntryItem.css';

import EntryItemSection from './EntryItemSection';

const parse = require('html-react-parser');

const EntryItem = (props) => {
  const { entry, chapterList, locationList, updateEntry, setDeleteEntryId, setDeleteEntryTitle } = props;

  const openDeleteModal = (id, title) => {
    const deleteModal = document.querySelector('.delete-modal-wrapper');
    if (deleteModal) {
      setDeleteEntryId(id);
      setDeleteEntryTitle(title);
      deleteModal.classList.add('open');
    }
  }

  const decodeChapter = (chapterId) => {
    const chapterArr = chapterList.filter(chapterItem => chapterItem.id === chapterId);
    if (chapterArr.length) {
      return chapterArr[0].title;
    }
    return '';
  }

  const decodeLocation = (locationId) => {
    const locationArr = locationList.filter(locationItem => locationItem.id === locationId);
    if (locationArr.length) {
      return locationArr[0].title;
    }
    return '';
  }

  return (
    <div className='entry'>
      <div className='entry-place'>{entry.place}</div>
      <h2 className='entry-title'>{entry.number} {entry.title}</h2>
      {entry.chapterId && <h5 className='entry-chapter'>chapter: {decodeChapter(entry.chapterId)}</h5>}
      {entry.locationId && <h6 className='entry-location'>location: {decodeLocation(entry.locationId)}</h6>}
      <div className='entry-section-list'>
        {entry.image && <EntryItemSection
                          title='Image:'
                          contentClassName='image'
                          content={entry.image}/>}
        {entry.text && <EntryItemSection
                          title='Text:'
                          contentClassName='text'
                          content={parse(entry.text)}/>}
        {entry.note && <EntryItemSection
                          title='Note:'
                          contentClassName='note'
                          content={entry.note}/>}
      </div>
      <div className='action-buttons'>
        <Icon
          name="wand"
          tooltip="Edit"
          theme="dark"
          size="small"
          onClick={() => {updateEntry(entry.id, entry.image)}}
        />
        <Icon
          name="delete"
          tooltip="Delete"
          theme="dark"
          size="small"
          onClick={() => {openDeleteModal(entry.id, entry.title)}}
        />
      </div>
    </div>
  );
}
 
export default EntryItem;