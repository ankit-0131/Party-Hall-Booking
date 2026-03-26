import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#111] text-brand-light pt-12 pb-24 md:pb-12 border-t border-brand-gold/20 shadow-[-10px_-10px_30px_rgba(0,0,0,0.1)] relative z-50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand-gold mb-4">Delhi Premier Rooftop Hall</h2>
          <p className="text-gray-300 text-sm mb-4 leading-relaxed font-light">
            Delhi's finest destination for authentic North Indian weddings, corporate events, and grand celebrations beneath the stars.
          </p>
          <div className="flex gap-4">
            <a href="#" className="p-2 bg-white/5 rounded-full text-brand-light hover:text-brand-gold hover:bg-white/10 transition-all"><FaFacebook size={20} /></a>
            <a href="#" className="p-2 bg-white/5 rounded-full text-brand-light hover:text-brand-gold hover:bg-white/10 transition-all"><FaInstagram size={20} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-serif font-semibold mb-4 text-brand-gold tracking-wider uppercase text-sm">Quick Links</h3>
          <ul className="space-y-3 font-medium">
            <li><Link to="/menu" className="text-brand-light hover:text-brand-gold transition-colors inline-block hover:translate-x-1 transform duration-300">Our Menu</Link></li>
            <li><Link to="/hall" className="text-brand-light hover:text-brand-gold transition-colors inline-block hover:translate-x-1 transform duration-300">The Party Hall</Link></li>
            <li><Link to="/gallery" className="text-brand-light hover:text-brand-gold transition-colors inline-block hover:translate-x-1 transform duration-300">Gallery</Link></li>
            <li><Link to="/contact" className="text-brand-light hover:text-brand-gold transition-colors inline-block hover:translate-x-1 transform duration-300">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-serif font-semibold mb-4 text-brand-gold tracking-wider uppercase text-sm">Contact Info</h3>
          <ul className="space-y-3 font-medium text-brand-light">
            <li className="flex gap-3"><span className="text-brand-gold">📍</span> 123 Proxy Street, Proxy Area, New Delhi - 110000</li>
            <li className="flex gap-3"><span className="text-brand-gold">📞</span> +91 99999 00000</li>
            <li className="flex gap-3"><span className="text-brand-gold">✉️</span> bookings@delhipremierhall.com</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-800 text-center font-light tracking-wide text-brand-light/60 text-sm">
        &copy; {new Date().getFullYear()} <span className="text-brand-gold">Delhi Premier Rooftop Hall</span>. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
