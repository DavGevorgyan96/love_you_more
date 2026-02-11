import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComingSoon } from './components/ComingSoon';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { ContactIcons } from './components/ContactIcons';
import { About } from './components/About';
import { Services } from './components/Services';
import { Activities } from './components/Activities';
import { SuitesAmenities } from './components/SuitesAmenities';
// import { AvailabilityCta } from './components/AvailabilityCta';
import { EngagingDailyEvents } from './components/EngagingDailyEvents';
// import { Gallery } from './components/Gallery';
import { BookTour } from './components/BookTour';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import GallerySlider from './components/GallerySlider';

const showComingSoon = import.meta.env.VITE_SHOW_COMING_SOON === 'true';

export default function App() {
  if (showComingSoon) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <ToastContainer position="bottom-center" theme="light" />
      <Navbar />
      <Header />
      <ContactIcons />

      <main>
        <About />
        <Services />
        <Activities />
        <SuitesAmenities />
        {/* <AvailabilityCta /> */}
        <EngagingDailyEvents />
        {/* <Gallery /> */}
        <GallerySlider />
        <Faq />
        <Contact />
        <BookTour />
        <Footer />
      </main>
    </div>
  );
}
