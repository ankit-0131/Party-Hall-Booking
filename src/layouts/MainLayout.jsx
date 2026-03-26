import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BottomBar from '../components/BottomBar';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';
import FloatingBackground from '../components/FloatingBackground';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <FloatingBackground />
      <Navbar />
      <main className="flex-grow pb-16 md:pb-0 relative z-10">
        <Outlet />
      </main>
      <Footer />
      <BottomBar />
      <BookingModal />
    </div>
  );
};

export default MainLayout;
