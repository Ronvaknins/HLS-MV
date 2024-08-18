import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import AudioLevelMeter from './AudioLevelMeter.jsx';



export default function VideoPlayer({ src, onClick,video_num,isActive }) {
  // console.log(video_num);
  const videoRef = useRef(null);
  // console.log(video_num);

  const [isVideoReady, setVideoReady] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  useEffect(() => {
    const video = videoRef.current;
    let hls;
    let retryTimeout;
    const initializeVideo = () => {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(err => console.error('Play error:', err));
        });

        // Retry connection on errors
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.error('Error encountered, retrying...', data);
                retryConnection();
                break;
              default:
                console.error('An unrecoverable error occurred:', data);
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(err => console.error('Play error:', err));
        });
      }
    };

    const retryConnection = () => {
      console.log("reconnecting")
      if (retryCount < 20) { // Limit the number of retries
        retryTimeout = setTimeout(() => {
          setRetryCount(prevRetryCount => prevRetryCount + 1);
          initializeVideo();
        }, 3000); // Retry after 3 seconds
      } else {
        console.error('Max retries reached. Could not reconnect to the video stream.');
      }
    };
    // const initializeVideo = () => {
    //   if (Hls.isSupported()) {
    //     hls = new Hls();
    //     hls.loadSource(src);
    //     hls.attachMedia(video);
    //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //       video.play().catch(err => console.error('Play error:', err));
    //       // setVideoReady(true);
    //       // console.log(video)
    //     });
    //   } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    //     video.src = src;
    //     video.addEventListener('loadedmetadata', () => {
    //       video.play().catch(err => console.error('Play error:', err));

    //     });
    //   }
    // };

    // const retryConnection = () => {
    //   if (retryCount < 5) { // Limit the number of retries
    //     retryTimeout = setTimeout(() => {
    //       setRetryCount(retryCount + 1);
    //       initializeVideo();
    //     }, 3000); // Retry after 3 seconds
    //   } else {
    //     console.error('Max retries reached. Could not reconnect to the video stream.');
    //   }
    // };

    initializeVideo();

    // Set videoReady to true when video can start playing
    const handleCanPlayThrough = () => {
      setVideoReady(true);
      
    };

    if (video) {
      video.addEventListener('canplaythrough', handleCanPlayThrough);
      return () => {
        if (video) {
          video.removeEventListener('canplaythrough', handleCanPlayThrough);
        }
        if (hls) {
          hls.destroy();
        }
        clearTimeout(retryTimeout); // Clear the retry timeout on cleanup
      };
    }
  }, [src,retryCount]);

  const handleDoubleClick = () => {

    setExpanded(!isExpanded);

    
  };

  // console.log(videoRef.current);
  return (

    <div 
      onDoubleClick={handleDoubleClick}
      onClick={onClick} 
/*       style={{ 
        cursor: 'pointer', 
        // position: 'relative' 
        position: isExpanded ? 'fixed' : 'relative',
        top: isExpanded ? 0 : 'auto',
        left: isExpanded ? 0 : 'auto',
        width: isExpanded ? '100%' : 'auto',
        height: isExpanded ? '100%' : 'auto',
        zIndex: isExpanded ? 1000 : 'auto',
        transition: 'all 1.5s ease'
      
      }} */
      className={`video-container ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}
      >   
  
        <video 
          className='video-player'
          id={'video-'+video_num}
          ref={videoRef} 
          autoPlay 
          // muted={!isActive} // Control muting based on active state
          muted={isActive ? false:true}
    
        />
          
          {isVideoReady && <AudioLevelMeter audioElement={videoRef.current} />}
        
        {/* <div className={`overlay ${isActive ? 'visible' : ''}`}></div> */}
    </div>
  );
}
