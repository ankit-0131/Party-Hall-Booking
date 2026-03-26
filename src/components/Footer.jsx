import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-light pt-12 pb-24 md:pb-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-brand-gold mb-4">Delhi Premier Rooftop Hall</h2>
          <p className="text-gray-400 text-sm mb-4">
            Delhi's finest destination for authentic North Indian weddings, corporate events, and grand celebrations beneath the stars.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors"><FaInstagram size={24} /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-serif font-semibold mb-4 text-brand-gold">Quick Links</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><Link to="/menu" className="hover:text-white transition-colors">Our Menu</Link></li>
            <li><Link to="/hall" className="hover:text-white transition-colors">The Party Hall</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-serif font-semibold mb-4 text-brand-gold">Contact Info</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>📍 123 Proxy Street, Proxy Area, New Delhi - 110000</li>
            <li>📞 +91 99999 00000</li>
            <li>✉️ bookings@delhipremierhall.com</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-xs text-brand-gold">
        &copy; {new Date().getFullYear()} Delhi Premier Rooftop Hall. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
