
import  settingsIcon  from '../assets/settings_icon.svg';

function Navbar({ onSettingsClick }) {   
        
    return (     
        
        
        <div className="navbar">    

                <img className='icon-button' onClick={onSettingsClick} src={settingsIcon} />
            
        </div>   
        ); 


}  

export default Navbar;