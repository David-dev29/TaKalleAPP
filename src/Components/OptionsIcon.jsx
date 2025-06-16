import { useState, useRef, useEffect } from 'react';
import { User, Settings, Bell, Moon, HelpCircle, LogOut } from 'lucide-react';

const UserMenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (action) => {
    console.log(`Acción seleccionada: ${action}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Botón principal con grid de puntos */}
      <button
        onClick={handleToggleDropdown}
        className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      >
        <div className="grid grid-cols-2 gap-1">
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {/* Header del usuario */}
          <div className="px-4 py-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                U
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Usuario</h3>
                <p className="text-sm text-gray-600">usuario@ejemplo.com</p>
              </div>
            </div>
          </div>

          {/* Opciones del menú */}
          <div className="py-2">
            {/* Perfil */}
            <button
              onClick={() => handleMenuItemClick('profile')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
            >
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Mi Perfil</span>
            </button>

            {/* Configuración */}
            <button
              onClick={() => handleMenuItemClick('settings')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Configuración</span>
            </button>

            {/* Notificaciones */}
            <button
              onClick={() => handleMenuItemClick('notifications')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Notificaciones</span>
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">3</span>
            </button>

            {/* Tema */}
            <button
              onClick={() => handleMenuItemClick('theme')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
            >
              <Moon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Tema</span>
              <span className="ml-auto text-sm text-gray-500">Claro</span>
            </button>

            {/* Divider */}
            <div className="my-2 border-t border-gray-100"></div>

            {/* Ayuda */}
            <button
              onClick={() => handleMenuItemClick('help')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150"
            >
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Ayuda y Soporte</span>
            </button>

            {/* Divider */}
            <div className="my-2 border-t border-gray-100"></div>

            {/* Cerrar Sesión */}
            <button
              onClick={() => handleMenuItemClick('logout')}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-red-50 transition-colors duration-150 text-red-600"
            >
              <LogOut className="w-5 h-5 text-red-600" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;