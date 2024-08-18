import { useRef, useEffect } from 'react';


export default function AudioLevelMeter({ audioElement }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // console.log(audioElement);
    if (!audioElement) {
      return
    }

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);

    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 32;

    const dataArray = new Uint8Array(analyser.fftSize);
  
    const draw = () => {
      requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      
      
      const barHeight = (average / 64) * canvas.height;
      

      const grad=canvasContext.createLinearGradient(0,280,0,0);
      grad.addColorStop(0.8, "green");
      grad.addColorStop(0.9, "yellow"); 
      grad.addColorStop(1, "red"); 

      canvasContext.fillStyle = grad;

      canvasContext.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);

      // Define dash and gap sizes
      // const dashHeight = 2;
      // const gapHeight = 1;

      // // Draw dashed gradient fill
      // for (let y = canvas.height - barHeight; y < canvas.height; y += dashHeight + gapHeight) {
      //   canvasContext.fillRect(0, y, canvas.width, dashHeight);
      // }


    };

    draw();

    return () => {
      analyser.disconnect();
      source.disconnect();
      audioContext.close();
    };
  }, [audioElement]);

  return (<>
    <div>
      <canvas ref={canvasRef} width="20" height="150" style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 10, 
        zIndex: 1, 
        opacity: 0.70 ,
        }} />
    </div>

    </>
    );
}



