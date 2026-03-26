import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const UrgencyBanner = () => {
  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-brand-gold text-brand-text py-2 px-4 text-center text-sm font-semibold flex items-center justify-center gap-2"
    >
      <AlertCircle size={16} />
      <span>Limited Availability: Only 2 weekend dates left this month! Book now to secure your spot.</span>
    </motion.div>
  );
};

export default UrgencyBanner;
