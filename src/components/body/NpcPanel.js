import './NpcPanel.css';
import npcList from '../../assets/sources/npcList.json';

const NpcPanel = () => {
  return (
    <div>
      {npcList.map((npc, index) => {
        return (
          <div className='npc-info' key={`npc-list-${index}`}>
            <div className='npc-name'>{npc.name}</div>
            <div className='npc-page'>p. {npc.pageNumber}</div>
            <div className='npc-location'>{npc.location}</div>
          </div>
        );
      })}
    </div>
  );
}
 
export default NpcPanel