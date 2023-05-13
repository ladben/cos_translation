import Icon from 'react-crud-icons';

import 'react-crud-icons/dist/css/react-crud-icons.css';
import './EntryList.css';


const EntryList = (props) => {
  const { entries, updateEntry, setDeleteEntryId, setDeleteEntryTitle } = props;

  const openDeleteModal = (id, title) => {
    const deleteModal = document.querySelector('.delete-modal-wrapper');
    if (deleteModal) {
      setDeleteEntryId(id);
      setDeleteEntryTitle(title);
      deleteModal.classList.add('open');
    }

  }
  return (
    <div className='entry-list'>
      {entries.sort((currEntry, nextEntry) => {
        if (currEntry.place < nextEntry.place) {
          return 1;
        }

        if (currEntry.place > nextEntry.place) {
          return -1;
        }

        return 0;
      }).map((entry, index) => {
        return (
          <div className='entry' key={`entry-mapping-${index}`}>
            <div className='entry-place'>{entry.place}</div>
            <h2 className='entry-title'>{entry.number} {entry.title}</h2>
            <div className='entry-section-list'>
              {entry.image &&
                <div className='entry-section'>
                  <div className='section-title'>Image:</div>
                  <div className='image'>{entry.image}</div>
                </div>
              }
              {entry.description &&
                <div className='entry-section'>
                  <div className='section-title'>Description:</div>
                  <div className='description'>{entry.description}</div>
                </div>}
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
        )
      })}
    </div>
  );
}
 
export default EntryList;