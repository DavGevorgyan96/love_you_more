import { useState } from 'react';
import orchidBgLeft from '../assets/images/OrchidBackgroundLeft.svg';
import orchidBgRight from '../assets/images/OrchidBackgroundRight.svg';
import { OrchidSmall } from './OrchidSmall';

const SUBTITLE =
  '24/7 Dedicated staff available around the clock for safety and assistance';

const SERVICES_ITEMS = [
  {
    title: 'Personal Care & Daily Living',
    content: (
      <>
        <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">
          We provide respectful, one-on-one assistance with the essential tasks of daily life,
          tailored to each resident&apos;s level of independence.
        </p>
        <ul className="mt-3 list-disc pl-5 font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">
          <li>Hygiene & Grooming: Assistance with bathing, hair care, oral hygiene, and dressing.</li>
          <li>Mobility Support: Help with walking, stand-by assistance, and safe transfers (e.g., from bed to chair).</li>
          <li>Incontinence Care: Compassionate and discreet management of personal care needs.</li>
          <li>Escort Service: Assistance moving to and from the dining area and activity spaces.</li>
        </ul>
      </>
    ),
  },
  { title: 'Health & Medication Management', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Oversight of medications, coordination with healthcare providers, and support with health monitoring.</p> },
  { title: 'Culinary Excellence', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Nutritious, chef-prepared meals tailored to dietary needs and preferences.</p> },
  { title: 'Hospitality & Environment', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Housekeeping, linen service, and a comfortable, well-maintained living environment.</p> },
  { title: 'Engagement & Social Vitality', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Activities, outings, and programs designed to support social connection and purpose.</p> },
  { title: 'Mobile Hair/Barber Manicure/Pedicure Services', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">On-site grooming and personal care services for convenience and dignity.</p> },
  { title: 'Horticulture Therapy', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Gardening and plant-based activities to support wellness and engagement.</p> },
];

const SPECIALIZED_ITEMS = [
  { title: "Dementia & Alzheimer's Care:", content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Specialized support and a secure, calming environment for residents with memory care needs.</p> },
  { title: 'Memory Care:', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Structured programs and trained staff focused on cognitive and emotional well-being.</p> },
  { title: 'Cognitive Stimulation Therapy (CST)', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Evidence-based group activities to support memory and cognitive function.</p> },
  { title: 'Home health support:', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Coordination with home health agencies for nursing and therapy as needed.</p> },
  { title: 'Hospice Support:', content: <p className="font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828]">Compassionate end-of-life care and family support in partnership with hospice providers.</p> },
];

function AccordionItem({
  title,
  children,
  open,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#909090]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left font-sans text-[20px] md:text-[22px] font-bold leading-[1.2] tracking-normal text-[#282828]"
      >
        <span>{title}</span>
        <svg
          className={`h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-4 pr-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const [openService, setOpenService] = useState<number | null>(0);
  const [openSpecialized, setOpenSpecialized] = useState<number | null>(null);

  return (
    <section id="services" className="relative overflow-visible bg-white px-3   lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <OrchidSmall className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-right-bottom" />
      </div>
      {/* Large orchid backgrounds — left and right, behind content */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-0 opacity-[0.08]"
        aria-hidden
      >
        <img
          src={orchidBgLeft}
          alt=""
          className="h-auto max-h-[70vh] w-[min(400px,35vw)] object-contain object-left-bottom"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 right-0 z-0 opacity-[0.08]"
        aria-hidden
      >
        <img
          src={orchidBgRight}
          alt=""
          className="h-auto max-h-[70vh] w-[min(400px,35vw)] object-contain object-right-bottom"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] pt-8 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-[120px]">
        {/* Title */}
        <h2
          className="font-normal capitalize leading-[0.85] tracking-normal text-black text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Our Services & Amenities
        </h2>
        <p className="mt-4 font-sans text-[24px] font-normal italic leading-[1.3] tracking-normal text-[#282828]">
          {SUBTITLE}
        </p>

        {/* Services accordion */}
        <div className="mt-[30px] md:mt-12">
          <div className="flex items-center gap-4 border-b border-[#909090] pb-2">
            <h3 className="font-sans text-[24px] font-light italic leading-[1.2] tracking-normal text-[#282828]">Services</h3>
          </div>
          <div className="mt-0 sm:mt-4">
            {SERVICES_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                title={item.title}
                open={openService === i}
                onToggle={() => setOpenService(openService === i ? null : i)}
              >
                {item.content}
              </AccordionItem>
            ))}
          </div>
        </div>

        {/* Specialized Care Services accordion */}
        <div className="mt-[30px] md:mt-14">
          <h3 className="font-sans text-[24px] font-light italic leading-[1.2] tracking-normal text-[#4D4D4D]">
            Specialized Care Services
          </h3>
          <div className="mt-0 sm:mt-4">
            {SPECIALIZED_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                title={item.title}
                open={openSpecialized === i}
                onToggle={() => setOpenSpecialized(openSpecialized === i ? null : i)}
              >
                {item.content}
              </AccordionItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
