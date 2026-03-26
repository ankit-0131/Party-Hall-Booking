import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, IndianRupee, CheckCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBooking } from '../context/BookingContext';

const BookingModal = () => {
  const { isFormOpen, closeBookingForm, bookingData, updateBooking, packages } = useBooking();
  const [step, setStep] = useState(1); // 1: Calc, 2: Details, 3: Success
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (!bookingData.date) return alert("Please select a date.");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Fake submission delay for UX
    await new Promise(r => setTimeout(r, 1500));
    
    // In a real app we'd call Firebase & EmailJS here.
    // e.g. await addDoc(collection(db, "leads"), {...formData, ...bookingData})
    // e.g. await emailjs.send(...)
    
    setIsSubmitting(false);
    setStep(3);
  };

  const handleWhatsAppRedirect = () => {
    const text = `Hi, I am ${formData.name}. I just requested a booking for ${bookingData.date?.toLocaleDateString()} for ${bookingData.guests} guests (${packages[bookingData.packageType].name} package). Please confirm availability!`;
    window.open(`https://wa.me/919999900000?text=${encodeURIComponent(text)}`, '_blank');
    closeBookingForm();
    setTimeout(() => setStep(1), 500); // reset
  };

  return (
    <AnimatePresence>
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-brand-bg/95 backdrop-blur-xl border border-brand-gold/20 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] w-full max-w-lg overflow-hidden relative"
          >
            {/* Header */}
            <div className="bg-brand-red p-6 text-white flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold">
                {step === 1 ? 'Instant Price Calculator' : step === 2 ? 'Your Details' : 'Booking Requested!'}
              </h2>
              <button onClick={closeBookingForm} className="text-white hover:text-brand-gold transition">
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Calendar size={16}/> Select Event Date</label>
                      <DatePicker
                        selected={bookingData.date}
                        onChange={(date) => updateBooking('date', date)}
                        minDate={new Date()}
                        className="w-full border border-brand-gold/20 rounded-xl p-3 focus:ring-2 focus:ring-brand-gold outline-none bg-brand-dark/50 text-brand-text"
                        placeholderText="Choose a date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2"><Users size={16}/> Number of Guests</label>
                      <input 
                        type="number" 
                        min="1" 
                        value={bookingData.guests}
                        onChange={(e) => updateBooking('guests', parseInt(e.target.value) || 1)}
                        className="w-full border border-brand-gold/20 rounded-xl p-3 focus:ring-2 focus:ring-brand-gold outline-none bg-brand-dark/50 text-brand-text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Select Package</label>
                      <select 
                        value={bookingData.packageType}
                        onChange={(e) => updateBooking('packageType', e.target.value)}
                        className="w-full border border-brand-gold/20 rounded-xl p-3 focus:ring-2 focus:ring-brand-gold outline-none bg-brand-dark/50 text-brand-text"
                      >
                        {Object.entries(packages).map(([key, pkg]) => (
                          <option key={key} value={key}>{pkg.name} - ₹{pkg.pricePerPlate}/plate</option>
                        ))}
                      </select>
                    </div>

                    <div className="mt-6 p-4 bg-brand-bg rounded-xl border border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Total Estimation</span>
                        <span className="text-2xl font-bold text-brand-text flex items-center">
                          <IndianRupee size={20} />
                          {bookingData.totalCost.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 text-right">*Excludes applicable taxes</p>
                    </div>

                    <button 
                      onClick={handleNext}
                      className="w-full bg-brand-gold text-brand-text font-bold text-lg py-4 rounded-xl mt-4 hover:bg-yellow-500 transition-colors shadow-lg"
                    >
                      Proceed to Book
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-brand-gold/20 rounded-xl p-3 bg-brand-dark/50 text-brand-text outline-none focus:ring-2 focus:ring-brand-gold" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border border-brand-gold/20 rounded-xl p-3 bg-brand-dark/50 text-brand-text outline-none focus:ring-2 focus:ring-brand-gold" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-brand-gold/20 rounded-xl p-3 bg-brand-dark/50 text-brand-text outline-none focus:ring-2 focus:ring-brand-gold" />
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button type="button" onClick={() => setStep(1)} className="w-1/3 py-3 font-semibold text-gray-600 border border-gray-300 rounded-xl hover:bg-brand-bg">Back</button>
                      <button type="submit" disabled={isSubmitting} className="w-2/3 bg-brand-red text-white font-bold py-3 rounded-xl hover:bg-red-800 transition-colors shadow-md disabled:bg-red-400">
                        {isSubmitting ? 'Sending...' : 'Request Booking'}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-serif font-bold text-brand-text mb-2">Request Received!</h3>
                  <p className="text-gray-600 mb-6">Our event specialist will contact you shortly to confirm your date.</p>
                  
                  <button 
                    onClick={handleWhatsAppRedirect}
                    className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    Connect on WhatsApp Now
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
