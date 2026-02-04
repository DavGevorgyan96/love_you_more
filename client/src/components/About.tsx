import { useState } from 'react';
import floralAccent from '../assets/images/floral_accent.png';
import { OrchidIcon } from './OrchidIcon';

const PHILOSOPHY_SLIDES = [
  {
    image: 'https://picsum.photos/seed/about1/600/750',
    title: 'Our Philosophy: The Gold Orchid Standard',
    text: 'At Love You More, we believe that aging should be a promotion in quality of life, not a retreat from it. We replace the clinical coldness of traditional facilities with the warmth of a true home. By maintaining a boutique, intimate setting, we ensure that every resident is not just "monitored," but deeply known, respected, and cherished. Our name is our daily standard: in every interaction, we choose to go further, listen longer, and love you more.',
  },
  {
    image: 'https://picsum.photos/seed/about2/600/750',
    title: 'A Boutique Setting for Personalized Care',
    text: 'We keep our community small by design. Fewer residents means more time, attention, and genuine connection for each person. Every team member knows every resident—their stories, preferences, and needs. This is not institutional care; this is family.',
  },
  {
    image: 'https://picsum.photos/seed/about3/600/750',
    title: 'Wellness and Dignity Every Day',
    text: 'From nutritious meals to meaningful activities and peaceful surroundings, we focus on what makes life rich at every stage. Our programs support physical, emotional, and social wellness so that every day feels purposeful and dignified.',
  },
  {
    image: 'https://picsum.photos/seed/about4/600/750',
    title: 'Family Involvement and Peace of Mind',
    text: 'We partner closely with families so you stay connected and informed. Open communication, visits, and shared care decisions are at the heart of what we do. Your peace of mind matters as much as your loved one’s comfort.',
  },
];

const CEO_PARAGRAPHS = [
  'To Our Families,',
  'I founded Love You More Residential Villa to offer the same level of devotion I would give my own family.',
  'Our mission is to provide a sanctuary where luxury meets personalized care. Like the orchid, we believe every resident is unique and deserves a beautiful, tranquil environment to flourish. We are here to ensure your loved ones are not just cared for, but truly cherished.',
  'At the Villa, we don\'t just offer a home—we offer a heart.',
  'We are Honored to Welcome You to Our Family',
];

export function About() {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = PHILOSOPHY_SLIDES.length;

  return (
    <section id="about" className="relative overflow-visible bg-white">
      {/* Top blue line */}
      <div className="h-0.5 w-full bg-[#6B9BD1]" />

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
        <div className="mt-[60px] flex gap-[40px] xl:h-[500px]">
          <div className="relative mx-auto h-[314px] w-[280px] shrink-0 overflow-hidden rounded-2xl bg-slate-200 sm:h-[358px] sm:w-[320px] sm:rounded-[20px] md:h-[403px] md:w-[360px] md:rounded-[25px] lg:mx-0 lg:h-[448px] lg:w-[400px] lg:rounded-[30px] xl:h-[500px] xl:w-[446px]">
            {PHILOSOPHY_SLIDES.map((item, i) => (
              <div
                key={i}
                className="absolute inset-0 h-full w-full transition-opacity duration-300 ease-out"
                style={{
                  opacity: activeSlide === i ? 1 : 0,
                  pointerEvents: activeSlide === i ? 'auto' : 'none',
                }}
                aria-hidden={activeSlide !== i}
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="min-w-0 w-full py-[40px] flex flex-col">
            <div className="relative" style={{ height: '-webkit-fill-available' }}>
              {PHILOSOPHY_SLIDES.map((item, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-300 ease-out"
                  style={{
                    opacity: activeSlide === i ? 1 : 0,
                    pointerEvents: activeSlide === i ? 'auto' : 'none',
                  }}
                  aria-hidden={activeSlide !== i}
                >
                  <h3 className="font-sans text-[24px] font-bold capitalize leading-[1.2] tracking-normal text-black">
                    {item.title}
                  </h3>
                  <p className="mt-4 font-sans text-[24px] font-normal leading-[1.3] tracking-normal text-[#282828]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
            {/* Carousel nav: стрелки сверху, орхидеи снизу */}
            <div className="mt-6 flex flex-col items-center gap-[37px]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSlide((p) => (p > 0 ? p - 1 : totalSlides - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  aria-label="Previous"
                >
                  <span className="text-lg">&lt;</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlide((p) => (p < totalSlides - 1 ? p + 1 : 0))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-400 transition hover:border-slate-300 hover:text-slate-600"
                  aria-label="Next"
                >
                  <span className="text-lg">&gt;</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                {PHILOSOPHY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveSlide(i)}
                    className="transition-opacity hover:opacity-80"
                    aria-label={`Slide ${i + 1}`}
                  >
                    <OrchidIcon
                      color={i === activeSlide ? '#000000' : '#D9D9D9'}
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
              className={`font-sans text-[24px] font-normal leading-[1.3] tracking-normal text-[#282828] ${i > 0 ? 'mt-4' : ''}`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* CEO signature block */}
        <div className="mt-10 flex max-w-[714px] flex-wrap items-center gap-6 lg:gap-8">
          <div className="h-20 w-20 shrink-0 rounded-xl bg-slate-200 sm:h-24 sm:w-24" aria-hidden />
          <div>
            <p className="font-sans text-lg font-semibold text-[#282828] sm:text-xl">
              Armine Marie Jimenez
            </p>
            <p className="mt-1 font-sans text-sm text-[#6B7280] sm:text-base">
              Co-founder & CEO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
