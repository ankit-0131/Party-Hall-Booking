import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    date: null,
    guests: 1,
    packageType: 'standard', // standard, premium, platinum
    totalCost: 0,
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const packages = {
    standard: { name: 'Standard', pricePerPlate: 1200 },
    premium: { name: 'Premium (North Indian)', pricePerPlate: 1800 },
    platinum: { name: 'Platinum (Full Experience)', pricePerPlate: 2500 }
  };

  const calculateTotal = (guests, pkgCost) => guests * pkgCost;

  const updateBooking = (field, value) => {
    setBookingData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'guests' || field === 'packageType') {
        const pkgPrice = packages[updated.packageType].pricePerPlate;
        updated.totalCost = calculateTotal(updated.guests || 1, pkgPrice);
      }
      return updated;
    });
  };

  const openBookingForm = () => setIsFormOpen(true);
  const closeBookingForm = () => setIsFormOpen(false);

  return (
    <BookingContext.Provider value={{ bookingData, updateBooking, packages, isFormOpen, openBookingForm, closeBookingForm }}>
      {children}
    </BookingContext.Provider>
  );
};
