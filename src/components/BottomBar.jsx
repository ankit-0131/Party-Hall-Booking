import { PhoneCall, MessageCircle, CalendarCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

const BottomBar = () => {
  const { openBookingForm } = useBooking();

  const handleWhatsApp = () => {
    // Standard wa.me link layout for generic quick connect
    window.open('https://wa.me/919999900000?text=Hi%2C%20I%20am%20interested%20in%20booking%20the%20Delhi%20Premier%20Rooftop%20Hall.', '_blank');
  };

  const handleCall = () => {
    window.open('tel:+919999900000', '_self');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-bg border-t border-gray-200 shadow-[0_-4px_6px_rgba(0,0,0,0.1)] flex md:hidden z-40">
      <button 
        onClick={handleCall}
        className="flex-1 flex flex-col items-center justify-center py-2 text-brand-text active:bg-gray-100 transition-colors"
      >
        <PhoneCall size={22} className="mb-1" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Call</span>
      </button>
      
      <button 
        onClick={handleWhatsApp}
        className="flex-1 flex flex-col items-center justify-center py-2 text-green-600 border-x border-gray-200 active:bg-gray-100 transition-colors"
      >
        <MessageCircle size={22} className="mb-1" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
      </button>

      <button 
        onClick={openBookingForm}
        className="flex-1 flex flex-col items-center justify-center py-2 bg-brand-red text-white active:bg-red-800 transition-colors"
      >
        <CalendarCheck size={22} className="mb-1" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">Book</span>
      </button>
    </div>
  );
};

export default BottomBar;
