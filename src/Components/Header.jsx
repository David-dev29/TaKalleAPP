
import LocationDropdown from './LocationDropdown';
import UserMenuDropdown from './OptionsIcon';
import VoiceSearchDropdown from './VoiceSearchDropdown';


function Header() {
   

    return (
        <div className="w-full h-auto flex justify-between">
            
           <UserMenuDropdown></UserMenuDropdown>
           <LocationDropdown></LocationDropdown>
           <VoiceSearchDropdown></VoiceSearchDropdown>
               
        </div>
    );
}

export default Header;