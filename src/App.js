import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Head from './components/heading/Head';
import Chapters from './components/body/Chapters';
import Locations from './components/body/Locations';

import raven from './assets/images/raven.jpeg';

function App() {
  return (
    <div className='outer-wrapper'>
      <Head />
      <Router>
        <Switch>
          <Route exact path="/">
            <Chapters />
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
