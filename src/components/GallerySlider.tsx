import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { OrchidSmall } from './OrchidSmall';

const GALLERY_SUBTITLE =
  '24/7 Dedicated staff available around the clock for safety and assistance';

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
  'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
  'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
];

const IMAGE_COUNT = GALLERY_IMAGES.length;
const INFINITE_IMAGES = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

const LG_BREAKPOINT = 1024;
const MD_BREAKPOINT = 768;
const RESET_THRESHOLD = 0.01;
const LOCK_RELEASE_MS = 50;

type SizeMode = 'lg' | 'md' | 'sm';

interface SizeConfig {
  imageWidth: number;
  imageHeight: number;
  imageGap: number;
  thumbWidth: number;
  thumbHeight: number;
  thumbGap: number;
}

const SIZE_CONFIG: Record<SizeMode, SizeConfig> = {
  lg: {
    imageWidth: 836.571,
    imageHeight: 488,
    imageGap: 40,
    thumbWidth: 233.6,
    thumbHeight: 181,
    thumbGap: 38,
  },
  md: {
    imageWidth: 560,
    imageHeight: 327,
    imageGap: 24,
    thumbWidth: 160,
    thumbHeight: 93,
    thumbGap: 24,
  },
  sm: {
    imageWidth: 380,
    imageHeight: 281,
    imageGap: 16,
    thumbWidth: 118,
    thumbHeight: 107,
    thumbGap: 12,
  },
};

function getSizeMode(width: number): SizeMode {
  if (width >= LG_BREAKPOINT) return 'lg';
  if (width >= MD_BREAKPOINT) return 'md';
  return 'sm';
}

function modIndex(index: number, length: number): number {
  return ((index % length) + length) % length;
}

export default function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(IMAGE_COUNT);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const thumbScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  const [sizeMode, setSizeMode] = useState<SizeMode>(() =>
    typeof window !== 'undefined' ? getSizeMode(window.innerWidth) : 'lg'
  );

  useEffect(() => {
    const onResize = () => setSizeMode(getSizeMode(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const config = SIZE_CONFIG[sizeMode];
  const step = config.imageWidth + config.imageGap;
  const thumbStep = config.thumbWidth + config.thumbGap;

  const scrollToIndex = useCallback(
    (index: number, smooth: boolean = true) => {
      if (!mainScrollRef.current || isScrollingRef.current) return;
      mainScrollRef.current.scrollTo({
        left: index * step,
        behavior: smooth ? 'smooth' : 'auto',
      });
    },
    [step]
  );

  const scrollThumbToIndex = useCallback(
    (index: number, smooth: boolean = true) => {
      if (!thumbScrollRef.current) return;
      thumbScrollRef.current.scrollTo({
        left: index * thumbStep,
        behavior: smooth ? 'smooth' : 'auto',
      });
    },
    [thumbStep]
  );

  const scrollMainAndThumb = useCallback(
    (index: number, smooth: boolean = true) => {
      scrollToIndex(index, smooth);
      scrollThumbToIndex(index, smooth);
    },
    [scrollToIndex, scrollThumbToIndex]
  );

  const nextImage = useCallback(() => {
    const next = currentIndex + 1;
    setCurrentIndex(next);
    scrollMainAndThumb(next);
  }, [currentIndex, scrollMainAndThumb]);

  const prevImage = useCallback(() => {
    const prev = currentIndex - 1;
    setCurrentIndex(prev);
    scrollMainAndThumb(prev);
  }, [currentIndex, scrollMainAndThumb]);

  const handleThumbnailClick = useCallback(
    (clickedIndex: number) => {
      const base = currentIndex - modIndex(currentIndex, IMAGE_COUNT);
      const newIndex = base + clickedIndex;
      setCurrentIndex(newIndex);
      scrollMainAndThumb(newIndex);
    },
    [currentIndex, scrollMainAndThumb]
  );

  const applyReset = useCallback(
    (resetIndex: number) => {
      isScrollingRef.current = true;
      const el = mainScrollRef.current;
      const thumb = thumbScrollRef.current;
      if (el) el.scrollLeft = resetIndex * step;
      if (thumb) thumb.scrollLeft = resetIndex * thumbStep;
      setCurrentIndex(resetIndex);
      setTimeout(() => {
        isScrollingRef.current = false;
      }, LOCK_RELEASE_MS);
    },
    [step, thumbStep]
  );

  useEffect(() => {
    const el = mainScrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const left = el.scrollLeft;
      const rightBound = (IMAGE_COUNT * 2 - RESET_THRESHOLD) * step;
      const leftBound = RESET_THRESHOLD * step;

      if (left >= rightBound || left <= leftBound) {
        applyReset(IMAGE_COUNT);
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [step, applyReset]);

  useEffect(() => {
    if (mainScrollRef.current && thumbScrollRef.current) {
      scrollMainAndThumb(IMAGE_COUNT, false);
    }
  }, []);

  useEffect(() => {
    if (mainScrollRef.current && thumbScrollRef.current) {
      scrollMainAndThumb(currentIndex, false);
    }
  }, [sizeMode]);

  const displayIndex = useMemo(
    () => modIndex(currentIndex, IMAGE_COUNT),
    [currentIndex]
  );
  const currentPage = displayIndex + 1;

  return (
    <section id="gallery" className="relative">
      <div className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-10 hidden lg:block">
        <OrchidSmall className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-right-bottom" />
      </div>
      <div className="bg-white content-stretch flex flex-col gap-[16px] items-center py-[60px] relative size-full">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Gallery
        </h2>
        <p className="mt-4 text-center font-sans text-[24px] font-light italic leading-[1.3] text-[#282828]">
          {GALLERY_SUBTITLE}
        </p>

        <div className="w-full overflow-hidden relative">
          <div
            ref={mainScrollRef}
            className="content-stretch flex items-start relative shrink-0 overflow-x-hidden"
            style={{
              gap: `${config.imageGap}px`,
              height: `${config.imageHeight}px`,
              paddingLeft: `calc(50% - ${config.imageWidth / 2}px)`,
              paddingRight: `calc(50% - ${config.imageWidth / 2}px)`,
            }}
          >
            {INFINITE_IMAGES.map((img, index) => (
              <div
                key={index}
                className="rounded-[60px] shrink-0 bg-[#c4c4c4]"
                style={{
                  width: config.imageWidth,
                  height: config.imageHeight,
                }}
              >
                <img
                  alt={`Gallery image ${modIndex(index, IMAGE_COUNT) + 1}`}
                  className="size-full object-cover pointer-events-none rounded-[60px]"
                  src={img}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full overflow-hidden relative">
          <div
            ref={thumbScrollRef}
            className="content-stretch flex items-center relative shrink-0 overflow-x-hidden"
            style={{
              gap: `${config.thumbGap}px`,
              paddingLeft: `calc(50% - ${config.thumbWidth / 2}px)`,
              paddingRight: `calc(50% - ${config.thumbWidth / 2}px)`,
            }}
          >
            {INFINITE_IMAGES.map((img, index) => {
              const thumbIndex = modIndex(index, IMAGE_COUNT);
              const isActive = index === currentIndex;
              return (
                <button
                  key={index}
                  type="button"
                  className={`rounded-[30px] shrink-0 transition-all cursor-pointer hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isActive ? 'bg-[#8f8f8f] ring-black/30' : 'bg-[#c4c4c4]'
                    }`}
                  style={{
                    width: config.thumbWidth,
                    height: config.thumbHeight,
                  }}
                  onClick={() => handleThumbnailClick(thumbIndex)}
                  aria-label={`View gallery image ${thumbIndex + 1} of ${IMAGE_COUNT}`}
                  aria-current={isActive ? true : undefined}
                >
                  <img
                    alt=""
                    className="size-full object-cover pointer-events-none rounded-[30px]"
                    src={img}
                    draggable={false}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="content-stretch flex font-sans font-normal gap-[8px] items-start leading-[1.3] not-italic relative shrink-0 text-[18px] text-black"
          role="group"
          aria-label="Gallery navigation"
        >
          <button
            type="button"
            onClick={prevImage}
            className="relative shrink-0 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Previous image"
          >
            &lt;
          </button>
          <p className="relative shrink-0" aria-live="polite" aria-atomic="true">
            {currentPage} / {IMAGE_COUNT}
          </p>
          <button
            type="button"
            onClick={nextImage}
            className="relative shrink-0 hover:opacity-60 transition-opacity cursor-pointer"
            aria-label="Next image"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>

  );
}
