import headerBg from '../assets/images/header.png';

const TITLE_MOBILE_1 = 'A home where love';
const TITLE_MOBILE_2 = 'knows no end';
const TITLE_LINE_1 = 'A Home';
const TITLE_LINE_2 = 'Where Love Knows No End';
const SUBTITLE = 'Elevating Supportive Living for elderly 60+';

const titleStyle = {
  fontFamily: '"Tangerine", cursive',
  background: 'radial-gradient(129.35% 458.06% at 50% 80.17%, #F2CF8B 0%, #8C7850 100%)',
  WebkitBackgroundClip: 'text' as const,
  backgroundClip: 'text' as const,
  color: 'transparent',
};

export function Header() {
  return (
    <header className="relative w-full overflow-hidden min-[640px]:hero-viewport-height min-[640px]:h-[calc(100vh-120px)] h-auto bg-[#052720] px-4 min-[640px]:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[200px]">
      {/* Desktop: full-bleed background image */}
      <img
        src={headerBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top transition-[height] duration-300 ease-out hidden min-[640px]:block"
      />
      <div className="absolute inset-0 bg-black/40 hidden min-[640px]:block" />

      {/* Mobile (<640px): vertical layout — title, image block, description */}
      <div className="relative z-10 mt-[-1px] flex min-[640px]:hidden flex-col items-center gap-5 pt-6 text-left">
        <h1
          className="font-normal leading-[0.85] tracking-normal text-[56px] w-full text-left"
          style={titleStyle}
        >
          <span className="block">{TITLE_MOBILE_1}</span>
          <span className="block">{TITLE_MOBILE_2}</span>
        </h1>
        <div className="relative w-full max-w-full h-[281px] overflow-hidden rounded-[30px] shrink-0">
          <img
            src={headerBg}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#00000080] rounded-[30px]" aria-hidden />
        </div>
        <p className="font-sans font-bold text-[22px] leading-[1.2] tracking-normal text-[#FFFFFF] w-full">
          {SUBTITLE}
        </p>
      </div>

      {/* Desktop (≥640px): original content */}
      <div className="relative z-10 hidden min-[640px]:flex max-w-[1240px] w-full mx-auto h-full flex-col items-start justify-end gap-[28px] py-[72px] text-center">
        <h1
          className="font-normal capitalize leading-[0.85] tracking-normal drop-shadow-md max-xl:text-5xl lg:max-xl:text-7xl xl:text-[126.5px]"
          style={titleStyle}
        >
          <span className="block text-start">{TITLE_LINE_1}</span>
          <span className="block mr-[16px]">{TITLE_LINE_2}</span>
        </h1>
        <p className="pl-4 font-sans font-normal leading-[1.25] tracking-[0] text-[#FFFFFF] drop-shadow-md sm:text-xl md:text-2xl lg:text-3xl xl:text-[36px]">
          {SUBTITLE}
        </p>
      </div>
    </header>
  );
}
