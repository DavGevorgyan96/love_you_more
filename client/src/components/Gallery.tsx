import { useState } from 'react';
import orchidSmall from '../assets/images/orchid_small.png';

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
  const [active, setActive] = useState(GALLERY_IMAGES[0].imgelink);

  return (
    <section id="gallery" className="relative overflow-visible bg-white">
      {/* Corner florals */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <img
          src={orchidSmall}
          alt=""
          className="h-[148px] w-[300px] object-contain object-left-bottom"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <img
          src={orchidSmall}
          alt=""
          className="h-[148px] w-[300px] scale-x-[-1] object-contain object-right-bottom"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1232px] px-4 pt-8 pb-10 sm:pt-12 md:pt-16 lg:pt-24 lg:pb-14 xl:pt-[120px] xl:pb-14">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Gallery
        </h2>
        <p className="mt-4 text-center font-sans text-[18px] font-normal leading-[1.3] text-[#282828]">
          {GALLERY_SUBTITLE}
        </p>

        {/* Featured image gallery: one main image + thumbnails */}
        <div className="mt-10 grid gap-4 lg:mt-12">
          <div className="overflow-hidden rounded-2xl bg-gray-100">
            <img
              className="h-auto w-full max-w-full rounded-2xl object-cover object-center md:h-[480px]"
              src={active}
              alt=""
            />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {GALLERY_IMAGES.map(({ imgelink }, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActive(imgelink)}
                className={`overflow-hidden rounded-2xl border-2 transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  active === imgelink
                    ? 'border-[#0F2C2A] ring-[#0F2C2A]'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={imgelink}
                  className="h-20 w-full object-cover object-center md:h-24"
                  alt=""
                />
              </button>
            ))}
          </div>
        </div>

        {/* Pagination indicator */}
        <div className="mt-6 flex justify-center font-sans text-sm text-[#282828]">
          1 / 4
        </div>
      </div>
    </section>
  );
}
