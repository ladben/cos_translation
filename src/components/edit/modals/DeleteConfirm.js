import { useRef } from 'react';
import './DeleteConfirm.css';

const DeleteConfirm = (props) => {
  const { entryId, entryTitle, deleteEntry } = props;

  const deleteModalRef = useRef();

  const closeModal = () => {
    if (deleteModalRef.current) {
      deleteModalRef.current.classList.remove('open');
    }
  }

  return (
    <div ref={deleteModalRef} className='delete-modal-wrapper'>
      <div className='delete-modal-backdrop'></div>
      <div className='delete-modal'>
        <div className='question'>Delete {entryTitle}</div>
        <div className='delete-action-buttons'>
          <div className='cancel' onClick={closeModal}>Cancel</div>
          <div className='confirm' onClick={() => {deleteEntry(entryId); closeModal()}}>Confirm</div>
        </div>
      </div>
    </div>
  );
}
 
export default DeleteConfirm;