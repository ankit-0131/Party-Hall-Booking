import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const images = [
  'https://images.unsplash.com/photo-1769812343590-485512e27838?auto=format&fit=crop&q=80&w=1080',
  'https://images.unsplash.com/photo-1767050190883-29d644fa5b99?auto=format&fit=crop&q=80&w=1080',
  'https://images.unsplash.com/photo-1746739802411-061f807897de?auto=format&fit=crop&q=80&w=1080',
  'https://images.unsplash.com/photo-1759717821448-c677fbd0aa87?auto=format&fit=crop&q=80&w=1080',
  'https://images.unsplash.com/photo-1763231575952-98244918f99b?auto=format&fit=crop&q=80&w=1080',
  'https://images.unsplash.com/photo-1657816925116-9bbb2a45fb6d?auto=format&fit=crop&q=80&w=1080',
];

const Gallery = () => {
  return (
    <div className="py-20 bg-brand-bg min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-6xl">
        <ScrollReveal direction="up" duration={0.4}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-text mb-4">Event <span className="text-brand-red">Gallery</span></h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Take a glimpse into the magical moments celebrated at Delhi's Premier Rooftop Hall.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, idx) => (
            <ScrollReveal
              key={idx}
              direction="up"
              delay={idx * 0.1}
              className="group relative overflow-hidden rounded-xl h-64 shadow-lg cursor-pointer bg-brand-dark"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: `url(${src})` }}
              ></div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
