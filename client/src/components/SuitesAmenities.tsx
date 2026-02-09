// import floralAccent from '../assets/images/floral_accent.png';
import { OrchidSmall } from './OrchidSmall';

const SUITE_FEATURES = [
  'Comfortable, private living space',
  'Accessible layouts for mobility devices',
  'Clean, luxury interior finishes',
  'Safety-focused design and staff support access',
  'Housekeeping and laundry included',
];

export function SuitesAmenities() {
  return (
    <section id="suites-amenities" className="relative overflow-visible bg-white">

      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[148px] w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <OrchidSmall className="h-[148px] w-[300px] object-contain object-right-bottom" />
      </div>
      {/* <div className="pointer-events-none absolute bottom-0 left-0 z-0 hidden lg:block">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] object-contain object-left-bottom"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 hidden lg:block">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] scale-x-[-1] object-contain object-right-bottom"
          aria-hidden
        />
      </div> */}

      <div className="relative z-10 mx-auto max-w-[1232px] px-4 pt-8 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-[120px]">
        <h2
          className="font-normal capitalize leading-[0.85] tracking-normal text-black max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Suites & Amenities
        </h2>

        <div className="mt-6 h-[400px] md:my-[53px] flex flex-col gap-6 md:gap-[40px] md:flex-row md:items-start">
          <div className="h-[220px] w-full max-w-full shrink-0 overflow-hidden rounded-[20px] md:h-full md:w-[350px] md:rounded-[30px]">
            <img
              src="https://picsum.photos/seed/suites-bedroom/800/560"
              alt="Comfortable bedroom with twin beds and luxury finishes"
              className="h-full w-full rounded-[20px] object-cover md:rounded-[30px]"
            />
          </div>

          <div className="h-full flex flex-col justify-between pb-[40px] gap-5 md:gap-8 font-sans md:flex-1">
            <div className="pt-4 md:pt-10">
              <h3
                className="font-sans font-bold capitalize text-black text-[22px]"
                style={{ lineHeight: '120%', letterSpacing: 0 }}
              >
                Suite Features May Include:
              </h3>
              <ul className="mt-3 md:mt-4 list-disc pl-5 md:pl-[70px] marker:text-black">
                {SUITE_FEATURES.map((item, i) => (
                  <li
                    key={i}
                    className="font-sans font-normal text-left text-[#282828] text-[18px]"
                    style={{
                      fontFamily: 'Roboto, sans-serif',
                      fontWeight: 400,
                      lineHeight: '130%',
                      letterSpacing: 0,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className="font-sans font-bold text-[#282828] text-[22px]"
                style={{ lineHeight: '130%', letterSpacing: 0 }}
              >
                Room types:
              </h3>
              <p
                className="font-sans font-light text-[#282828] text-[22px]"
                style={{ lineHeight: '130%', letterSpacing: 0 }}
              >
                Shared or Private
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
