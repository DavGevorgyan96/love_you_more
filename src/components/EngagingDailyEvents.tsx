// import floralAccent from '../assets/images/floral_accent.png';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { OrchidSmall } from './OrchidSmall';

const SLIDER_BREAKPOINT = 920;
const RESET_THRESHOLD = 0.01;
const LOCK_RELEASE_MS = 50;

const EVENTS_ITEMS = [
  {
    title: 'Gentle movement / fitness',
    description:
      'Daily guided activities (yoga, stretching) suitable for all mobility levels',
    image: 'https://picsum.photos/seed/gallery-fitness/578/460',
  },
  {
    title: 'Gardening and Outdoor Time',
    description:
      'Nurturing a plant allows residents to transition from "care-receiver" to "care-provider" restoring a sense of dignity.',
    image: 'https://picsum.photos/seed/gallery-garden/578/460',
  },
  {
    title: 'Freshly Cooked Daily Meals',
    description:
      'Three daily, home-cooked meals, snacks and accommodating special diets',
    image: 'https://picsum.photos/seed/gallery-meals/578/460',
  },
  {
    title: 'Music and Dance',
    description:
      'When words fail, music speaks. At the Villas, we keep the music playing.',
    image: 'https://picsum.photos/seed/gallery-music/578/460',
  },
  {
    title: 'Creative Arts',
    description:
      'Periodic arts and crafts sessions, including seasonal decor making and painting.',
    image: 'https://picsum.photos/seed/gallery-arts/578/460',
  },
  {
    title: 'Social Connection',
    description:
      'Organized morning coffee hours and afternoon tea where residents mingle in the shared lounge or garden areas.',
    image: 'https://picsum.photos/seed/gallery-social/578/460',
  },
];

const EVENTS_COUNT = EVENTS_ITEMS.length;
const INFINITE_EVENTS = [...EVENTS_ITEMS, ...EVENTS_ITEMS, ...EVENTS_ITEMS];

const SLIDER_SIZE_BREAKPOINT = 768;

type SliderSizeMode = 'sm' | 'md';

interface SliderSizeConfig {
  cardWidth: number;
  imageHeight: number;
  gap: number;
}

const SLIDER_SIZE_CONFIG: Record<SliderSizeMode, SliderSizeConfig> = {
  sm: { cardWidth: 320, imageHeight: 280, gap: 20 },
  md: { cardWidth: 450, imageHeight: 380, gap: 24 },
};

function getSliderSizeMode(width: number): SliderSizeMode {
  return width < SLIDER_SIZE_BREAKPOINT ? 'sm' : 'md';
}

function modIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

export function EngagingDailyEvents() {
  const [isSlider, setIsSlider] = useState(
    typeof window !== 'undefined' ? window.innerWidth < SLIDER_BREAKPOINT : false
  );
  const [sliderSizeMode, setSliderSizeMode] = useState<SliderSizeMode>(() =>
    typeof window !== 'undefined' ? getSliderSizeMode(window.innerWidth) : 'md'
  );
  const [currentIndex, setCurrentIndex] = useState(EVENTS_COUNT);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const dragRef = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setIsSlider(w < SLIDER_BREAKPOINT);
      setSliderSizeMode(getSliderSizeMode(w));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const sliderConfig = SLIDER_SIZE_CONFIG[sliderSizeMode];
  const step = sliderConfig.cardWidth + sliderConfig.gap;

  const scrollToIndex = useCallback(
    (index: number, smooth: boolean = true) => {
      if (!mainScrollRef.current || isScrollingRef.current) return;
      mainScrollRef.current.scrollTo({
        left: index * step,
        behavior: smooth ? 'smooth' : 'auto',
      });
      setCurrentIndex(index);
    },
    [step]
  );

  const applyReset = useCallback(
    (resetIndex: number) => {
      isScrollingRef.current = true;
      const el = mainScrollRef.current;
      if (el) el.scrollLeft = resetIndex * step;
      setCurrentIndex(resetIndex);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, LOCK_RELEASE_MS);
    },
    [step]
  );

  const snapToNearest = useCallback(() => {
    const el = mainScrollRef.current;
    if (!el || isScrollingRef.current) return;
    const nearestIndex = Math.round(el.scrollLeft / step);
    const targetLeft = nearestIndex * step;
    if (Math.abs(el.scrollLeft - targetLeft) > 1) {
      isScrollingRef.current = true;
      el.scrollTo({ left: targetLeft, behavior: 'smooth' });
      setCurrentIndex(nearestIndex);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 400);
    } else {
      setCurrentIndex(nearestIndex);
    }
  }, [step]);

  useEffect(() => {
    const el = mainScrollRef.current;
    if (!el || !isSlider) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const left = el.scrollLeft;
      const rightBound = (EVENTS_COUNT * 2 - RESET_THRESHOLD) * step;
      const leftBound = RESET_THRESHOLD * step;

      if (left >= rightBound || left <= leftBound) {
        applyReset(EVENTS_COUNT);
      }
    };

    let snapTimeout: ReturnType<typeof setTimeout>;
    const handleScrollEnd = () => {
      clearTimeout(snapTimeout);
      snapTimeout = setTimeout(snapToNearest, 80);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    el.addEventListener('scroll', handleScrollEnd, { passive: true });
    if ('onscrollend' in window) {
      el.addEventListener('scrollend', snapToNearest);
    }

    return () => {
      el.removeEventListener('scroll', handleScroll);
      el.removeEventListener('scroll', handleScrollEnd);
      if ('onscrollend' in window) {
        el.removeEventListener('scrollend', snapToNearest);
      }
      clearTimeout(snapTimeout);
    };
  }, [isSlider, step, applyReset, snapToNearest]);

  useEffect(() => {
    const el = mainScrollRef.current;
    if (!el || !isSlider) return;

    const onMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      e.preventDefault();
      dragRef.current = {
        isDragging: true,
        startX: e.clientX,
        startScrollLeft: el.scrollLeft,
      };
      el.style.cursor = 'grabbing';
      el.style.userSelect = 'none';
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current.isDragging || !mainScrollRef.current) return;
      const el = mainScrollRef.current;
      const dx = e.clientX - dragRef.current.startX;
      el.scrollLeft = dragRef.current.startScrollLeft - dx;
    };

    const onMouseUp = () => {
      if (!dragRef.current.isDragging) return;
      dragRef.current.isDragging = false;
      if (mainScrollRef.current) {
        mainScrollRef.current.style.cursor = '';
        mainScrollRef.current.style.userSelect = '';
      }
      snapToNearest();
    };

    el.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      el.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [isSlider, snapToNearest]);

  useEffect(() => {
    if (mainScrollRef.current && isSlider) {
      scrollToIndex(currentIndex, false);
    }
  }, [isSlider, sliderSizeMode]);

  const handleDotClick = useCallback(
    (clickedIndex: number) => {
      const base = currentIndex - modIndex(currentIndex, EVENTS_COUNT);
      const newIndex = base + clickedIndex;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    },
    [currentIndex, scrollToIndex]
  );

  const displayIndex = useMemo(
    () => modIndex(currentIndex, EVENTS_COUNT),
    [currentIndex]
  );

  return (
    <section id="activities" className="relative overflow-visible bg-white px-0">
      {/* Corner florals */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <OrchidSmall className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-right-bottom" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] sm:pt-0 md:pt-16 lg:pt-24 lg:pb-14 xl:pt-[120px] xl:pb-14">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Engaging Daily Events
        </h2>

        {isSlider ? (
          <div className="mt-4 md:mt-10">
            <div className="w-full overflow-hidden relative">
              <div
                ref={mainScrollRef}
                className="content-stretch flex items-start relative shrink-0 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
                style={{
                  gap: `${sliderConfig.gap}px`,
                  paddingLeft: `calc(50% - ${sliderConfig.cardWidth / 2}px)`,
                  paddingRight: `calc(50% - ${sliderConfig.cardWidth / 2}px)`,
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {INFINITE_EVENTS.map((item, index) => (
                  <article
                    key={index}
                    className="shrink-0 flex flex-col"
                    style={{ width: sliderConfig.cardWidth }}
                  >
                    <div
                      className="w-full overflow-hidden rounded-[60px] bg-[#c4c4c4]"
                      style={{ height: sliderConfig.imageHeight }}
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-full w-full object-cover pointer-events-none rounded-[60px]"
                        draggable={false}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center pt-5">
                      <h3
                        className="font-sans text-[22px] font-bold text-[#282828]"
                        style={{
                          lineHeight: '120%',
                          letterSpacing: 0,
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="mt-2 font-sans text-[18px] font-normal text-[#282828]"
                        style={{
                          lineHeight: '130%',
                          letterSpacing: 0,
                          width: '90%',
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-center justify-center leading-[1.3] not-italic relative shrink-0 text-[18px] text-black mt-6">
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: EVENTS_COUNT }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleDotClick(i)}
                    className="rounded-full shrink-0 transition-opacity cursor-pointer hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#282828]"
                    style={{
                      width: 20,
                      height: 20,
                      opacity: 1,
                      backgroundColor: i === displayIndex ? '#282828' : 'rgba(40, 40, 40, 0.3)',
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                    aria-current={i === displayIndex ? 'true' : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-[40px] mt-4 md:mt-10 lg:mt-12">
            {EVENTS_ITEMS.map((item, i) => (
              <article
                key={i}
                className="w-[387px]  xl:w-[578px] max-w-full flex-col"
              >
                <div className="h-[300px] 2xl:h-[460px] w-full overflow-hidden rounded-[60px]">
                  <img
                    src={item.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center pt-5">
                  <h3
                    className="font-sans text-[22px] font-bold text-[#282828]"
                    style={{
                      lineHeight: '120%',
                      letterSpacing: 0,
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 font-sans text-[18px] font-normal text-[#282828]"
                    style={{
                      lineHeight: '130%',
                      letterSpacing: 0,
                      width: '90%',
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
