import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  return (
    <div className="py-20 bg-brand-bg min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-7xl">
        <ScrollReveal direction="up" duration={0.4}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-text mb-4">About <span className="text-brand-gold">Us</span></h1>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Discover the story behind Delhi's most sought-after destination for luxury celebrations and unforgettable skyline events.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="bg-brand-card p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 relative">
            {/* Decorative background accent */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl"></div>
            
            <ScrollReveal direction="right" delay={0.2} duration={0.5}>
              <h2 className="text-3xl font-serif font-bold text-brand-red mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-brand-gold"></span>
                Our Heritage
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg font-light">
                Founded on the principles of grand Punjabi hospitality, the Delhi Premier Rooftop Hall was established to offer an escape from the enclosed banquet halls of the city. We believe that true celebrations need the open sky, breathtaking views, and an ambiance that perfectly blends modern elegance with traditional North Indian heritage.
              </p>
              
              <h2 className="text-3xl font-serif font-bold text-brand-red mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-brand-gold"></span>
                Our Promise
              </h2>
              <p className="text-gray-700 leading-relaxed mb-10 text-lg font-light">
                Whether you are hosting a vibrant Sangeet, a regal wedding reception, or a high-profile corporate event, our dedicated team handles every detail—from our custom-curated North Indian culinary masterpieces to bespoke floral and structural decor. 
              </p>

              <ScrollReveal direction="up" delay={0.1}>
                <div className="bg-gradient-to-br from-brand-dark to-black text-brand-light p-8 rounded-2xl mt-8 shadow-xl cursor-default relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-bl-[100px] transition-transform duration-500 group-hover:scale-110"></div>
                  <h3 className="text-2xl font-serif font-bold text-brand-gold mb-3 relative z-10">Our Vision</h3>
                  <p className="text-gray-300 font-light leading-relaxed relative z-10">
                    To be the undisputed champion of sky-high celebrations in New Delhi, delivering impeccable service and culinary excellence beneath the stars.
                  </p>
                </div>
              </ScrollReveal>
            </ScrollReveal>
          </div>

          {/* Image Collage */}
          <div className="relative h-full min-h-[500px] lg:min-h-[700px]">
            <ScrollReveal direction="left" duration={0.6} className="absolute top-0 right-0 w-3/4 h-[55%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80')] bg-cover bg-center hover:scale-105 transition-transform duration-700"></div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.2} duration={0.6} className="absolute bottom-4 left-0 w-2/3 h-[45%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626804475297-41609ea0d4eb?auto=format&fit=crop&q=80')] bg-cover bg-center hover:scale-105 transition-transform duration-700"></div>
            </ScrollReveal>
            
            <ScrollReveal direction="left" delay={0.4} duration={0.6} className="absolute bottom-12 right-4 w-[40%] h-[35%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-30">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80')] bg-cover bg-center hover:scale-105 transition-transform duration-700"></div>
            </ScrollReveal>

            {/* Decorative Element */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
