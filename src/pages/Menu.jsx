import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const foodItems = [
  { id: 1, name: "Truffle Naan with Dal Makhani", cat: "Mains", desc: "A luxurious twist on a North Indian classic, featuring 24-hour slow-cooked black lentils paired with freshly baked truffle-infused butter naan.", price: "₹450", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80" },
  { id: 2, name: "Saffron Paneer Tikka", cat: "Starters", desc: "Cottage cheese marinated in rich saffron, hung curd, and secret royal Awadhi spices, char-grilled in a clay oven.", price: "₹380", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?auto=format&fit=crop&q=80" },
  { id: 3, name: "Gourmet Gulab Jamun Tart", cat: "Desserts", desc: "A modern fusion masterpiece: warm, melt-in-your-mouth gulab jamuns nestled in a crisp buttery tart shell with pistachio cream.", price: "₹250", img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80" },
  { id: 4, name: "Smoked Butter Chicken", cat: "Mains", desc: "Our signature dish. Wood-smoked pulled chicken tikka simmered in a velvety tomato-fenugreek gravy, finished with fresh cream.", price: "₹550", img: "https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?auto=format&fit=crop&q=80" },
  { id: 5, name: "Avocado Dahi Puri", cat: "Chaat", desc: "A gourmet street food experience with crispy hollow puris filled with avocado mash, sweet yogurt, and tangy tamarind spheres.", price: "₹220", img: "https://images.unsplash.com/photo-1626804475297-41609ea0d4eb?auto=format&fit=crop&q=80" }
];

const marqueeImages = [
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1610450948924-4f0eefe07137?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80", // duplicate for seamless loop
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80",
];

const Menu = () => {
  const [activeItem, setActiveItem] = useState(foodItems[0].id);

  return (
    <div className="bg-brand-bg min-h-screen overflow-hidden pb-20">
      
      {/* Premium Marquee Header */}
      <div className="relative pt-24 pb-12 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-brand-dark z-10"></div>
        
        {/* Infinite Moving Food Items */}
        <div className="absolute inset-0 flex items-center opacity-30">
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: [0, -1000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {marqueeImages.map((src, i) => (
              <div 
                key={i} 
                className="w-48 h-48 md:w-64 md:h-64 rounded-2xl bg-cover bg-center shrink-0 shadow-2xl" 
                style={{ backgroundImage: `url(${src})` }}
              ></div>
            ))}
          </motion.div>
        </div>

        <div className="relative z-20 container mx-auto px-4 max-w-4xl pt-16">
          <ScrollReveal direction="up" duration={0.4}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-center text-brand-light mb-4 tracking-wide">
              Culinary <span className="text-brand-gold italic">Masterpieces</span>
            </h1>
            <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Elevate your celebration with our curated selection of premium individual dishes. Click on any delicacy below to explore its flavors.
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Interactive Scaling Menu Section */}
      <div className="container mx-auto px-4 max-w-6xl mt-16">
        <div className="flex flex-col lg:flex-row gap-6 h-[70vh] min-h-[500px]">
          {foodItems.map((item) => {
            const isActive = activeItem === item.id;
            
            return (
              <motion.div
                key={item.id}
                layout
                onMouseEnter={() => setActiveItem(item.id)}
                className={`relative rounded-3xl cursor-pointer overflow-hidden shadow-2xl transition-all duration-500 will-change-transform ${
                  isActive ? "lg:w-[60%] w-full flex-grow basis-auto z-20 scale-100" : "lg:w-[10%] w-full h-24 lg:h-auto z-10 scale-[0.98] opacity-70 hover:opacity-100 hover:scale-[0.99]"
                }`}
                style={{ transformOrigin: "center center" }}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out"
                  style={{ 
                    backgroundImage: `url(${item.img})`,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }}
                ></div>
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isActive ? 'bg-gradient-to-t from-black/90 via-black/40 to-transparent' : 'bg-black/60'}`}></div>

                {/* Content */}
                <AnimatePresence mode="wait">
                  {isActive ? (
                    <motion.div 
                      key="active"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white"
                    >
                      <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-sm font-bold tracking-wider uppercase mb-4 backdrop-blur-md">
                        {item.cat}
                      </span>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">{item.name}</h2>
                      <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-6 font-light">{item.desc}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl md:text-3xl font-bold text-brand-gold">{item.price}</span>
                        <span className="text-sm text-gray-400 uppercase tracking-widest">Per Plate</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex lg:flex-col items-center justify-center p-4 lg:p-0"
                    >
                      <h3 className="text-white font-serif font-bold text-xl lg:-rotate-90 whitespace-nowrap tracking-wider">{item.name}</h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
