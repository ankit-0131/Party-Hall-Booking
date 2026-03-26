import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  return (
    <div className="py-20 bg-brand-bg min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScrollReveal direction="up" duration={0.4}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-text mb-4">About <span className="text-brand-gold">Us</span></h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Discover the story behind Delhi's most sought-after destination for luxury celebrations and unforgettable skyline events.
          </p>
        </ScrollReveal>

        <div className="bg-brand-card p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
          <ScrollReveal direction="up" delay={0.2} duration={0.5}>
            <h2 className="text-2xl font-serif font-bold text-brand-red mb-4">Our Heritage</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Founded on the principles of grand Punjabi hospitality, the Delhi Premier Rooftop Hall was established to offer an escape from the enclosed banquet halls of the city. We believe that true celebrations need the open sky, breathtaking views, and an ambiance that perfectly blends modern elegance with traditional North Indian heritage.
            </p>
            
            <h2 className="text-2xl font-serif font-bold text-brand-red mb-4">Our Promise</h2>
            <p className="text-gray-700 leading-relaxed mb-8">
              Whether you are hosting a vibrant Sangeet, a regal wedding reception, or a high-profile corporate event, our dedicated team handles every detail—from our custom-curated North Indian culinary masterpieces to bespoke floral and structural decor. 
            </p>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="bg-brand-dark text-brand-light p-6 rounded-xl mt-8 cursor-default">
                <h3 className="text-xl font-serif font-bold text-brand-gold mb-2">Our Vision</h3>
                <p className="text-gray-300">
                  To be the undisputed champion of sky-high celebrations in New Delhi, delivering impeccable service and culinary excellence beneath the stars.
                </p>
              </div>
            </ScrollReveal>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default About;
