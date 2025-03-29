'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = ['home', 'about', 'room guide', 'messsage wall'];
  
  const handleNavigation = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-[#f79a24]/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <span className="bg-[#f79a24] text-black px-2 mx-1 py-1 rounded-md">CEX</span><span className="text-white">FIRST</span>
          </motion.div>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            {navItems.map((section) => (
              <motion.li key={section}>
                <motion.button
                  onClick={() => handleNavigation(section)}
                  className={`text-lg ${
                    activeSection === section
                      ? 'text-[#f79a24] font-bold'
                      : 'text-white/80 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              </motion.li>
            ))}
          </ul>
          
          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className={`w-6 h-0.5 bg-[#f79a24] rounded-full`}
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                translateY: mobileMenuOpen ? 6 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className={`w-6 h-0.5 bg-[#f79a24] rounded-full`}
              animate={{
                opacity: mobileMenuOpen ? 0 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div 
              className={`w-6 h-0.5 bg-[#f79a24] rounded-full`}
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                translateY: mobileMenuOpen ? -6 : 0
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/90 border-t border-[#f79a24]/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-2">
              <ul className="flex flex-col space-y-3 py-4">
                {navItems.map((section) => (
                  <motion.li 
                    key={section}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <motion.button
                      onClick={() => handleNavigation(section)}
                      className={`text-lg block w-full text-left py-2 px-3 rounded-md ${
                        activeSection === section
                          ? 'bg-[#f79a24]/20 text-[#f79a24] font-bold'
                          : 'text-white/80 hover:bg-black/30 hover:text-white'
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 