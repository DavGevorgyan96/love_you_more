// import floralAccent from '../assets/images/floral_accent.png';
import { OrchidSmall } from './OrchidSmall';

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

export function EngagingDailyEvents() {
  return (
    <section id="activities" className="relative overflow-visible bg-white px-4 md:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">
      {/* Corner florals */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <OrchidSmall flipHorizontal className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-left-bottom" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <OrchidSmall className="h-[120px] w-[258px] xl:h-[148px] xl:w-[300px] object-contain object-right-bottom" />
      </div>

      <div className="relative z-10 mx-auto pt-8 pb-10 sm:pt-12 md:pt-16 lg:pt-24 lg:pb-14 xl:pt-[120px] xl:pb-14">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Engaging Daily Events
        </h2>

        <div className="mt-10 flex flex-wrap justify-center gap-[40px] lg:mt-12">
          {EVENTS_ITEMS.map((item, i) => (
            <article
              key={i}
              className="flex w-[578px] max-w-full flex-col"
            >
              <div className="h-[300px] md:h-[460px] w-full overflow-hidden rounded-[60px]">
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
      </div>
    </section>
  );
}
