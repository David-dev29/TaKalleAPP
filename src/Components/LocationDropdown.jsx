
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, MapPin } from 'lucide-react';


        
const LocationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('PVR, Jabalpur');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Lista de ubicaciones de ejemplo
  const locations = [
    'PVR, Jabalpur',
    'INOX, Mumbai',
    'Cinepolis, Delhi',
    'PVR, Bangalore',
    'INOX, Hyderabad',
    'PVR, Chennai',
    'Cinepolis, Pune',
    'PVR, Kolkata',
    'INOX, Ahmedabad',
    'PVR, Gurgaon'
  ];

  // Filtrar ubicaciones basado en el término de búsqueda
  const filteredLocations = locations.filter(location =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Enfocar el input de búsqueda cuando se abre el dropdown
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón principal */}
      <button
        onClick={handleToggleDropdown}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full hover:from-orange-500 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <span className="font-medium text-sm">{selectedLocation}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Barra de búsqueda */}
          <div className="p-4 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar ciudad o cine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Lista de ubicaciones */}
          <div className="max-h-64 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectLocation(location)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 transition-colors duration-150 ${
                    selectedLocation === location ? 'bg-orange-100 text-orange-700' : 'text-gray-700'
                  }`}
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{location}</span>
                  {selectedLocation === location && (
                    <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No se encontraron ubicaciones</p>
                <p className="text-sm">Intenta con otro término de búsqueda</p>
              </div>
            )}
          </div>

          {/* Footer opcional */}
          <div className="p-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              ¿No encuentras tu ciudad? <span className="text-orange-600 hover:underline cursor-pointer">Solicítala aquí</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

    


export default LocationDropdown;
