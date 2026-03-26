import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const Menu = () => {
  return (
    <div className="py-20 bg-brand-bg min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal direction="up" duration={0.4}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-text mb-4">Our <span className="text-brand-red">Menu</span> Options</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Experience the finest authentic North Indian delicacies carefully curated by our expert culinary team for your special day.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { name: 'Standard Package', price: '₹1,200/plate', items: ['2 Starters', '1 Paneer Main', '1 Dal', 'Breads & Rice', '1 Dessert'] },
            { name: 'Premium (North Indian)', price: '₹1,800/plate', items: ['4 Starters', '2 Paneer Mains', 'Dal Makhani', 'Premium Breads', '2 Desserts', 'Welcome Drinks'] },
            { name: 'Platinum (Full Experience)', price: '₹2,500/plate', items: ['6 Starters', 'Live Chaat Counter', '3 Mains & Premium Dal', 'Assorted Breads', 'Live Dessert Counter', 'Mocktails'] },
            { name: 'Custom Catering', price: 'On Request', items: ['Tailored to your specific requirements', 'Special dietary options available'] },
          ].map((pkg, idx) => (
            <ScrollReveal 
              key={pkg.name}
              direction="up"
              delay={idx * 0.1}
              className="bg-brand-card p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-serif font-bold text-brand-text mb-2">{pkg.name}</h2>
              <p className="text-xl font-semibold text-brand-gold mb-6">{pkg.price}</p>
              <ul className="space-y-2">
                {pkg.items.map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <span className="w-2 h-2 rounded-full bg-brand-red mr-3"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
