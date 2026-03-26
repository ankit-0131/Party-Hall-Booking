import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';

const ALL_DESTINATIONS = [
  { title: 'The Royal Gates', path: '/', img: 'https://images.unsplash.com/photo-1582555172866-773b185adcce?auto=format&fit=crop&q=80&w=600&fm=webp', desc: 'Return to the Grand Palace Entrance' },
  { title: 'The Royal Menu', path: '/menu', img: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=600&fm=webp', desc: 'Savor Authentic North Indian Delicacies' },
  { title: 'Grand Party Hall', path: '/hall', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600&fm=webp', desc: 'Discover Our Majestic Open-Air Venue' },
  { title: 'Memory Gallery', path: '/gallery', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600&fm=webp', desc: 'Relive Golden Jubilee Celebrations' },
  { title: 'Send Messengers', path: '/contact', img: 'https://images.unsplash.com/photo-1523588484191-c148e42fbe50?auto=format&fit=crop&q=80&w=600&fm=webp', desc: 'Contact Our Royal Event Planners' }
];

const ArchwayNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandingWindow, setExpandingWindow] = useState(null);

  // Auto-filter out the current page so we always show 4 OTHER destinations
  const destinations = ALL_DESTINATIONS.filter(d => d.path !== location.pathname).slice(0, 4);

  const handleEnterWindow = (e, path, index) => {
    e.preventDefault();
    setExpandingWindow(index);
    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
      setExpandingWindow(null); // Reset for when user navigates back
    }, 1000);
  };

  return (
    <section className="py-24 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] bg-brand-bg relative mix-blend-color-dodge z-30">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-brand-bg pointer-events-none"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <ScrollReveal direction="up" duration={0.6}>
          <p className="text-brand-gold text-sm tracking-widest uppercase mb-2 font-bold drop-shadow-lg">Begin Your Journey</p>
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brand-light mb-16 drop-shadow-xl">Explore The Palace</h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {destinations.map((arch, i) => (
            <motion.div 
              key={arch.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={expandingWindow === null ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true }}
              animate={
                expandingWindow === i 
                  ? { scale: 12, opacity: 0, zIndex: 100, filter: "brightness(1.5)", y: 50, willChange: "transform, opacity" } 
                  : expandingWindow !== null 
                    ? { opacity: 0, scale: 0.8, filter: "brightness(0.5)", willChange: "transform, opacity" } 
                    : { scale: 1, opacity: 1, filter: "brightness(1)", y: 0, willChange: "transform, opacity" }
              }
              transition={{ duration: expandingWindow === i ? 1.2 : 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => handleEnterWindow(e, arch.path, i)}
              className={`cursor-pointer group relative h-[380px] md:h-[450px] w-full rounded-t-full rounded-b-lg overflow-hidden border-[6px] border-[#312015] transition-all duration-700 shadow-[0_15px_40px_rgba(0,0,0,0.8)] ${expandingWindow === null ? 'hover:border-brand-gold/80 hover:-translate-y-4 hover:shadow-[0_20px_50px_rgba(212,175,55,0.4)]' : ''}`}
            >
              {/* Arch Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" 
                style={{ backgroundImage: `url(${arch.img})` }}
              ></div>
              
              {/* Mobile-Friendly Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 md:from-black/90 md:via-black/20 md:to-transparent group-hover:from-black group-hover:via-black/60 transition-colors duration-500"></div>
              
              {/* Content Container */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-center pb-10 md:pb-12">
                <h3 className="text-xl md:text-2xl font-bold font-serif text-brand-gold mb-2 md:mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,1)] transition-transform duration-500 group-hover:-translate-y-2">{arch.title}</h3>
                
                <div className="h-auto opacity-100 md:h-0 md:opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden translate-y-0 md:translate-y-4 group-hover:translate-y-0 mt-3 md:mt-0">
                  <p className="text-gray-200 font-light text-xs md:text-sm mb-5 leading-relaxed drop-shadow-md">{arch.desc}</p>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEnterWindow(e, arch.path, i);
                    }}
                    className="pointer-events-none md:pointer-events-auto inline-block px-6 md:px-8 py-2 md:py-3 border border-brand-gold text-brand-gold group-hover:bg-brand-gold group-hover:text-brand-dark rounded-full font-serif text-xs md:text-sm uppercase tracking-widest transition-colors duration-300 font-bold bg-black/40 backdrop-blur-sm shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                  >
                    Enter
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchwayNav;
