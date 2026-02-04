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
import { BlockPlaceholder } from './components/BlockPlaceholder';

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
        <BlockPlaceholder id="faq" title="FAQ" />
        <BlockPlaceholder id="contact" title="Contact" className="bg-white" />
      </main>
    </div>
  );
}
