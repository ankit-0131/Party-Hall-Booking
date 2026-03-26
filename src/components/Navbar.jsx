import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openBookingForm } = useBooking();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Party Hall', path: '/hall' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#110805]/95 via-[#1b0b06]/95 to-[#110805]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] border-b border-brand-gold/40 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#b8860b] via-[#d4af37] to-[#8a6d1c] rounded-full flex items-center justify-center text-black font-serif font-black text-xl shadow-[0_0_15px_rgba(212,175,55,0.6)]">
            DP
          </div>
          <div>
            <h1 className="text-xl font-bold font-serif bg-gradient-to-r from-[#ffe58f] via-[#d4af37] to-[#b8860b] bg-clip-text text-transparent leading-tight uppercase tracking-wider drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              Delhi Premier
            </h1>
            <p className="text-xs text-[#ffb5b5] tracking-widest font-semibold uppercase opacity-90">Rooftop Palace</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="relative group py-2 font-medium text-brand-light font-serif tracking-wider hover:text-brand-gold transition-colors duration-300"
            >
              {link.name}
              {/* Gold sliding underline animation */}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <button 
            onClick={openBookingForm}
            className="relative px-8 py-2 rounded-full overflow-hidden group shadow-[0_0_15px_rgba(201,24,74,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-red-900 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8a6d1c] via-[#d4af37] to-[#8a6d1c] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 text-white font-bold tracking-wide group-hover:text-black transition-colors duration-300">Reserve a Date</span>
          </button>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center gap-4">
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
            className="md:hidden bg-gradient-to-b from-[#110805] to-[#1b0b06] overflow-hidden shadow-inner absolute w-full border-b border-brand-gold/40"
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-3 border-b border-brand-border/30 text-brand-text font-medium"
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
