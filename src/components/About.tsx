import { useCallback, useEffect, useRef, useState } from "react";
import floralAccent from "../assets/images/floral_accent.png";
import { OrchidIcon } from "./OrchidIcon";

type SlideContent = { text: string } | { items: string[] };
const PHILOSOPHY_SLIDES: Array<
  { image: string; title: string } & SlideContent
> = [
    {
      image: "https://picsum.photos/seed/about1/600/750",
      title: "Our Philosophy: The Gold Orchid Standard",
      text: 'At Love You More, we believe that aging should be a promotion in quality of life, not a retreat from it. We replace the clinical coldness of traditional facilities with the warmth of a true home. By maintaining a boutique, intimate setting, we ensure that every resident is not just "monitored," but deeply known, respected, and cherished. Our name is not just a brand—it is our operational mandate. In every interaction, we choose to go further, listen longer, and love you more.',
    },
    {
      image: "https://picsum.photos/seed/about2/600/750",
      title: "Our Vision",
      text: "At Love You More Residential Villa, we don't look at where senior care is—we look at where it should be. Our vision is to eliminate the 'institutional' feel of aging, replacing it with a curated residential experience. We see a future where families feel an absolute sense of peace, knowing their loved ones are in a place where excellence is the baseline, and the Gold Orchid is the promise.",
    },
    {
      image: "https://picsum.photos/seed/about3/600/750",
      title: "Our Mission",
      text: "At Love You More Residential Villa, our mission is to provide a sanctuary of comfort and compassion that transcends traditional senior living, to honor the life stories of our residents by providing a boutique, home-based environment where every individual feels deeply known, safely protected, and genuinely loved.",
    },
    {
      image: "https://picsum.photos/seed/about4/600/750",
      title: "Our Core Values",
      text: "At Love You More Residential Villa, we honor your trust through radical transparency and executive stewardship. We don't just manage care; we protect your family's legacy with the integrity the Gold Standard demands. By adapting our home to the resident—never the resident to our home—we ensure proactive safety and uncompromising dignity while nourishing the body, mind, and spirit.",
    },
    {
      image: "https://picsum.photos/seed/about5/600/750",
      title: "Our Core Commitment",
      text: "At Love You More Residential Villa, we provide guaranteed consistency in standards and a profound respect for personal privacy and boundaries. Our approach centers on proactive holistic health monitoring and a dedicated focus on quality time and connection. By prioritizing active memory and identity integration, we ensure that every resident is met with the validation and empathy they deserve.",
    },
  ];

const CEO_PARAGRAPHS = [
  "Trust is earned through actions, not just words. I take the responsibility of your trust personally.",
  'When I founded Love You More Residential Villa, I did so with a single uncompromising question in mind: "If my residents were my mother and father, would this be enough?" That question will always remain the heartbeat of everything we do here.',
  "We define our care by the Gold Orchid Standard. This benchmark represents our commitment to a lifestyle that is as resilient as it is refined. Just as the orchid requires a specific, nurturing environment to flourish, we provide a meticulously curated sanctuary designed for the individual. While the Villa provides the home, our heart remains our greatest asset.",
  '"The Villa is our setting; our heart is our signature."',
  "Thank you for allowing us to be a part of your story.",
  "With heart and dedication,",
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
    <section id="about" className="relative overflow-visible bg-white px-3   lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block scale-y-[-1]">
        <img
          src={floralAccent}
          alt=""
          className="lg:h-[258px] lg:w-[247px] xl:h-[298px] xl:w-[287px] object-contain object-left-top"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block scale-y-[-1]">
        <img
          src={floralAccent}
          alt=""
          className="lg:h-[258px] lg:w-[247px] xl:h-[298px] xl:w-[287px] scale-x-[-1] object-contain object-right-top"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] pt-[21px] sm:pt-12 md:pt-16 lg:pt-24 xl:pt-[120px]">
        {/* Title: About Love You More Residential Villa */}
        <h2
          className="font-normal capitalize leading-[0.85] tracking-normal text-black text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          About Love You More Residential Villa
        </h2>

        {/* Two columns: image + philosophy (carousel) — crossfade */}
        <div className="mt-[21px] sm:mt-[31px] md:mt-[60px] flex flex-col gap-[40px] min-[920px]:flex-row xl:h-[400px]" role="region" aria-roledescription="carousel" aria-label="About us philosophy">
          <div className="mx-auto h-[281px] w-full shrink-0 overflow-hidden rounded-2xl bg-slate-200 sm:h-[358px] sm:rounded-[20px] md:h-[403px] min-[920px]:w-[360px] md:rounded-[25px] lg:mx-0 lg:h-[400px] lg:w-[400px] lg:rounded-[30px] xl:h-[400px] xl:w-[350px]">
            <img
              key={activeSlide}
              src={PHILOSOPHY_SLIDES[activeSlide].image}
              alt={PHILOSOPHY_SLIDES[activeSlide].title}
              className="h-full w-full object-cover transition-opacity duration-300 ease-out"
            />
          </div>
          <div className="min-w-0 w-full flex flex-col justify-between h-[400px] lg:h-[300px] xl:h-[420px] max-[919px]:flex-shrink-0">
            {(() => {
              const item = PHILOSOPHY_SLIDES[activeSlide];
              return (
                <div
                  key={activeSlide}
                  className="animate-fade-in max-[919px]:min-h-0 max-[919px]:overflow-y-auto max-[919px]:flex-1 max-[919px]:pr-1"
                >
                  <h3 className="font-sans text-[22px] font-bold capitalize leading-[1.2] tracking-normal text-black">
                    {(() => {
                      const colonIndex = item.title.indexOf(":");
                      if (colonIndex >= 0) {
                        const beforeColon = item.title.slice(0, colonIndex + 1);
                        const afterColon = item.title.slice(colonIndex + 1).trim();
                        return (
                          <>
                            <span>{beforeColon}</span>
                            <br className="sm:hidden" />
                            <span>{afterColon}</span>
                          </>
                        );
                      }
                      return item.title;
                    })()}
                  </h3>
                  {"text" in item ? (
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
            <div className="flex flex-col items-center max-[919px]:flex-shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  aria-label="Previous slide"
                >
                  <span className="text-[30px] font-light opacity-50">
                    &lt;
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    goNext();
                    resetAutoPlay();
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  aria-label="Next slide"
                >
                  <span className="text-[30px] font-light opacity-50">
                    &gt;
                  </span>
                </button>
              </div>
              <div className="flex max-sm:w-full items-center gap-3 max-sm:justify-around">
                {PHILOSOPHY_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className="transition-opacity hover:opacity-80"
                    aria-label={`Go to slide ${i + 1} of ${totalSlides}`}
                  >
                    <OrchidIcon
                      color={i === activeSlide ? "#282828" : "#D9D9D9"}
                      width={41}
                      height={35}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* A Message From Our CEO */}
        <h2
          className="mt-[60px] font-normal capitalize leading-[1.08] tracking-normal text-black text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          A Message From Our CEO
        </h2>
        <div className="mt-4 sm:mt-6 w-full">
          {CEO_PARAGRAPHS.map((text, i) => (
            <p
              key={i}
              className={`font-sans text-[18px] font-normal leading-[1.3] tracking-normal text-[#282828] ${i > 0 ? "mt-4" : ""}`}
            >
              {text}
            </p>
          ))}
        </div>

        {/* CEO signature block */}
        <div className="mt-[20px] sm:mt-[40px] flex max-w-[714px] flex-wrap items-center gap-[37px]">
          <div>
            <p className="font-sans text-lg font-regular text-[#282828] sm:text-xl">
              Armine Marie Jimenez
            </p>
            <p className="mt-1 font-sans text-sm text-[#909090] sm:text-base">
              Founder/CEO, Love You More Residential Villa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
