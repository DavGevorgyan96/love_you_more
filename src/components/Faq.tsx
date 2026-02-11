import { useState } from 'react';
import { OrchidSmall, getOrchidSmallDataUrl } from './OrchidSmall';

const FAQ_ITEMS = [
  {
    question: 'What is an RCFE?',
    answer:
      'An RCFE (Residential Care Facility for the Elderly) is often called "Assisted Living" or a "Board and Care home." Unlike a large, clinical nursing home, our villa is a licensed residential home that provides non-medical care and supervision in a warm, intimate setting.',
  },
  {
    question: 'Can I visit my loved one at any time?',
    answer:
      'Absolutely. This is your loved one\'s home. We encourage family involvement and have an open-door policy for visits, as we believe family connection is vital to our residents\' well-being.',
  },
  {
    question: "What happens if my loved one's care needs change?",
    answer:
      'We offer "Aging in Place." As a resident\'s needs increase, we adjust their care plan accordingly. We also coordinate with home health and hospice agencies so that residents can stay in their familiar, loving environment even as their health needs evolve.',
  },
  {
    question: 'What is the cost of living at Love You More?',
    answer:
      'Our rates are based on the level of care required and the type of room selected. Because we are a boutique facility, our pricing is often more transparent and inclusive than larger facilities that "nickel and dime" for every extra service. Please contact us for a personalized quote.',
  },
  {
    question: 'Do you provide specialized care for Dementia or Alzheimer\'s?',
    answer:
      'Yes, we are equipped and trained to provide specialized support for those with cognitive impairments, ensuring a safe and calm environment that reduces wandering and anxiety.',
  },
  {
    question: 'The "Love You More" Promise',
    answer:
      'When you can\'t be there 24/7, we are. We provide the professional care they need so you can go back to being a daughter, son, or spouse again.',
  },
];

function FaqAccordionItem({
  id,
  question,
  answer,
  open,
  onToggle,
}: {
  id: string;
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#E5E5E5]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        id={`${id}-button`}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition"
      >
        <span className="font-sans text-[22px] font-semibold leading-[1.3] tracking-normal text-[#282828]">
          {question}
        </span>
        <svg
          className={`mt-0.5 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-300 ease-out ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={`${id}-button`}
        aria-hidden={!open}
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="pb-5 pr-8 font-sans text-[18px] font-normal leading-[1.4] tracking-normal text-[#282828]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-visible bg-white px-3  lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">

      {/* Corner florals */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <OrchidSmall className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-right-bottom" />
      </div>

      {/* Orchid watermark background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage: `url(${getOrchidSmallDataUrl()})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '120px auto',
          backgroundAttachment: 'fixed',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1200px] pt-8 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-[120px] pb-16">
        <h2
          className="font-normal capitalize leading-[0.85] tracking-normal text-black text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-10 sm:mt-12">
          {FAQ_ITEMS.map((item, i) => (
            <FaqAccordionItem
              key={i}
              id={`faq-panel-${i}`}
              question={item.question}
              answer={item.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
