import { motion } from 'framer-motion';
import { Users, Wind, Map, Music } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const Hall = () => {
  return (
    <div className="py-20 bg-brand-bg min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal direction="up" duration={0.4}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-text mb-4">The <span className="text-brand-gold">Rooftop Hall</span></h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Discover a stunning open-air venue designed with vibrant regional decor, perfect for unforgettable Punjabi weddings and elite corporate gatherings.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <ScrollReveal 
            direction="left"
            duration={0.5}
            className="rounded-2xl overflow-hidden shadow-2xl h-96 relative bg-brand-dark"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center opacity-80"></div>
          </ScrollReveal>
          
          <ScrollReveal
            direction="right"
            duration={0.5}
            delay={0.1}
          >
            <h2 className="text-3xl font-serif font-bold text-brand-text mb-6">Venue Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Users className="text-brand-red" size={32}/>, title: 'Capacity', desc: 'Up to 500 Guests' },
                { icon: <Map className="text-brand-red" size={32}/>, title: 'Area', desc: '10,000 Sq. Ft.' },
                { icon: <Wind className="text-brand-red" size={32}/>, title: 'Ambiance', desc: 'Open-Air & Breezy' },
                { icon: <Music className="text-brand-red" size={32}/>, title: 'Entertainment', desc: 'Live DJ Setup Allowed' },
              ].map((feature) => (
                <div key={feature.title} className="flex gap-4 items-start">
                  <div className="bg-red-50 p-3 rounded-lg">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-brand-text">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal
           direction="up"
           duration={0.4}
           className="mt-20 text-center"
        >
          <h2 className="text-3xl font-serif font-bold text-brand-text mb-8">Perfect For Every Occasion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: 'Grand Weddings', img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80' },
              { title: 'Corporate Galas', img: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80' },
              { title: 'Sangeet & Mehendi', img: 'https://images.unsplash.com/photo-1533174000276-2617f69b4e53?auto=format&fit=crop&q=80' },
              { title: 'Milestone Birthdays', img: 'https://images.unsplash.com/photo-1530103862676-de889ddeeba8?auto=format&fit=crop&q=80' }
            ].map((event, i) => (
              <motion.div 
                key={event.title}
                whileHover={{ y: -5 }}
                className="bg-brand-card rounded-xl overflow-hidden shadow-lg border border-brand-border"
              >
                <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${event.img})` }}></div>
                <div className="p-4">
                  <h3 className="font-bold font-serif text-brand-text text-lg">{event.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default Hall;
