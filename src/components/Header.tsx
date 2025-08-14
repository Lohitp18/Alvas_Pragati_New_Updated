import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Briefcase, Bell, BookOpen } from 'lucide-react';
import pragati from "../images/Alvas_Pragati_Booklet___2025_1_-removebg-preview.png";
import logo from "../images/logo1.png";

interface HeaderProps {
  onSelectSection: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSelectSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showHeader, setShowHeader] = useState(true);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClick = (section: string) => {
    const sectionMap: Record<string, string> = {
      Home: 'home',
      Jobs: 'jobs',
      About: 'about',
      Notification: 'notification',
      Booklet: 'booklet',
    };

    const sectionId = sectionMap[section];
    if (sectionId) {
      onSelectSection(sectionId);
      setActiveSection(section);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', icon: Home, id: 'home' },
    { name: 'About', icon: Info, id: 'about' },
    { name: 'Jobs', icon: Briefcase, id: 'jobs' },
    { name: 'Notification', icon: Bell, id: 'notification' },
    { name: 'Booklet', icon: BookOpen, id: 'booklet' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          showHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 backdrop-blur-md border-b border-blue-600/50 shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 pt-4 pb-4">
            
            {/* Logo Section */}
            <div className="flex items-center space-x-4 -translate-x-3 sm:-translate-x-4">
  <div className="flex items-center space-x-3">
    <img
      src={pragati}
      alt="Pragati"
      className="w-20 sm:w-24 md:w-28 h-24 sm:h-24 md:h-36 object-contain drop-shadow-lg"
    />
    <img
      src={logo}
      alt="Alvas"
      className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-lg"
    />
  </div>


              
                             {/* Title Section */}
<div className="flex flex-col items-center justify-center text-center px-4 translate-x-6 sm:translate-x-4 lg:translate-x-6">
  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white font-serif whitespace-nowrap">
    ALVA'S PRAGATI
  </h1>
  <p className="text-xs sm:text-sm md:text-base text-blue-100 font-medium mt-2 whitespace-nowrap">
    The Largest Placement Drive
  </p>
</div>







          </div>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => handleClick(item.name)}
                                         className={`group relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                       isActive
                         ? 'text-white bg-blue-600/20 border border-blue-400'
                         : 'text-blue-100 hover:text-white hover:bg-blue-600/20'
                     }`}
                  >
                                        <div className="flex items-center space-x-2">
                      <Icon size={16} className={`transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-blue-200 group-hover:text-white'
                      }`} />
                      <span className="text-sm lg:text-base">{item.name}</span>
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>

                        {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-600/20 transition-all duration-300 order-first"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
          />
          
          {/* Menu Panel */}
          <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <img
                    src={pragati}
                    alt="Pragati"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">ALVA'S PRAGATI</h2>
                    <p className="text-sm text-gray-600">The Largest Placement Drive</p>
                  </div>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => handleClick(item.name)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-blue-600 bg-blue-50 border border-blue-200 shadow-sm'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        <Icon size={18} className={`transition-colors duration-300 ${
                          isActive ? 'text-blue-600' : 'text-gray-500'
                        }`} />
                        <span className="text-base sm:text-lg">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-500">© 2025 Alva's Pragati</p>
                  <p className="text-xs text-gray-400 mt-1">Empowering Careers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
