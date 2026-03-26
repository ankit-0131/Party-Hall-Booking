import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ArchwayNav from '../components/ArchwayNav';

// --- DATA ---
const IMG_STARTER_V = "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&q=80&w=400&fm=webp";
const IMG_STARTER_NV = "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400&fm=webp";
const IMG_MAIN_V = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400&fm=webp";
const IMG_MAIN_NV = "https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?auto=format&fit=crop&q=80&w=400&fm=webp";
const IMG_BREAD = "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=400&fm=webp";
const IMG_RICE = "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&q=80&w=400&fm=webp";
const IMG_DESSERT = "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80&w=400&fm=webp";
const IMG_BEV = "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400&fm=webp";

const rawMenuData = [
  ...['Paneer Tikka', 'Hara Bhara Kebab', 'Veg Spring Roll', 'Crispy Corn', 'Veg Manchurian (Dry)', 'Chilli Paneer', 'Aloo Tikki', 'Dahi Kebab', 'Cheese Balls', 'Veg Pakora', 'Mushroom Tikka', 'Corn Chaat'].map(n => ({ name: n, cat: 'Veg Starters', type: 'Veg', price: 250, img: IMG_STARTER_V })),
  ...['Chicken Tikka', 'Tandoori Chicken', 'Chicken Malai Tikka', 'Chicken Seekh Kebab', 'Chilli Chicken', 'Chicken 65', 'Fish Tikka', 'Fish Fry', 'Prawns Fry', 'Mutton Seekh Kebab', 'Egg Pakora', 'Chicken Lollipop'].map(n => ({ name: n, cat: 'Non-Veg Starters', type: 'Non-Veg', price: 350, img: IMG_STARTER_NV })),
  ...['Paneer Butter Masala', 'Shahi Paneer', 'Kadai Paneer', 'Paneer Lababdar', 'Palak Paneer', 'Paneer Tikka Masala', 'Paneer Do Pyaza', 'Paneer Pasanda', 'Dal Makhani', 'Dal Tadka', 'Dal Fry', 'Punjabi Chana Dal', 'Yellow Dal (Moong Dal)', 'Mix Veg Curry', 'Aloo Gobi', 'Aloo Matar', 'Dum Aloo', 'Jeera Aloo', 'Baingan Bharta', 'Bhindi Masala', 'Malai Kofta', 'Navratan Korma', 'Veg Handi', 'Veg Jalfrezi', 'Kofta Curry (Veg Kofta)'].map(n => ({ name: n, cat: 'Veg Mains', type: 'Veg', price: 300, img: IMG_MAIN_V })),
  ...['Chicken Curry', 'Butter Chicken', 'Kadai Chicken', 'Chicken Tikka Masala', 'Chicken Do Pyaza', 'Chicken Korma', 'Chicken Handi', 'Chicken Changezi', 'Chicken Bhuna', 'Mutton Curry', 'Mutton Rogan Josh', 'Mutton Korma', 'Mutton Handi', 'Mutton Bhuna', 'Mutton Keema', 'Fish Curry', 'Fish Masala', 'Fish Fry (Gravy)', 'Egg Curry', 'Egg Masala', 'Anda Bhurji (Gravy)'].map(n => ({ name: n, cat: 'Non-Veg Mains', type: 'Non-Veg', price: 450, img: IMG_MAIN_NV })),
  ...['Butter Naan', 'Plain Naan', 'Garlic Naan', 'Tandoori Roti', 'Butter Roti', 'Missi Roti', 'Lachha Paratha', 'Rumali Roti', 'Plain Paratha', 'Aloo Paratha', 'Paneer Paratha', 'Gobhi Paratha', 'Mixed Veg Paratha', 'Methi Paratha'].map(n => ({ name: n, cat: 'Breads', type: 'Veg', price: 60, img: IMG_BREAD })),
  ...['Steam Rice', 'Jeera Rice', 'Veg Pulao', 'Peas Pulao', 'Kashmiri Pulao', 'Veg Biryani'].map(n => ({ name: n, cat: 'Rice', type: 'Veg', price: 150, img: IMG_RICE })),
  ...['Hyderabadi Biryani (Non-Veg)'].map(n => ({ name: n, cat: 'Rice', type: 'Non-Veg', price: 350, img: IMG_RICE })),
  ...['Gulab Jamun', 'Rasgulla', 'Rasmalai', 'Jalebi', 'Jalebi with Rabri', 'Kaju Katli', 'Besan Ladoo', 'Motichoor Ladoo', 'Ice Cream (Vanilla, Chocolate, Strawberry)', 'Kulfi (Malai / Pista)', 'Falooda', 'Gajar Ka Halwa', 'Moong Dal Halwa', 'Kheer (Rice Kheer)', 'Seviyan (Vermicelli Kheer)', 'Brownie with Ice Cream', 'Pastry (Chocolate / Pineapple)'].map(n => ({ name: n, cat: 'Desserts', type: 'Veg', price: 120, img: IMG_DESSERT })),
  ...['Mineral Water', 'Soft Drinks (Coke, Pepsi, Sprite)', 'Fresh Lime Water', 'Fresh Lime Soda', 'Sweet Lassi', 'Salted Lassi', 'Mango Lassi', 'Buttermilk (Chaas)', 'Masala Tea', 'Green Tea', 'Coffee', 'Cold Coffee', 'Chocolate Shake', 'Strawberry Shake', 'Vanilla Shake', 'Orange Juice', 'Apple Juice', 'Pineapple Juice', 'Virgin Mojito', 'Blue Lagoon (Mocktail)', 'Fruit Punch', 'Cold Drink Dispenser (Buffet)'].map(n => ({ name: n, cat: 'Beverages', type: 'Veg', price: 80, img: IMG_BEV })),
];

// Attach unique IDs to mapped items
const MENU_ITEMS = rawMenuData.map((item, index) => ({
  ...item,
  id: `menu-item-${index}`,
  desc: `Premium ${item.cat.toLowerCase()} dish crafted by our masterful chefs to elevate your royal celebration.`
}));

const TRUST_GALLERY = [
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600&fm=webp",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600&fm=webp",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600&fm=webp",
];

const CATEGORIES = ['All', 'Veg Starters', 'Non-Veg Starters', 'Veg Mains', 'Non-Veg Mains', 'Breads', 'Rice', 'Desserts', 'Beverages'];

const Menu = () => {
  const [filterType, setFilterType] = useState('All');

  // Filter optimization
  const filteredMenuItems = useMemo(() => {
    if (filterType === 'All') return MENU_ITEMS;
    return MENU_ITEMS.filter(item => item.cat === filterType);
  }, [filterType]);

  return (
    <div className="bg-[#0f0f0f] min-h-screen font-sans text-brand-light pb-0">
      
      {/* 1. HEADER & FILTER SECTION */}
      <section className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <ScrollReveal direction="up" duration={0.6}>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-gold mb-2 drop-shadow-md">The Royal Feast</h1>
            <p className="text-gray-400 font-light text-lg">Explore our curated delicacies and build your perfect catering menu.</p>
          </ScrollReveal>

          {/* Sticky Category Filter Bar */}
          <div className="sticky top-20 z-40 bg-[#1a1a1a]/95 backdrop-blur-xl p-2 rounded-2xl md:rounded-full border border-gray-800 w-full md:w-full lg:max-w-3xl shadow-2xl">
            <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 md:pb-0 px-2 lg:flex-wrap lg:justify-center">
              {CATEGORIES.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-xs md:text-sm font-bold tracking-wide transition-all duration-300 ${filterType === type ? 'bg-brand-gold text-black shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'bg-black/40 text-gray-400 hover:text-white hover:bg-black/60 border border-gray-800 hover:border-brand-gold/50'}`}
                >
                  {type === 'Veg Starters' || type === 'Veg Mains' || type === 'Breads' || type === 'Rice' || type === 'Desserts' || type === 'Beverages' 
                    ? `🟢 ${type}` 
                    : type === 'Non-Veg Starters' || type === 'Non-Veg Mains' 
                      ? `🔴 ${type}` 
                      : type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. MENU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenuItems.map(item => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="group relative bg-[#151515] rounded-2xl overflow-hidden border border-gray-800 hover:border-brand-gold/50 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] hover:via-black/20 to-transparent transition-opacity duration-300"></div>
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-widest text-brand-gold border border-brand-gold/30">
                    {item.cat}
                  </span>
                  {item.type && (
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10" title={item.type}>
                      {item.type === 'Veg' ? '🟢' : '🔴'}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-serif font-bold text-gray-100 mb-2">{item.name}</h3>
                <p className="text-gray-400 text-xs font-light leading-relaxed mb-6 flex-grow">{item.desc}</p>
                
                <div className="border-t border-gray-800 pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-brand-gold font-bold text-xl">₹{item.price}</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">per plate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. TRUST & SOCIAL PROOF */}
      <section className="py-24 px-4 bg-[#0a0a0a] border-t border-brand-gold/10 relative overflow-hidden mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Excellence in Every Detail</h2>
            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10">We don’t just serve food; we craft royal culinary experiences. Our master chefs ensure every dish is a celebration of authentic flavors.</p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-4xl font-bold text-brand-gold mb-2">500+</h4>
                <p className="text-sm tracking-widest uppercase text-gray-500">Royal Events Hosted</p>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-4xl font-bold text-brand-light">4.8</span>
                  <span className="text-2xl text-brand-gold">★</span>
                </div>
                <p className="text-sm tracking-widest uppercase text-gray-500">From 120+ Reviews</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border border-brand-gold/20 bg-brand-gold/5 rounded-xl p-4 w-max shadow-lg">
              <span className="text-brand-gold text-xl">👨‍🍳</span>
              <span className="text-gray-300 text-sm tracking-wide">Professional 5-Star Catering Team</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <img src={TRUST_GALLERY[0]} alt="Event setup" className="rounded-2xl w-full h-48 object-cover border-2 border-transparent hover:border-brand-gold/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
              <img src={TRUST_GALLERY[1]} alt="Plating" className="rounded-2xl w-full h-64 object-cover border-2 border-transparent hover:border-brand-gold/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
            </div>
            <div className="flex flex-col gap-4 pt-8">
              <img src={TRUST_GALLERY[2]} alt="Buffet layout" className="rounded-2xl w-full h-64 object-cover border-2 border-transparent hover:border-brand-gold/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.8)]" />
              <div className="bg-[#151515] rounded-2xl h-48 border border-gray-800 flex items-center justify-center p-6 text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <span className="text-brand-gold font-serif italic text-xl">"A truly magical culinary journey."</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARCHWAY CROSS-NAVIGATION */}
      <ArchwayNav />
    </div>
  );
};

export default Menu;
