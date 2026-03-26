import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Premium food textures/images to use as faded background elements
const bgImages = [
  "https://images.unsplash.com/photo-1596683709848-038cf5610705?auto=format&fit=crop&q=80", // Spices
  "https://images.unsplash.com/photo-1604543519985-71708170624a?auto=format&fit=crop&q=80", // Star Anise / Cinnamon
  "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80", // Herbs
  "https://images.unsplash.com/photo-1509358271058-acd26ccaf9de?auto=format&fit=crop&q=80"  // Dark aesthetic food texture
];

const FloatingBackground = () => {
  const { scrollY } = useScroll();
  
  // Create different parallax speeds (some move up fast, some slow)
  const y1 = useTransform(scrollY, [0, 5000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 5000], [0, -800]);
  const y3 = useTransform(scrollY, [0, 5000], [0, -200]);
  const y4 = useTransform(scrollY, [0, 5000], [0, -600]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 bg-brand-bg opacity-95 mix-blend-multiply z-10"></div>
      
      {/* Decorative Parallax Food Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[2px] opacity-[0.03] mix-blend-screen"
      >
        <img src={bgImages[0]} alt="decor" className="w-full h-full object-cover rounded-full mix-blend-luminosity" />
      </motion.div>

      <motion.div 
        style={{ y: y2 }}
        className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[3px] opacity-[0.03] mix-blend-screen"
      >
        <img src={bgImages[1]} alt="decor" className="w-full h-full object-cover rounded-full mix-blend-luminosity" />
      </motion.div>

      <motion.div 
        style={{ y: y3 }}
        className="absolute top-[60%] left-[10%] w-[350px] h-[350px] rounded-full blur-[1px] opacity-[0.03] mix-blend-screen"
      >
        <img src={bgImages[2]} alt="decor" className="w-full h-full object-cover rounded-full mix-blend-luminosity" />
      </motion.div>

      <motion.div 
        style={{ y: y4 }}
        className="absolute top-[80%] right-[15%] w-[600px] h-[600px] rounded-full blur-[4px] opacity-[0.02] mix-blend-screen"
      >
        <img src={bgImages[3]} alt="decor" className="w-full h-full object-cover rounded-full mix-blend-luminosity" />
      </motion.div>
      
      {/* Subtle Elite Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-bg/50 to-brand-bg z-20"></div>
    </div>
  );
};

export default FloatingBackground;
