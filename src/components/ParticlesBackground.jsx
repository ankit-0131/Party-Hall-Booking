import { motion } from 'framer-motion';

const ParticlesBackground = () => {
  // Generate 25 floating light particles
  const particles = Array.from({ length: 25 }).map((_, i) => {
    const size = Math.random() * 4 + 2; // 2px to 6px
    return {
      id: i,
      size,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10, // 10s to 20s
    };
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,1)]"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -200, -400],
            x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;
