import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import ScrollReveal from '../components/ScrollReveal';

const Contact = () => {
  const { openBookingForm } = useBooking();

  return (
    <div className="py-20 bg-brand-bg min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-5xl">
        <ScrollReveal direction="up" duration={0.4}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-center text-brand-text mb-4">Contact <span className="text-brand-red">Us</span></h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to plan your luxury event under the stars? Reach out to our event specialists today.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <ScrollReveal 
            direction="left" 
            duration={0.5}
            className="space-y-8 bg-brand-card p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100"
          >
            <h2 className="text-2xl font-serif font-bold text-brand-text">Get in Touch</h2>
            
            <div className="flex items-start gap-4">
              <div className="bg-red-50 p-3 rounded-full text-brand-red"><MapPin size={24} /></div>
              <div>
                <h3 className="font-bold text-brand-text">Location</h3>
                <p className="text-gray-600">Level 7, 123 Proxy Street,<br/>Proxy Area, New Delhi - 110000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-50 p-3 rounded-full text-brand-red"><Phone size={24} /></div>
              <div>
                <h3 className="font-bold text-brand-text">Phone & WhatsApp</h3>
                <p className="text-gray-600">+91 99999 00000</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-50 p-3 rounded-full text-brand-red"><Mail size={24} /></div>
              <div>
                <h3 className="font-bold text-brand-text">Email</h3>
                <p className="text-gray-600">bookings@delhipremierhall.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-red-50 p-3 rounded-full text-brand-red"><Clock size={24} /></div>
              <div>
                <h3 className="font-bold text-brand-text">Office Hours</h3>
                <p className="text-gray-600">Everyday: 10:00 AM - 8:00 PM</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Quick CTA */}
          <ScrollReveal 
            direction="right" 
            duration={0.5} 
            delay={0.2}
            className="bg-brand-dark text-brand-light p-8 rounded-2xl shadow-xl flex flex-col justify-center text-center"
          >
            <h2 className="text-3xl font-serif font-bold text-brand-gold mb-4">Instantly Check Pricing</h2>
            <p className="text-gray-300 mb-8 max-w-sm mx-auto">
              Skip the wait and use our interactive calculator to see real-time package breakdowns for your desired guest count.
            </p>
            <button 
              onClick={openBookingForm}
              className="bg-brand-red text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-red-800 transition-colors shadow-lg"
            >
              Open Price Calculator
            </button>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
