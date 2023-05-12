import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from './components/heading/Head';
import Chapters from './components/body/Chapters';
import Locations from './components/body/Locations';
import Rooms from './components/body/Rooms';

import raven from './assets/images/raven.jpeg';

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
      <h2>ENV variable: {process.env.REACT_APP_MY_API}</h2>
      <Head />
      <Router>
        <Switch>
          <Route exact path="/">
            <Chapters />
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
