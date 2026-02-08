import { useCallback, useEffect, useRef, useState } from 'react';
import floralAccent from '../assets/images/floral_accent.png';
import { OrchidIcon } from './OrchidIcon';

type SlideContent = { text: string } | { items: string[] };
const PHILOSOPHY_SLIDES: Array<{ image: string; title: string } & SlideContent> = [
  {
    image: 'https://picsum.photos/seed/about1/600/750',
    title: 'Our Philosophy: The Gold Orchid Standard',
    text: 'At Love You More, we believe that aging should be a promotion in quality of life, not a retreat from it. We replace the clinical coldness of traditional facilities with the warmth of a true home. By maintaining a boutique, intimate setting, we ensure that every resident is not just "monitored," but deeply known, respected, and cherished. Our name is our daily standard: in every interaction, we choose to go further, listen longer, and love you more.',
  },
  {
    image: 'https://picsum.photos/seed/about2/600/750',
    title: 'Our Core Values',
    items: [
      'Radical Personalization: We adapt our home to the resident, never the resident to our home.',
      'Uncompromising Dignity: We uphold the self-worth and autonomy of every senior, regardless of their level of care.',
      'Presence-Based Safety: Our high caregiver-to-resident ratio ensures that safety is proactive, not reactive.',
      'Holistic Vitality: We nourish the body with home-cooked meals, the mind with engagement, and the spirit with companionship.',
    ],
  },
  {
    image: 'https://picsum.photos/seed/about3/600/750',
    title: 'Mission Statement',
    text: 'To provide a sanctuary of comfort and compassion that transcends traditional senior living. At Love You More Residential Villa, our mission is to honor the life stories of our residents by providing a boutique, home-based environment where every individual feels deeply known, safely protected, and genuinely loved.',
  },
  {
    image: 'https://picsum.photos/seed/about4/600/750',
    title: 'Our Core Commitment',
    items: [
      'Guaranteed consistency in standards',
      'Profound Respect for Personal Privacy and Boundaries',
      'Proactive Holistic Health monitoring',
      'Focus on quality time and connection',
      'Active Memory and Identity Integration',
      'Validation and empathy',
    ],
  },
];

const CEO_PARAGRAPHS = [
  'To Our Families,',
  'I founded Love You More Residential Villa to offer the same level of devotion I would give my own family.',
  'Our mission is to provide a sanctuary where luxury meets personalized care. Like the orchid, we believe every resident is unique and deserves a beautiful, tranquil environment to flourish. We are here to ensure your loved ones are not just cared for, but truly cherished.',
  'At the Villa, we don\'t just offer a home—we offer a heart.',
  'We are Honored to Welcome You to Our Family',
];

const AUTO_ADVANCE_MS = 500000;

export function About() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = PHILOSOPHY_SLIDES.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    setActiveSlide((p) => (p < totalSlides - 1 ? p + 1 : 0));
  }, [totalSlides]);

  const resetAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
  }, [goNext]);

  useEffect(() => {
    intervalRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  const goPrev = () => {
    setActiveSlide((p) => (p > 0 ? p - 1 : totalSlides - 1));
    resetAutoPlay();
  };
  const goTo = (i: number) => {
    setActiveSlide(i);
    resetAutoPlay();
  };

  return (
    <section id="about" className="relative overflow-visible bg-white">

      {/* Corner florals — как в ContactIcons: фиксированный размер 287×298 */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block scale-y-[-1]">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] object-contain object-left-top"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block scale-y-[-1]">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] scale-x-[-1] object-contain object-right-top"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1232px] px-4 pt-8 sm:pt-12 md:pt-16 lg:pt-24  xl:pt-[120px]">
        {/* Title: About Love You More Residential Villa */}
        <h2
          className="font-normal capitalize leading-[0.85] tracking-normal text-black max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          About Love You More Residential Villa
        </h2>

        {/* Two columns: image + philosophy (carousel) — crossfade */}
        <div className="mt-[60px] flex flex-col gap-[40px] min-[920px]:flex-row xl:h-[440px]">
          <div className="mx-auto h-[440px] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-200 sm:h-[358px] sm:rounded-[20px] md:h-[403px] min-[920px]:w-[360px] md:rounded-[25px] lg:mx-0 lg:h-[448px] lg:w-[400px] lg:rounded-[30px] xl:h-[440px] xl:w-[440px]">
            <img
              key={activeSlide}
              src={PHILOSOPHY_SLIDES[activeSlide].image}
              alt=""
              className="h-full w-full object-cover transition-opacity duration-300 ease-out"
            />
          </div>
          <div className="min-w-0 w-full flex flex-col justify-between max-[919px]:h-[420px] max-[919px]:flex-shrink-0">
            {(() => {
              const item = PHILOSOPHY_SLIDES[activeSlide];
              return (
                <div key={activeSlide} className="animate-fade-in max-[919px]:min-h-0 max-[919px]:overflow-y-auto max-[919px]:flex-1 max-[919px]:pr-1">
                  <h3 className="font-sans text-[20px] font-bold capitalize leading-[1.2] tracking-normal text-black">
                    {item.title}
                  </h3>
                  {'text' in item ? (
                    <p className="mt-4 font-sans font-normal leading-[1.3] tracking-normal text-[#282828] text-[16px]">
                      {item.text}
                    </p>
                  ) : (
                    <ul className="mt-4 list-disc pl-6 font-sans font-normal leading-[1.3] tracking-normal text-[#282828] text-[16px]">
                      {item.items.map((bullet, bi) => (
                        <li key={bi}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })()}
            {/* Carousel nav: стрелки сверху, орхидеи снизу — фиксированы снизу при max-width 919px */}
            <div className="mt-6 flex flex-col items-center max-[919px]:flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  aria-label="Previous"
                >
                  <span className="text-[36px] font-light opacity-50">&lt;</span>
                </button>
                <button
                  type="button"
                  onClick={() => { goNext(); resetAutoPlay(); }}
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  aria-label="Next"
                >
                  <span className="text-[36px] font-light opacity-50">&gt;</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                {PHILOSOPHY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className="transition-opacity hover:opacity-80"
                    aria-label={`Slide ${i + 1}`}
                  >
                    <OrchidIcon
                      color={i === activeSlide ? '#282828' : '#D9D9D9'}
                      width={28}
                      height={24}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* A Message From Our CEO */}
        <h2
          className="mt-[60px] font-normal capitalize leading-[1.08] tracking-normal text-black max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          A Message From Our CEO
        </h2>
        <div className="mt-6 w-full">
          {CEO_PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              className={`font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828] ${i > 0 ? 'mt-4' : ''}`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* CEO signature block */}
        <div className="mt-[40px] flex max-w-[714px] flex-wrap items-center gap-6 lg:gap-8">
          <div className="h-[120px] w-[120px] shrink-0 rounded-[30px] bg-slate-200" aria-hidden />
          <div>
            <p className="font-sans text-lg font-regular text-[#282828] sm:text-xl">
              Armine Marie Jimenez
            </p>
            <p className="mt-1 font-sans text-sm text-[#909090] sm:text-base">
              Co-founder & CEO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
