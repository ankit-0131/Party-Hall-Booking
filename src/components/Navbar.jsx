import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { openBookingForm } = useBooking();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Party Hall', path: '/hall' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-bg shadow-md border-b-4 border-brand-red transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-brand-gold font-serif font-bold text-xl">
            DP
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif text-brand-text leading-tight uppercase tracking-wide">
              Delhi Premier
            </h1>
            <p className="text-xs text-brand-red tracking-widest font-semibold uppercase">Rooftop Hall</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="font-medium text-brand-text hover:text-brand-red transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="text-brand-text hover:text-brand-red transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={openBookingForm}
            className="bg-brand-red text-brand-light px-6 py-2 rounded-full font-semibold hover:bg-red-800 transition-colors duration-200 shadow-lg"
          >
            Check Price
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="text-brand-text transition-colors"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          <button className="text-brand-text" onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-brand-bg overflow-hidden shadow-inner absolute w-full"
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 border-b border-gray-100 text-brand-text font-medium active:bg-brand-bg"
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-6 py-4">
                <button 
                  onClick={() => { setIsOpen(false); openBookingForm(); }}
                  className="w-full bg-brand-red text-center text-white py-3 rounded-md font-semibold"
                >
                  Check Price Instantly
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
