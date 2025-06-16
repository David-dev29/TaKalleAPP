import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, Settings, Trash2, History } from 'lucide-react';

const VoiceSearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [searchHistory, setSearchHistory] = useState([
    'Restaurantes cerca de mí',
    'Clima de hoy',
    'Noticias México',
    'Películas en cartelera'
  ]);
  const dropdownRef = useRef(null);

  // Cerrar dropdown cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        if (isListening) {
          stopListening();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isListening]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTranscript('');
    }
  };

  const startListening = () => {
    setIsListening(true);
    setTranscript('Escuchando...');
    // Simulación de reconocimiento de voz
    setTimeout(() => {
      setTranscript('¿Qué restaurantes hay cerca?');
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
    if (transcript === 'Escuchando...') {
      setTranscript('');
    }
  };

  const handleSearch = (query) => {
    console.log(`Buscando: ${query}`);
    if (query && !searchHistory.includes(query)) {
      setSearchHistory(prev => [query, ...prev.slice(0, 3)]);
    }
    setIsOpen(false);
    setTranscript('');
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const removeHistoryItem = (index) => {
    setSearchHistory(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón principal del micrófono */}
      <button
        onClick={handleToggleDropdown}
        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
            : 'bg-purple-100 hover:bg-purple-200 text-purple-600'
        }`}
      >
        <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Mic className="w-5 h-5 text-purple-600" />
                Búsqueda por Voz
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Área de transcripción */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="bg-gray-50 rounded-lg p-4 min-h-[60px] flex items-center justify-center">
              {transcript ? (
                <div className="text-center">
                  <p className={`text-sm ${isListening ? 'text-blue-600 animate-pulse' : 'text-gray-700'}`}>
                    {transcript}
                  </p>
                  {isListening && (
                    <div className="flex justify-center mt-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">Presiona el micrófono para comenzar</p>
              )}
            </div>

            {/* Controles de voz */}
            <div className="flex items-center justify-center gap-3 mt-3">
              {!isListening ? (
                <button
                  onClick={startListening}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <Mic className="w-4 h-4" />
                  Hablar
                </button>
              ) : (
                <button
                  onClick={stopListening}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <MicOff className="w-4 h-4" />
                  Detener
                </button>
              )}

              {transcript && transcript !== 'Escuchando...' && (
                <button
                  onClick={() => handleSearch(transcript)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200 shadow-sm"
                >
                  Buscar
                </button>
              )}
            </div>
          </div>

          {/* Historial de búsquedas */}
          {searchHistory.length > 0 && (
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Búsquedas recientes
                </h4>
                <button
                  onClick={clearHistory}
                  className="text-xs text-gray-500 hover:text-red-500 transition-colors"
                >
                  Limpiar
                </button>
              </div>
              
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {searchHistory.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between group hover:bg-gray-50 rounded-lg px-2 py-2 transition-colors"
                  >
                    <button
                      onClick={() => handleSearch(item)}
                      className="flex-1 text-left text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {item}
                    </button>
                    <button
                      onClick={() => removeHistoryItem(index)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Configuración rápida */}
          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Volume2 className="w-4 h-4" />
                <span>Idioma: Español</span>
              </div>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
                <Settings className="w-4 h-4" />
                <span>Configurar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearchDropdown;