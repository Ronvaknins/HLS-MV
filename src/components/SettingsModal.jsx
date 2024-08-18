import { useState, useEffect } from 'react';
import inputIcon from '../assets/input_icon.svg';
import aboutIcon from '../assets/about_icon.svg';
import closeIcon from '../assets/close_icon.svg';
import logoImage from '../assets/HLS-MV-logo-trans.png';

function SettingsModal({ streams, onClose, onSave }) {
  const [newStreams, setNewStreams] = useState(streams);
  const [selectedMenu, setMenuSelector] = useState(0);

  const handleChange = (index, event) => {
    const updatedStreams = [...newStreams];
    updatedStreams[index] = event.target.value;
    setNewStreams(updatedStreams);
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose])

  const handleSave = () => {
    onSave(newStreams);
    setMenuSelector(0)

  };
  function handleMenuButton(value) {
    setMenuSelector(value)
  }
  const handleMenu = () => {
    switch (selectedMenu) {
      case 0:
        return (
          <div className='modal-menu'>
            <div className='modal-menu-item' onClick={() => handleMenuButton(1)} >
              <img src={inputIcon} style={{ width: "60%" }} /><br />
              Inputs
            </div>
  
            <div className='modal-menu-item'>
              <img src={aboutIcon} style={{ width: "60%" }} onClick={() => handleMenuButton(2)}/><br />
              About
            </div>
          </div>
  
        );
      case 1:
        return (<>
          {newStreams.map((stream, index) => (
            <div className="menu-edit-input" key={index}>
              <div>Input {index}:</div>
              <input
                type="text"
                value={stream.url}
                onChange={(event) => handleChange(index, event)}
                style={{ width: '80%' }}
              />
    
            </div>
          ))}
          <p>
            <button className='button-17' onClick={handleSave}>Save</button>&nbsp;&nbsp;
            <button className='button-17' onClick={() => setMenuSelector(0)}>Close</button>
          </p>
        </>
        );
      case 2:
        return(<>
            <div className='about-menu'>
              <p><img src={logoImage} alt="logo" style={{width: '30%',height: '30%'}}/></p>
              <p>Version: 0.0.1</p>
              <p>Developed By Ron Vaknin</p>
            </div>
            <button className='button-17' onClick={() => setMenuSelector(0)}>Close</button>
            </>
        );
    }

};
return (
  <div className="modal-overlay">
    <div className="modal">
      <img src={closeIcon} onClick={onClose} className="exit-button" />
      <h2>Settings</h2>
      {handleMenu()}


      {/* {newStreams.map((stream, index) => (
          <div key={index}>
            <span>Input {index}:&nbsp;</span>
            <input 
              type="text" 
              value={stream} 
              onChange={(event) => handleChange(index, event)}
              style={{width: '80%'}} 
            />
          </div>
        ))}
        <p>
        <button className='button-17' onClick={handleSave}>Save</button>&nbsp;&nbsp;
        <button className='button-17' onClick={onClose}>Close</button>
        </p> */}
    </div>
  </div>
);
}

export default SettingsModal;
