import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { OrchidSmall } from './OrchidSmall';
import { EmblaCarouselThumb } from './EmblaCarouselThumb';
import '../css/embla.css';

const GALLERY_SUBTITLE =
  '24/7 Dedicated staff available around the clock for safety and assistance';

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

export function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    watchDrag: false,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!embla || !emblaThumbs) return;
      embla.scrollTo(index);
      emblaThumbs.scrollTo(index);
    },
    [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla || !emblaThumbs) return;
    setSelectedIndex(embla.selectedScrollSnap());
    emblaThumbs.scrollTo(embla.selectedScrollSnap());
  }, [embla, emblaThumbs]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <section id="gallery" className="relative overflow-visible bg-white px-3   lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">
      {/* Corner florals */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <OrchidSmall className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-right-bottom" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] pt-8 pb-10 sm:pt-12 md:pt-16 lg:pt-24 lg:pb-14 xl:pt-[120px] xl:pb-14">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Gallery
        </h2>
        <p className="mt-4 text-center font-sans text-[24px] font-light italic leading-[1.3] text-[#282828]">
          {GALLERY_SUBTITLE}
        </p>

        {/* Embla: main carousel + thumbnails */}
        <div className="gallery-embla mt-[16px]">
          <div className="embla" data-embla="main">
            <div className="embla__viewport" ref={mainViewportRef}>
              <div className="embla__container">
                {GALLERY_IMAGES.map(({ imgelink }, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="embla__slide__inner embla__slide__inner--main">
                      <img
                        className="embla__slide__img"
                        src={imgelink}
                        alt=""
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="embla embla--thumb" data-embla="thumbs">
            <div className="embla__viewport" ref={thumbViewportRef}>
              <div className="embla__container embla__container--thumb">
                {GALLERY_IMAGES.map(({ imgelink }, index) => (
                  <EmblaCarouselThumb
                    key={index}
                    onClick={() => onThumbClick(index)}
                    selected={index === selectedIndex}
                    imgSrc={imgelink}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center font-sans text-sm text-[#282828]">
          {selectedIndex + 1} / {GALLERY_IMAGES.length}
        </div>
      </div>
    </section>
  );
}
