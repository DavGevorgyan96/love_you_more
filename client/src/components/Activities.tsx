import orchidSmall from '../assets/images/orchid_small.png';
import smallOrchidIcon from '../assets/images/SmallOrchidIcon.svg';

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
];

export function Activities() {
  return (
    <section id="activities" className="relative overflow-visible bg-white">
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

      <div className="relative z-10 mx-auto max-w-[1234px] px-4 pt-8 sm:pt-12 md:pt-16 lg:pt-24 xl:pt-[120px]">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Personalized Care Tiers
        </h2>

        {/* Three cards: 372×507px, radius 30px, #EFEFEF, padding 24px 32px */}
        <div className="rounded-[30px] border border-[#00000026] p-5 mt-12 ">
          <div className="flex justify-center gap-y-0 gap-x-[22px] ">
            {TIERS.map((tier, i) => (
              <div
                key={tier.tier}
                className={`flex  max-w-[372px] w-full flex-col rounded-[30px] bg-[#EFEFEF] px-8 py-6 ${i === 1 ? 'shadow-[0_13px_13.1px_0_rgba(0,0,0,0.17)]' : ''}`}
                style={{ height: 507 }}
              >
                <p
                  className="text-center font-sans font-bold text-[#282828]"
                  style={{ fontSize: 25, lineHeight: '120%', letterSpacing: 0 }}
                >
                  {tier.tier}
                </p>
                <div className="my-5 flex justify-center gap-1">
                  {Array.from({ length: i + 1 }).map((_, j) => (
                    <img
                      key={j}
                      src={smallOrchidIcon}
                      alt=""
                      className="h-[65px] w-[81px] object-contain"
                      aria-hidden
                    />
                  ))}
                </div>
                <p
                  className="text-center font-normal capitalize text-[#000000]"
                  style={{
                    fontFamily: '"Tangerine", cursive',
                    fontSize: 48,
                    lineHeight: '85%',
                    letterSpacing: 0,
                  }}
                >
                  {tier.title}
                </p>
                <p className="mt-3 text-center font-sans text-[15px] font-normal leading-[1.5] text-[#282828]">
                  {tier.description}
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-left font-sans text-[15px] font-normal leading-[1.5] text-[#282828]">
                  {tier.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            className="mt-14 text-center font-normal capitalize text-black"
            style={{
              fontFamily: '"Tangerine", cursive',
              fontSize: 80,
              lineHeight: '85%',
              letterSpacing: 0,
            }}
          >
            Discover The Love You More Standard
          </p>
          <p
            className="mt-[40px] text-center font-sans italic text-[#4C4C4C]"
            style={{ fontSize: 25, lineHeight: '120%', letterSpacing: 0 }}
          >
            <span className="font-extrabold">Note: </span>
            <span className="font-normal">Care is personalized and adjusted based on assessment.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
