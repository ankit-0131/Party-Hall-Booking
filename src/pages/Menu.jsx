import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import ArchwayNav from '../components/ArchwayNav';

// --- DATA ---
const rawMenuData = [
  // Veg Starters
  { name: 'Paneer Tikka', cat: 'Veg Starters', type: 'Veg', price: 250, img: 'https://images.unsplash.com/photo-1666001120694-3ebe8fd207be?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  // { name: 'Hara Bhara Kebab', cat: 'Veg Starters', type: 'Veg', price: 250, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400&fm=webp' },
  { name: 'Veg Spring Roll', cat: 'Veg Starters', type: 'Veg', price: 220, img: 'https://images.unsplash.com/photo-1679310290259-78d9eaa32700?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  // { name: 'Crispy Corn', cat: 'Veg Starters', type: 'Veg', price: 200, img: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?auto=format&fit=crop&q=80&w=400&fm=webp' },
  { name: 'Veg Manchurian', cat: 'Veg Starters', type: 'Veg', price: 240, img: 'https://images.unsplash.com/photo-1682622110433-65513a55d7da?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Chilli Paneer', cat: 'Veg Starters', type: 'Veg', price: 260, img: 'https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1013&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Dahi Kebab', cat: 'Veg Starters', type: 'Veg', price: 280, img: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&q=80&w=400&fm=webp' },

  // Non-Veg Starters
  { name: 'Chicken Tikka', cat: 'Non-Veg Starters', type: 'Non-Veg', price: 350, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&q=80&w=400&fm=webphttps://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Tandoori Chicken', cat: 'Non-Veg Starters', type: 'Non-Veg', price: 380, img: 'https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Chicken Seekh Kebab', cat: 'Non-Veg Starters', type: 'Non-Veg', price: 360, img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Chilli Chicken', cat: 'Non-Veg Starters', type: 'Non-Veg', price: 340, img: 'https://images.unsplash.com/photo-1710508774177-7ac2f3492675?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Chicken 65', cat: 'Non-Veg Starters', type: 'Non-Veg', price: 330, img: 'https://images.unsplash.com/photo-1651750242138-04149021a8a2?auto=format&fit=crop&q=80&w=400&fm=webp' },

  // { name: 'Fish Tikka', cat: 'Non-Veg Starters', type: 'Non-Veg', price: 400, img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Mutton Seekh Kebab', cat: 'Non-Veg Starters', type: 'Non-Veg', price: 420, img: 'https://plus.unsplash.com/premium_photo-1770815084799-72c976c30acc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // Veg Mains
  { name: 'Paneer Butter Masala', cat: 'Veg Mains', type: 'Veg', price: 300, img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Dal Makhani', cat: 'Veg Mains', type: 'Veg', price: 280, img: 'https://images.unsplash.com/photo-1736680056444-02b10f16a245?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Kadai Paneer', cat: 'Veg Mains', type: 'Veg', price: 310, img: 'https://images.unsplash.com/photo-1642821369314-100fece91d3c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Malai Kofta', cat: 'Veg Mains', type: 'Veg', price: 320, img: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Mix Veg', cat: 'Veg Mains', type: 'Veg', price: 260, img: 'https://images.unsplash.com/photo-1756821753481-31183e985c76?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Dal Tadka', cat: 'Veg Mains', type: 'Veg', price: 220, img: 'https://images.unsplash.com/photo-1546833998-877b37c2e5c4?auto=format&fit=crop&q=80&w=400&fm=webp' },
  
  { name: 'Palak Paneer', cat: 'Veg Mains', type: 'Veg', price: 290, img: 'https://images.unsplash.com/photo-1708782345205-94e1d1c54005?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // Non-Veg Mains
  { name: 'Butter Chicken', cat: 'Non-Veg Mains', type: 'Non-Veg', price: 450, img: 'https://images.unsplash.com/photo-1728910107534-e04e261768ae?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Chicken Curry', cat: 'Non-Veg Mains', type: 'Non-Veg', price: 420, img: 'https://images.unsplash.com/photo-1565557613262-c8bf22810ce1?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Mutton Rogan Josh', cat: 'Non-Veg Mains', type: 'Non-Veg', price: 550, img: 'https://images.unsplash.com/photo-1606843046080-45bf7a23c39f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Chicken Tikka Masala', cat: 'Non-Veg Mains', type: 'Non-Veg', price: 460, img: 'https://images.unsplash.com/photo-1631292784640-2b24be784d5d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Kadai Chicken', cat: 'Non-Veg Mains', type: 'Non-Veg', price: 440, img: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Fish Curry', cat: 'Non-Veg Mains', type: 'Non-Veg', price: 480, img: 'https://images.unsplash.com/photo-1626508035297-0cd27c397d67?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Chicken Korma', cat: 'Non-Veg Mains', type: 'Non-Veg', price: 450, img: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&q=80&w=400&fm=webp' },

  // Breads
  { name: 'Butter Naan', cat: 'Breads', type: 'Veg', price: 60, img: 'https://images.unsplash.com/photo-1697155406014-04dc649b0953?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Garlic Naan', cat: 'Breads', type: 'Veg', price: 70, img: 'https://images.unsplash.com/photo-1559561724-4ea348cd867f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Tandoori Roti', cat: 'Breads', type: 'Veg', price: 40, img: 'https://images.unsplash.com/photo-1756821752957-00bfcadc3748?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Lachha Paratha', cat: 'Breads', type: 'Veg', price: 50, img: 'https://images.unsplash.com/photo-1668357530437-72a12c660f94?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // { name: 'Rumali Roti', cat: 'Breads', type: 'Veg', price: 50, img: 'https://images.unsplash.com/photo-1598785244280-7a428600d053?auto=format&fit=crop&q=80&w=400&fm=webp' },

  // { name: 'Aloo Paratha', cat: 'Breads', type: 'Veg', price: 80, img: 'https://images.unsplash.com/photo-1683533761804-5fc12be0f684?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  // Rice
  // { name: 'Veg Biryani', cat: 'Rice', type: 'Veg', price: 250, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400&fm=webp' },
  // { name: 'Hyderabadi Biryani (Non-Veg)', cat: 'Rice', type: 'Non-Veg', price: 350, img: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&q=80&w=400&fm=webp' },
  

  { name: 'Jeera Rice', cat: 'Rice', type: 'Veg', price: 160, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ49zpG69_kA9rY1gWe0x2_3D-TzxFI0Ekrzg&s' },

  { name: 'Steam Rice', cat: 'Rice', type: 'Veg', price: 140, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREPXSkOW9ySGpr-F95EeAWBXTGWOipm_nm0Q&s' },

  { name: 'Veg Pulao', cat: 'Rice', type: 'Veg', price: 200, img: 'https://www.indianveggiedelight.com/wp-content/uploads/2019/07/veg-pulao-featured.jpg' },

  // { name: 'Peas Pulao', cat: 'Rice', type: 'Veg', price: 180, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=400&fm=webp' },

  // { name: 'Kashmiri Pulao', cat: 'Rice', type: 'Veg', price: 220, img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=400&fm=webp' },

  // Desserts
  { name: 'Gulab Jamun', cat: 'Desserts', type: 'Veg', price: 120, img: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Rasmalai', cat: 'Desserts', type: 'Veg', price: 150, img: 'https://www.cookingcarnival.com/wp-content/uploads/2020/06/Rasmalai-500x375.jpg' },

  // { name: 'Gajar Ka Halwa', cat: 'Desserts', type: 'Veg', price: 140, img: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Jalebi with Rabri', cat: 'Desserts', type: 'Veg', price: 130, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddpRDn-tB7YbMaV8U2VL2TIvnA-DYHU-fow&s' },

  { name: 'Ice Cream (Vanilla/Chocolate)', cat: 'Desserts', type: 'Veg', price: 100, img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&q=80&w=400&fm=webp' },

  // { name: 'Moong Dal Halwa', cat: 'Desserts', type: 'Veg', price: 150, img: 'https://images.unsplash.com/photo-1624300629298-e9ad39c5952f?auto=format&fit=crop&q=80&w=400&fm=webp' },
  { name: 'Kulfi (Malai/Pista)', cat: 'Desserts', type: 'Veg', price: 120, img: 'https://static.toiimg.com/thumb/84786580.cms?imgsize=157368&width=800&height=800' },

  // Beverages
  { name: 'Mocktails', cat: 'Beverages', type: 'Veg', price: 150, img: 'https://images.unsplash.com/photo-1654074517750-f854f7c27d62?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { name: 'Fresh Lime Soda', cat: 'Beverages', type: 'Veg', price: 90, img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Sweet Lassi', cat: 'Beverages', type: 'Veg', price: 110, img: 'https://shwetainthekitchen.com/wp-content/uploads/2021/05/Sweet-lassi.jpg' },

  { name: 'Cold Coffee', cat: 'Beverages', type: 'Veg', price: 130, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Soft Drinks', cat: 'Beverages', type: 'Veg', price: 80, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400&fm=webp' },

  { name: 'Masala Tea', cat: 'Beverages', type: 'Veg', price: 60, img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400&fm=webp' },
  
  { name: 'Fruit Juices', cat: 'Beverages', type: 'Veg', price: 120, img: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=400&fm=webp' }
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredMenuItems.map(item => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              className="group relative bg-[#151515] rounded-xl md:rounded-2xl overflow-hidden border border-gray-800 hover:border-brand-gold/50 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] flex flex-col"
            >
              <div className="h-28 md:h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${item.img})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-opacity duration-300"></div>

                <div className="absolute top-2 left-2 md:top-4 md:left-4 flex gap-1 md:gap-2">
                  <span className="px-2 py-0.5 md:px-3 md:py-1 bg-black/60 backdrop-blur-sm rounded-full text-[8px] md:text-xs font-bold uppercase tracking-widest text-brand-gold border border-brand-gold/30 truncate max-w-[80px] md:max-w-none">
                    {item.cat}
                  </span>
                  {item.type && (
                    <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 text-[8px] md:text-xs" title={item.type}>
                      {item.type === 'Veg' ? '🟢' : '🔴'}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-3 md:p-6 flex-grow flex flex-col">
                <h3 className="text-[13px] md:text-xl font-serif font-bold text-gray-100 mb-1 md:mb-2 line-clamp-2 leading-snug">{item.name}</h3>
                <p className="text-gray-400 text-xs font-light leading-relaxed mb-6 flex-grow hidden md:block">{item.desc}</p>

                <div className="border-t border-gray-800 pt-2 md:pt-4 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-brand-gold font-bold text-sm md:text-xl">₹{item.price}</span>
                    <span className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest">per plate</span>
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
