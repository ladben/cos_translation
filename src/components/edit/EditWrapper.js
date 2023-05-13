import { Route } from 'react-router-dom';

import EditSideBar from './EditSideBar';
import EditDashboard from './EditDashboard';

import './EditWrapper.css'

const EditWrapper = () => {
  return (
    <div className='edit-wrapper'>
      <EditSideBar />
      <div className='edit-dashboard-wrapper'>
        <Route path="/edit/chapter-edit">
          <EditDashboard table="chapters"/>
        </Route>
      </div>
    </div>
  );
}
 
export default EditWrapper;