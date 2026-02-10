import headerBg from '../assets/images/header.png';

const TITLE_LINE_1 = 'A Home';
const TITLE_LINE_2 = 'Where Love Knows No End';
const SUBTITLE = 'Elevating Supportive Living for elderly 60+';

export function Header() {
  return (
    <header className="hero-viewport-height relative w-full overflow-hidden h-[calc(100vh-120px)] px-4 md:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">
      {/* Background image with overlay  md:h-[560px]*/}
      <img
        src={headerBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top transition-[height] duration-300 ease-out"
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex max-w-[1240px] w-full mx-auto h-full flex-col items-start justify-end gap-[28px] py-[72px] text-center">
        <h2
          className="font-normal capitalize leading-[0.85] tracking-normal drop-shadow-md max-xl:text-5xl lg:max-xl:text-7xl xl:text-[126.5px]"
          style={{
            fontFamily: '"Tangerine", cursive',
            background: 'radial-gradient(129.35% 458.06% at 50% 80.17%, #F2CF8B 0%, #8C7850 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          <span className="block text-start">{TITLE_LINE_1}</span>
          <span className="block mr-[16px]">{TITLE_LINE_2}</span>
        </h2>
        <p className="pl-4 font-sans font-normal leading-[1.25] tracking-[0] text-[#FFFFFF] drop-shadow-md max-sm:text-2xl sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px]">
          {SUBTITLE}
        </p>
      </div>

    </header>
  );
}
