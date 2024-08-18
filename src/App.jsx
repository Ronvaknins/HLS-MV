import VideoPlayer from './components/VideoPlayer';

import { useState } from 'react';
import {streams as initialStreams} from './configs/configNews.js'
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';
console.log(window.screen.width);
console.log(window.screen.height);
function App(){
  const [activeVideo, setActiveVideo] = useState(null);
  const [streams, setStreams] = useState(initialStreams);
  const [isModalOpen, setModalOpen] = useState(false);

  function handleVideoClick(index){
    setActiveVideo(prevIndex => {
      if(prevIndex === index){
        return null;
      }
      else{
        return index;
      }
  })
}

    const handleSettingsClick = () => {
      setModalOpen(true);
    };

    const handleModalClose = () => {
      setModalOpen(false);
    };

    const handleSave = (newStreams) => {
      setStreams(newStreams);
    };
  // const columns = Math.round(Math.sqrt(streams.length));
  
  // const gridStyle = {
  //   display: 'grid',
  //   gridTemplateColumns: `repeat(${columns}, minmax(480px, 1fr))`,
  //   gap: '10px', // Optional, for spacing between grid items
  //   // border: '2px solid white', // Add border around the grid container
  //   // padding: '10px',
  // };
  // style={{ position: 'relative', paddingBottom: '58%', height: 0 }}

  document.addEventListener('keydown', function(event) {
    if (event.key === 'f' || event.key === 'F') {
      toggleFullScreen();
    }
  });

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }
  return (
      <>
       <Navbar onSettingsClick={handleSettingsClick} />
    <div className="video-grid" >
      {streams.map((stream, index) => (
        <div key={index} className="video-grid-item">
          <VideoPlayer 
            src={stream.url} 
            id={`video-${index}` }
            onClick={() => handleVideoClick(index)} 
            video_num = {index}
            isActive={activeVideo === index}
            />   
            <div className="ch-name">{stream.name}</div>    
        </div> 
      ))}
     
    </div>

    {isModalOpen && (
        <SettingsModal 
          streams={streams} 
          onClose={handleModalClose} 
          onSave={handleSave} 
        />
      )}
 
 </>

  );
}

export default App;
