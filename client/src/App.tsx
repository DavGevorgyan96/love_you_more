import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { ContactIcons } from './components/ContactIcons';
import { About } from './components/About';
import { Services } from './components/Services';
import { Activities } from './components/Activities';
import { SuitesAmenities } from './components/SuitesAmenities';
import { AvailabilityCta } from './components/AvailabilityCta';
import { EngagingDailyEvents } from './components/EngagingDailyEvents';
import { Gallery } from './components/Gallery';
import { BookTour } from './components/BookTour';
import { Faq } from './components/Faq';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans bg-slate-50">
      <Navbar />
      <Header />
      <ContactIcons />

      <main>
        <About />
        <Services />
        <Activities />
        <SuitesAmenities />
        <AvailabilityCta />
        <EngagingDailyEvents />
        <Gallery />
        <Faq />
        <Contact />
        <BookTour />
        <Footer />
      </main>
    </div>
  );
}
