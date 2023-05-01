import './App.css';

import Head from './components/heading/Head';
import Body from './components/body/Body';

import raven from './assets/images/raven.jpeg';

function App() {
  return (
    <div className='outer-wrapper'>
      <Head />
      <Body />
      <div className='background-image-container'>
        <img className="background-image" alt="raven" src={raven}/>
      </div>
    </div>
  );
}

export default App;
