import { useCallback, useEffect, useRef, useState } from 'react';
import { OrchidSmall } from './OrchidSmall';
import smallOrchidIcon from '../assets/images/SmallOrchidIcon.svg';

const GAP = 16;
const SLIDE_COUNT = 3;
const SCROLL_END_DELAY_MS = 120;

type SlideWidthMode = '100%' | '50%' | '33.333333%';

function getSlideWidthMode(): SlideWidthMode {
  if (typeof window === 'undefined') return '100%';
  const w = window.innerWidth;
  if (w < 640) return '100%';
  if (w < 768) return '50%';
  return '33.333333%';
}

function getSlideWidthPx(containerWidth: number, mode: SlideWidthMode): number {
  if (mode === '100%') return containerWidth;
  if (mode === '50%') return (containerWidth - GAP) / 2;
  return containerWidth / 3;
}

function getSlideStyleWidth(mode: SlideWidthMode): string {
  if (mode === '50%') return 'calc(50% - 8px)';
  return mode;
}

const TIERS = [
  {
    tier: 'Gold Tier I',
    title: 'Supportive Living',
    description:
      'Independent & Supervised: Requires Minimal Assistance With Physical Tasks; Focus Is On Medication Management, Social Engagement, And Safety Monitoring',
    bullets: [
      'Medication Administration',
      'Stand-By Assistance With Showering',
      'Light Mobility Support',
    ],
  },
  {
    tier: 'Gold Tier II',
    title: 'Assisted Living',
    description:
      'Hands-On & Comprehensive: Requires Regular Staff Assistance With Multiple Activities Of Daily Living (ADLs): Focus On Mobility, Dressing, And Bathing Assistance',
    bullets: [
      'Full Hands-On ADL Assistance, Transfer Support',
      'Heightened Wellness Checks',
    ],
  },
  {
    tier: 'Gold Tier III',
    title: 'Enhanced Support',
    description:
      'Advanced & Personalized: Requires High Levels Of Physical Assistance, Two-Person Transfers (If Applicable), Or Specialized Support For Advanced Memory/Behavioral Needs.',
    bullets: [
      'Highest Staff-To-Resident Ratio, Complex Care Coordination, And Specialized Behavioral Redirection.',
    ],
  },
] as const;

type Tier = (typeof TIERS)[number];

function scrollToContact() {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return;
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={scrollToContact}
      onKeyDown={(e) => e.key === 'Enter' && scrollToContact()}
      className={`flex h-[460px] w-full max-w-full md:cursor-pointer flex-col rounded-[30px] bg-[#EFEFEF] px-5 py-5 transition-shadow sm:max-w-[372px] lg:h-[507px] lg:px-8 lg:py-6 hover:shadow-[0_8px_6px_0_rgba(0,0,0,0.15)]`}
    >
      <p className="shrink-0 text-center font-sans text-[20px] font-bold leading-[120%] tracking-normal text-[#282828] md:text-[22px]">
        {tier.tier}
      </p>
      <div className="my-3 flex shrink-0 justify-center gap-0.5 lg:my-5 lg:gap-1">
        {Array.from({ length: index + 1 }).map((_, j) => (
          <img
            key={j}
            src={smallOrchidIcon}
            alt=""
            className="h-[48px] w-[60px] object-contain lg:h-[56px] lg:w-[70px]"
            aria-hidden
          />
        ))}
      </div>
      <p
        className="shrink-0 text-center text-[32px] font-normal capitalize leading-[85%] tracking-normal text-[#282828] md:text-[48px]"
        style={{ fontFamily: '"Tangerine", cursive' }}
      >
        {tier.title}
      </p>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <p className="mt-2 font-sans text-[13px] font-normal leading-[1.5] text-[#282828] lg:mt-3 lg:text-[16px]">
          {tier.description.includes(': ') ? (
            <>
              <span className="text-[16px] font-bold text-[#282828]">
                {tier.description.split(': ')[0]}:
              </span>
              <span> {tier.description.split(': ').slice(1).join(': ')}</span>
            </>
          ) : (
            tier.description
          )}
        </p>
        <ul className="mt-2 list-disc pl-4 text-left font-sans text-[13px] font-normal leading-[1.5] text-[#282828] lg:mt-3 lg:pl-5 lg:text-[15px]">
          {tier.bullets.map((b, j) => (
            <li key={j}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function getScrollPositionForSlide(
  slideIndex: number,
  containerWidth: number,
  slideWidthPx: number,
  totalSlideWidth: number
): number {
  return slideIndex * totalSlideWidth - containerWidth / 2 + slideWidthPx / 2;
}

export function Activities() {
  const [slideWidthMode, setSlideWidthMode] = useState<SlideWidthMode>(getSlideWidthMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isJumpingRef = useRef(false);
  const scrollStartIndexRef = useRef(0);
  const scrollStartLeftRef = useRef(0);
  const lastReportedIndexRef = useRef(0);
  const onScrollEndRef = useRef<() => void>(() => { });

  const captureScrollStart = useCallback(() => {
    const el = containerRef.current;
    if (el) {
      scrollStartIndexRef.current = currentIndex;
      scrollStartLeftRef.current = el.scrollLeft;
    }
  }, [currentIndex]);

  useEffect(() => {
    const onResize = () => setSlideWidthMode(getSlideWidthMode());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToSlide = useCallback(
    (slideIndex: number) => {
      const el = containerRef.current;
      if (!el) return;
      lastReportedIndexRef.current = slideIndex;
      scrollStartIndexRef.current = slideIndex;
      const cw = el.clientWidth;
      const slidePx = getSlideWidthPx(cw, slideWidthMode);
      const total = slidePx + GAP;
      const maxScroll = Math.max(0, SLIDE_COUNT * slidePx + (SLIDE_COUNT - 1) * GAP - cw);
      const left = getScrollPositionForSlide(slideIndex, cw, slidePx, total);
      isJumpingRef.current = true;
      el.scrollTo({ left: Math.max(0, Math.min(maxScroll, left)), behavior: 'smooth' });
    },
    [slideWidthMode]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const cw = el.clientWidth;
    const slidePx = getSlideWidthPx(cw, slideWidthMode);
    const total = slidePx + GAP;
    const start = Math.max(0, getScrollPositionForSlide(0, cw, slidePx, total));
    el.scrollLeft = start;
    scrollStartLeftRef.current = start;
    const t = setTimeout(() => {
      el.scrollLeft = start;
      scrollStartLeftRef.current = start;
    }, 100);
    return () => clearTimeout(t);
  }, [slideWidthMode]);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || isJumpingRef.current) return;
    const cw = el.clientWidth;
    const slidePx = getSlideWidthPx(cw, slideWidthMode);
    const total = slidePx + GAP;
    const center = el.scrollLeft + cw / 2;
    let index = Math.round((center - slidePx / 2) / total);
    index = Math.max(0, Math.min(SLIDE_COUNT - 1, index));
    if (lastReportedIndexRef.current !== index) {
      lastReportedIndexRef.current = index;
      setCurrentIndex(index);
    }
  }, [slideWidthMode]);

  const handleScrollEnd = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (isJumpingRef.current) {
      isJumpingRef.current = false;
      return;
    }
    const cw = el.clientWidth;
    const slidePx = getSlideWidthPx(cw, slideWidthMode);
    const total = slidePx + GAP;
    const positions = [0, 1, 2].map((i) => getScrollPositionForSlide(i, cw, slidePx, total));
    const startIdx = scrollStartIndexRef.current;
    const prevIdx = startIdx > 0 ? startIdx - 1 : -1;
    const nextIdx = startIdx < SLIDE_COUNT - 1 ? startIdx + 1 : -1;
    const swipedLeft = el.scrollLeft > positions[startIdx];
    const otherIdx = swipedLeft ? nextIdx : prevIdx;
    const allowed = otherIdx === -1 ? [startIdx] : [startIdx, otherIdx];
    const nearest =
      Math.abs(el.scrollLeft - positions[allowed[0]]) <=
        Math.abs(el.scrollLeft - positions[allowed[allowed.length - 1]])
        ? allowed[0]
        : allowed[allowed.length - 1];
    const target = positions[nearest];
    if (Math.abs(el.scrollLeft - target) < 2) return;
    isJumpingRef.current = true;
    lastReportedIndexRef.current = nearest;
    setCurrentIndex(nearest);
    scrollStartIndexRef.current = nearest;
    scrollStartLeftRef.current = target;
    el.scrollTo({ left: target, behavior: 'smooth' });
  }, [slideWidthMode]);

  onScrollEndRef.current = handleScrollEnd;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout>;
    const onScrollStop = () => {
      clearTimeout(timer);
      timer = setTimeout(() => onScrollEndRef.current(), SCROLL_END_DELAY_MS);
    };
    el.addEventListener('scroll', onScrollStop, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScrollStop);
      clearTimeout(timer);
    };
  }, []);

  const slideStyleWidth = getSlideStyleWidth(slideWidthMode);

  return (
    <section id="" className="relative overflow-visible bg-white px-4 md:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <OrchidSmall className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-right-bottom" />
      </div>

      <div className="relative z-10 mx-auto pt-8 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-[120px]">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Personalized Care Tiers
        </h2>

        <div className="mt-8 rounded-[30px] p-4 lg:mt-12 lg:p-5">
          <div className="md:hidden">
            <div
              ref={containerRef}
              onScroll={handleScroll}
              onTouchStart={captureScrollStart}
              onPointerDown={captureScrollStart}
              className="activities-carousel flex gap-4 overflow-x-auto overflow-y-hidden pb-12 touch-pan-x cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              role="region"
              aria-label="Carousel"
            >
              {TIERS.map((tier, i) => (
                <div
                  key={i}
                  className="carousel-slide flex shrink-0 justify-center"
                  style={{ width: slideStyleWidth, minWidth: slideStyleWidth }}
                >
                  <div className="mx-auto w-full">
                    <TierCard tier={tier} index={i} />
                  </div>
                </div>
              ))}
            </div>
            <div className="-mt-8 flex justify-center gap-2" aria-hidden>
              {[0, 1, 2].map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSlide(i)}
                  className={`h-2 rounded-full transition-colors ${currentIndex === i ? 'w-6 bg-[#4a90d9]' : 'w-2 bg-[#ccc]'
                    }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hidden md:flex md:justify-center md:gap-x-[22px]">
            {TIERS.map((tier, i) => (
              <div key={tier.tier} className="w-full max-w-[372px]">
                <TierCard tier={tier} index={i} />
              </div>
            ))}
          </div>

          <p
            className="mt-10 text-center font-normal capitalize leading-[85%] tracking-normal text-black text-[40px] lg:mt-14 lg:text-[80px]"
            style={{ fontFamily: '"Tangerine", cursive' }}
          >
            Discover The Love You More Standard
          </p>
          <p className="mt-6 text-center font-sans text-[18px] italic leading-[120%] tracking-normal text-[#4C4C4C] lg:mt-[40px] lg:text-[24px]">
            <span className="font-extrabold text-[#282828]">Note: </span>
            <span className="font-normal text-[#282828]">Care is personalized and adjusted based on assessment.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
