import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from './components/heading/Head';
import Chapters from './components/body/Chapters';
import Locations from './components/body/Locations';
import Rooms from './components/body/Rooms';
import EditWrapper from './components/edit/EditWrapper';

import raven from './assets/images/raven.jpeg';
import OpenNpcPanel from './components/body/OpenNpcPanel';

function calculateVh() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
}

function App() {
  // calculating innerHeight for mobile devices
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
  
  // Initial calculation
  calculateVh();
  
  // Re-calculate on resize
  window.addEventListener('resize', calculateVh);
  
  // Re-calculate on device orientation change
  window.addEventListener('orientationchange', calculateVh);

  return (
    <div className='outer-wrapper'>
      <Head />
      <OpenNpcPanel />
      <Router>
        <Switch>
          <Route exact path="/">
            <Chapters />
          </Route>
          <Route path="/edit">
            <EditWrapper />
          </Route>
          <Route path="/:chapterId/:locationId">
            <Rooms />
          </Route>
          <Route path="/:chapterId">
            <Locations />
          </Route>
        </Switch>
      </Router>
      <div className='background-image-container'>
        <img className="background-image" alt="raven" src={raven}/>
      </div>
    </div>
  );
}

export default App;
