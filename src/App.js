import './App.css';

import Head from './components/heading/Head';

import raven from './assets/images/raven.jpeg';

function App() {
  return (
    <div className='outer-wrapper'>
      <Head />
      <img className="background-image" alt="raven" src={raven}/>
    </div>
  );
}

export default App;
