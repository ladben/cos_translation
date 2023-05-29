import './OpenNpcPanel.css'
import npc from '../../assets/images/npc.png';

import { useRef } from 'react';
import NpcPanel from './NpcPanel';

const OpenNpcPanel = () => {
  const npcPanelElRef = useRef(null);

  const npcPanelContainerClickHandler = () => {
    if (npcPanelElRef.current) {
      npcPanelElRef.current.classList.toggle('hidden');
    }
  }

  return (
    <div className='npc-list-container'>
      <div className='open-npc-panel-container' onClick={npcPanelContainerClickHandler}>
        <img alt="npc" src={npc}></img>
      </div>
      <div ref={npcPanelElRef} className='npc-panel hidden'>
        <NpcPanel />
      </div>
    </div>
  );
}
 
export default OpenNpcPanel;