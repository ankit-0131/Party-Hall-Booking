import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useBooking } from '../context/BookingContext';
import UrgencyBanner from '../components/UrgencyBanner';
import ScrollReveal from '../components/ScrollReveal';
import ParticlesBackground from '../components/ParticlesBackground';
import ArchwayNav from '../components/ArchwayNav';

const Home = () => {
  const { openBookingForm } = useBooking();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  // Scroll logic for the realistic POV walk-through
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // --- POV Walk Through Animation Logic ---
  // Spread the animation across the entire scroll container smoothly
  const doorScale = useTransform(smoothProgress, [0, 0.9], [1, 3.5]);
  const doorOpacity = useTransform(smoothProgress, [0.7, 1], [1, 0]);
  
  // The doors swing open smoothly across the scroll
  const leftDoorRotate = useTransform(smoothProgress, [0, 0.8], [0, -110]);
  const rightDoorRotate = useTransform(smoothProgress, [0, 0.8], [0, 110]);
  
  // The room comes into focus
  const roomScale = useTransform(smoothProgress, [0, 1], [1.15, 1]);
  
  // Welcome Text Sequence (Appears First)
  const welcomeOpacity = useTransform(smoothProgress, [0.2, 0.6], [0, 1]);
  const welcomeY = useTransform(smoothProgress, [0.2, 0.6], [30, 0]);

  // Main Text Sequence (Appears Second)
  const heroOpacity = useTransform(smoothProgress, [0.6, 0.9], [0, 1]);
  const heroY = useTransform(smoothProgress, [0.6, 0.9], [30, 0]);
  
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  // Parallax for Gallery
  const galleryRef = useRef(null);
  const { scrollYProgress: galleryProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });
  const galleryY1 = useTransform(galleryProgress, [0, 1], ["0%", "-30%"]);
  const galleryY2 = useTransform(galleryProgress, [0, 1], ["0%", "30%"]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-brand-bg relative overflow-x-clip">

      <UrgencyBanner />
      
      {/* POV Walk-Through Scroll Container */}
      <section ref={containerRef} className="relative h-[150vh] bg-black">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center bg-black" style={{ perspective: "2000px" }}>
          
          {/* THE ROOM: Royal Castle Banquet Layer */}
          <motion.div 
            style={{ scale: roomScale, willChange: "transform" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
          >
            {/* Extremely Royal Banquet Image - Added width limits for performance */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1200&fm=webp')] bg-cover bg-center"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-black/40"></div>
            
            {/* Soft Ambient Particles */}
            <ParticlesBackground />

            {/* Hero Text Inside the Room */}
            <div className="relative z-10 text-center px-4 max-w-5xl mt-20 pointer-events-auto flex flex-col items-center">
              
              {/* Sequence 1: Welcome Appears First */}
              <motion.div 
                style={{ opacity: welcomeOpacity, y: welcomeY, willChange: "transform, opacity" }}
                className="mb-6"
              >
                <p className="text-brand-gold font-serif text-2xl md:text-4xl tracking-[0.3em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  Welcome
                </p>
                <p className="text-gray-300 font-light text-sm md:text-lg tracking-widest uppercase mt-2 drop-shadow-md">
                  To Delhi Premier
                </p>
              </motion.div>

              {/* Sequence 2: Royal Experience Appears Second */}
              <motion.div 
                style={{ opacity: heroOpacity, y: heroY, willChange: "transform, opacity" }}
                className="flex flex-col items-center"
              >
                <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-bold text-brand-light mb-8 leading-tight drop-shadow-[0_0_20px_rgba(0,0,0,1)]">
                  Royal Experience
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-3xl mx-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  Step into a world of majestic celebrations. Feast like royalty with an authentic North Indian spread beneath the starlit skyline.
                </p>
                
                <button 
                  onClick={openBookingForm}
                  className="group relative px-12 py-5 bg-brand-red text-white rounded-full font-bold text-xl overflow-hidden shadow-[0_0_40px_rgba(201,24,74,0.6)] hover:shadow-[0_0_60px_rgba(212,175,55,0.8)] transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-brand-gold w-0 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
                  <span className="relative z-10 text-white font-serif tracking-wide border-b border-transparent group-hover:border-white transition-all">Claim Your Throne</span>
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* HYPER-REALISTIC DOORS - Performance Optimized */}
          <motion.div 
            style={{ scale: doorScale, opacity: doorOpacity, willChange: "transform, opacity" }}
            className="absolute inset-0 flex pointer-events-none z-30 perspective-1000"
          >
            {/* Stationary Arch Wall Frame (Blocks corners, creates the tunnel illusion) */}
            <div className="absolute inset-0 z-20 flex pointer-events-none">
              <div className="w-1/2 h-full overflow-hidden">
                <div className="w-full h-full rounded-tl-full shadow-[0_0_0_100vw_#070301]"></div>
              </div>
              <div className="w-1/2 h-full overflow-hidden">
                <div className="w-full h-full rounded-tr-full shadow-[0_0_0_100vw_#070301]"></div>
              </div>
            </div>

            {/* Left Realistic Palace Door */}
            <motion.div 
              style={{ rotateY: leftDoorRotate, transformOrigin: "left", willChange: "transform", backfaceVisibility: "hidden" }}
              className="w-1/2 h-full bg-[#1b0d06] relative overflow-hidden flex justify-end items-center rounded-tl-full z-10"
            >
              {/* High-res wood texture base */}
              <div 
                className="absolute inset-y-0 right-0 w-[200%] bg-[url('https://images.unsplash.com/photo-1542038385-9875dbcb0279?auto=format&fit=crop&q=80&w=800&fm=webp')] bg-cover bg-left pointer-events-none opacity-40 mix-blend-luminosity"
              ></div>
              
              {/* Embossed Door Panel styling */}
              <div className="absolute inset-4 md:inset-8 right-1 md:right-2 border-[8px] md:border-[16px] border-[#0a0502]/80 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] rounded-tl-full rounded-br-sm pointer-events-none"></div>
              <div className="absolute inset-8 md:inset-16 right-4 md:right-8 border-4 md:border-8 border-brand-gold/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] rounded-tl-full rounded-br-sm pointer-events-none"></div>

              {/* Realistic Center Edge (Where doors meet) */}
              <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-l from-black via-[#3a1d0f] to-transparent z-20"></div>
              <div className="absolute inset-y-0 right-0 w-[1px] bg-brand-gold/30 z-20"></div>

              {/* Majestic Left Door Handle */}
              <div className="relative right-4 md:right-24 z-30 drop-shadow-[10px_10px_15px_rgba(0,0,0,0.8)]">
                {/* Backplate */}
                <div className="w-8 h-32 md:w-16 md:h-64 bg-gradient-to-b from-[#b8860b] via-[#d4af37] to-[#8a6d1c] rounded-full flex justify-center items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border border-[#ffdf73]/20">
                  {/* Pull Ring */}
                  <div className="w-6 h-6 md:w-12 md:h-12 border-[4px] md:border-[8px] border-[#2a2a2a] rounded-full bg-gradient-to-tr from-[#8a6d1c] to-[#d4af37] shadow-[5px_5px_10px_rgba(0,0,0,0.9)]"></div>
                </div>
              </div>
            </motion.div>

            {/* Right Realistic Palace Door */}
            <motion.div 
              style={{ rotateY: rightDoorRotate, transformOrigin: "right", willChange: "transform", backfaceVisibility: "hidden" }}
              className="w-1/2 h-full bg-[#1b0d06] relative overflow-hidden flex justify-start items-center rounded-tr-full z-10"
            >
              {/* High-res wood texture base */}
              <div 
                className="absolute inset-y-0 left-0 w-[200%] bg-[url('https://images.unsplash.com/photo-1542038385-9875dbcb0279?auto=format&fit=crop&q=80&w=800&fm=webp')] bg-cover bg-right pointer-events-none opacity-40 mix-blend-luminosity"
              ></div>
              
              {/* Embossed Door Panel styling */}
              <div className="absolute inset-4 md:inset-8 left-1 md:left-2 border-[8px] md:border-[16px] border-[#0a0502]/80 shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] rounded-tr-full rounded-bl-sm pointer-events-none"></div>
              <div className="absolute inset-8 md:inset-16 left-4 md:left-8 border-4 md:border-8 border-brand-gold/10 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] rounded-tr-full rounded-bl-sm pointer-events-none"></div>

              {/* Realistic Center Edge (Where doors meet) */}
              <div className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black via-[#3a1d0f] to-transparent z-20"></div>
              <div className="absolute inset-y-0 left-0 w-[2px] bg-black/80 z-20"></div>

              {/* Majestic Right Door Handle */}
              <div className="relative left-4 md:left-24 z-30 drop-shadow-[-10px_10px_15px_rgba(0,0,0,0.8)]">
                {/* Backplate */}
                <div className="w-8 h-32 md:w-16 md:h-64 bg-gradient-to-b from-[#b8860b] via-[#d4af37] to-[#8a6d1c] rounded-full flex justify-center items-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border border-[#ffdf73]/20">
                  {/* Pull Ring */}
                  <div className="w-6 h-6 md:w-12 md:h-12 border-[4px] md:border-[8px] border-[#2a2a2a] rounded-full bg-gradient-to-tr from-[#8a6d1c] to-[#d4af37] shadow-[5px_5px_10px_rgba(0,0,0,0.9)]"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div 
            style={{ opacity: scrollIndicatorOpacity, willChange: "opacity" }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center animate-bounce text-brand-gold pointer-events-none"
          >
            <span className="text-sm tracking-[0.3em] uppercase mb-4 font-bold bg-black/80 px-8 py-3 rounded-full border border-brand-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.2)] backdrop-blur-md">Scroll To Enter</span>
            <svg className="w-8 h-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </motion.div>

        </div>
      </section>

      {/* --- THE LEGACY (ABOUT US) --- */}
      <section className="py-24 bg-brand-bg relative z-10 border-t border-brand-gold/10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <ScrollReveal direction="up" duration={0.8}>
            <p className="text-brand-gold text-sm tracking-widest uppercase mb-4 font-bold flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-brand-gold/50"></span>
              Our Legacy
              <span className="w-12 h-[1px] bg-brand-gold/50"></span>
            </p>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-brand-light mb-8 leading-tight drop-shadow-md">
              A Tradition of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-[#ffe58f]">Royal Hospitality</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-10 opacity-60"></div>
            <p className="text-gray-300 font-light text-lg md:text-xl leading-relaxed mb-6 drop-shadow-sm">
              For over two decades, Delhi Premier has stood as a beacon of luxury, hosting the city's most prestigious gatherings under the open sky. Our majestic rooftop palace seamlessly blends historical Mughal architecture with modern world-class amenities, ensuring every celebration is etched into eternity.
            </p>
            <p className="text-gray-400 font-light text-md md:text-lg leading-relaxed">
              Step into an ambiance curated for kings and queens. From our authentic culinary masterpieces to our unparalleled panoramic views, your royal experience awaits.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- PALACE GATEWAYS (ARCH NAVIGATION COMPONENT) --- */}
      <ArchwayNav />

      {/* --- PARALLAX GALLERY SECTION --- */}
      <section ref={galleryRef} className="py-24 bg-brand-dark border-y border-brand-gold/10 overflow-hidden relative">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal direction="up" duration={0.6}>
            <p className="text-brand-gold text-sm tracking-widest uppercase mb-2 font-bold">A Glimpse of Magic</p>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brand-light mb-16">Royal Highlights</h2>
          </ScrollReveal>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 lg:grid lg:grid-cols-4 lg:gap-6 max-w-7xl mx-auto h-[450px] lg:h-[600px] items-center custom-scrollbar pb-8 lg:pb-0 px-4">
            {[
              { img: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=600&fm=webp', y: galleryY1 },
              { img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600&fm=webp', y: galleryY2 },
              { img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=600&fm=webp', y: galleryY1 },
              { img: 'https://images.unsplash.com/photo-1533174000276-2617f69b4e53?auto=format&fit=crop&q=80&w=600&fm=webp', y: galleryY2 }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                style={{ y: isMobile ? 0 : item.y, willChange: "transform" }}
                className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-full h-[350px] md:h-[450px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] group relative overflow-hidden border-2 border-brand-gold/10 hover:border-brand-gold/40 transition-colors"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: [0.4, 0.1, 0.5, 0.2][i] }}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                  <span className="text-brand-gold font-serif font-bold tracking-widest uppercase text-sm">View Highlight</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GOOGLE REVIEWS SECTION --- */}
      <section className="py-24 bg-brand-bg relative">
        <div className="container mx-auto px-4">
          <ScrollReveal direction="up" duration={0.6} className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-brand-light mb-6">Words of Praise</h2>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-bold text-brand-light">4.9</span>
              <div className="flex text-yellow-400 text-xl drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
              </div>
              <span className="text-brand-gold tracking-widest text-sm font-semibold uppercase ml-2">Google Verified</span>
            </div>
          </ScrollReveal>

          <div className="flex overflow-x-auto snap-x snap-mandatory gap-8 pb-12 custom-scrollbar px-4 lg:px-0 max-w-7xl mx-auto items-stretch">
            {[
              { name: 'Rahul Sharma', text: 'Absolutely mesmerizing venue! We hosted our corporate gala here and the view of the skyline mixed with the elite decor was breathtaking. The North Indian food was exceptional.', date: '2 weeks ago' },
              { name: 'Priya & Aman', text: 'We had our wedding reception at the Royal Palace Rooftop. The team took care of everything seamlessly. All our 400 guests were praising the ambiance and the Platinum buffet.', date: '1 month ago' },
              { name: 'Vikram Singh', text: 'Best open-air party hall in the city. We threw a milestone 50th birthday here and the live DJ setup under the stars made it a night to remember. Highly recommended.', date: '3 months ago' },
              { name: 'Neha Gupta', text: 'Very professional staff and top-notch catering. The booking process was so transparent with their instant calculator. Loved the entire experience!', date: '4 months ago' }
            ].map((review, i) => (
              <ScrollReveal 
                key={i}
                direction="up"
                delay={i * 0.1}
                className="snap-center shrink-0 w-[85vw] md:w-[400px] h-auto bg-brand-card/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-brand-gold/20 flex flex-col justify-between hover:border-brand-gold/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-gold to-yellow-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-light text-lg">{review.name}</h4>
                      <p className="text-xs text-brand-gold tracking-wider">{review.date}</p>
                    </div>
                    <svg className="w-6 h-6 ml-auto drop-shadow-md" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </div>
                  <div className="flex text-yellow-400 text-sm mb-4">
                    {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed font-light">"{review.text}"</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
