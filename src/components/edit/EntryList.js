import 'react-crud-icons/dist/css/react-crud-icons.css';
import './EntryList.css';

import EntryItem from './EntryItem';

const EntryList = (props) => {
  const { entries, updateEntry, setDeleteEntryId, setDeleteEntryTitle, chapterList, locationList } = props;
  
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
          <EntryItem
            key={`entry-mapping-${index}`}
            entry={entry}
            chapterList={chapterList}
            locationList={locationList}
            updateEntry={updateEntry}
            setDeleteEntryId={setDeleteEntryId}
            setDeleteEntryTitle={setDeleteEntryTitle}
          />
        )
      })}
    </div>
  );
}
 
export default EntryList;