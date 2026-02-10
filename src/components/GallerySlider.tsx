import { useState, useRef, useEffect } from 'react';

const GALLERY_IMAGES = [
  {
    imgelink:
      'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
  {
    imgelink:
      'https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  },
  {
    imgelink:
      'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
  },
  {
    imgelink:
      'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
  },
  {
    imgelink:
      'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
  },
];

const originalImages = GALLERY_IMAGES.map((img) => img.imgelink);
const thumbnailImages = GALLERY_IMAGES.map((img) => img.imgelink);

const IMAGE_WIDTH = 836.571;
const IMAGE_GAP = 40;
const THUMB_WIDTH = 233.6;
const THUMB_GAP = 38;

export default function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const thumbScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Create infinite loop by tripling the array
  const infiniteImages = [...originalImages, ...originalImages, ...originalImages];
  const infiniteThumbnails = [...thumbnailImages, ...thumbnailImages, ...thumbnailImages];
  const originalLength = originalImages.length;

  const scrollToIndex = (index: number, smooth: boolean = true) => {
    if (!mainScrollRef.current || isScrollingRef.current) return;

    const scrollPosition = index * (IMAGE_WIDTH + IMAGE_GAP);
    mainScrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const scrollThumbToIndex = (index: number, smooth: boolean = true) => {
    if (!thumbScrollRef.current) return;
    const scrollPosition = index * (THUMB_WIDTH + THUMB_GAP);
    thumbScrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  const scrollMainAndThumb = (index: number, smooth: boolean = true) => {
    scrollToIndex(index, smooth);
    scrollThumbToIndex(index, smooth);
  };

  const nextImage = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollMainAndThumb(newIndex);
  };

  const prevImage = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollMainAndThumb(newIndex);
  };

  const handleThumbnailClick = (clickedIndex: number) => {
    const newIndex = currentIndex - (currentIndex % originalLength) + clickedIndex;
    setCurrentIndex(newIndex);
    scrollMainAndThumb(newIndex);
  };

  const step = IMAGE_WIDTH + IMAGE_GAP;
  const thumbStep = THUMB_WIDTH + THUMB_GAP;

  // Reset infinite scroll only when scroll position reaches boundary (after smooth scroll ends)
  useEffect(() => {
    const el = mainScrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;
      const left = el.scrollLeft;
      const rightBound = (originalLength * 2 - 0.01) * step; // reset only when almost at 10
      const leftBound = 0.01 * step;

      if (left >= rightBound) {
        isScrollingRef.current = true;
        const resetIndex = originalLength;
        el.scrollLeft = resetIndex * step;
        thumbScrollRef.current && (thumbScrollRef.current.scrollLeft = resetIndex * thumbStep);
        setCurrentIndex(resetIndex);
        setTimeout(() => { isScrollingRef.current = false; }, 50);
      } else if (left <= leftBound) {
        isScrollingRef.current = true;
        const resetIndex = originalLength; // same as right: jump to middle block (image 1)
        el.scrollLeft = resetIndex * step;
        thumbScrollRef.current && (thumbScrollRef.current.scrollLeft = resetIndex * thumbStep);
        setCurrentIndex(resetIndex);
        setTimeout(() => { isScrollingRef.current = false; }, 50);
      }
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [originalLength, step]);

  // Initialize at middle section
  useEffect(() => {
    if (mainScrollRef.current && thumbScrollRef.current) {
      const initialIndex = originalLength;
      setCurrentIndex(initialIndex);
      scrollMainAndThumb(initialIndex, false);
    }
  }, []);

  const displayIndex = (currentIndex % originalLength + originalLength) % originalLength;
  const currentPage = displayIndex + 1;
  const totalPages = originalLength;

  return (
    <div className="bg-white content-stretch flex flex-col gap-[16px] items-center px-[60px] py-[60px] relative size-full min-h-screen">
      {/* Header */}
      <h1 className="capitalize font-['Tangerine:Regular',sans-serif] leading-[0.85] not-italic relative shrink-0 text-[80px] text-black">
        Gallery
      </h1>
      <p className="font-['Roboto:Light_Italic',sans-serif] font-light italic leading-[1.2] relative shrink-0 text-[#282828] text-[24px]">
        24/7 Dedicated staff available around the clock for safety and assistance
      </p>

      {/* Main Gallery */}
      <div className="w-full overflow-hidden relative">
        <div
          ref={mainScrollRef}
          className="content-stretch flex gap-[40px] h-[488px] items-start relative shrink-0 overflow-x-hidden"
          style={{
            paddingLeft: `calc(50% - ${IMAGE_WIDTH / 2}px)`,
            paddingRight: `calc(50% - ${IMAGE_WIDTH / 2}px)`,
          }}
        >
          {infiniteImages.map((img, index) => (
            <div
              key={index}
              className="h-[488px] rounded-[60px] shrink-0 w-[836.571px] bg-[#c4c4c4]"
            >
              <img
                alt={`Gallery image ${index + 1}`}
                className="size-full object-cover pointer-events-none rounded-[60px]"
                src={img}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Thumbnail Strip — infinite scroll, selected always centered */}
      <div className="w-full overflow-hidden relative">
        <div
          ref={thumbScrollRef}
          className="content-stretch flex gap-[38px] items-center relative shrink-0 overflow-x-hidden"
          style={{
            paddingLeft: `calc(50% - ${THUMB_WIDTH / 2}px)`,
            paddingRight: `calc(50% - ${THUMB_WIDTH / 2}px)`,
          }}
        >
          {infiniteThumbnails.map((img, index) => (
            <div
              key={index}
              className={`h-[181px] rounded-[30px] shrink-0 w-[233.6px] transition-all cursor-pointer hover:opacity-80 ${
                index === currentIndex ? 'bg-[#8f8f8f] ring-2 ring-black/30' : 'bg-[#c4c4c4]'
              }`}
              onClick={() => handleThumbnailClick((index % originalLength + originalLength) % originalLength)}
            >
              <img
                alt={`Thumbnail ${(index % originalLength) + 1}`}
                className="size-full object-cover pointer-events-none rounded-[30px]"
                src={img}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="content-stretch flex font-['Inter:Regular',sans-serif] font-normal gap-[8px] items-start leading-[1.3] not-italic relative shrink-0 text-[18px] text-black">
        <button
          onClick={prevImage}
          className="relative shrink-0 hover:opacity-60 transition-opacity cursor-pointer"
          aria-label="Previous image"
        >
          &lt;
        </button>
        <p className="relative shrink-0">{currentPage} / {totalPages}</p>
        <button
          onClick={nextImage}
          className="relative shrink-0 hover:opacity-60 transition-opacity cursor-pointer"
          aria-label="Next image"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
