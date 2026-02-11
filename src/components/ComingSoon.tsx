import comingSoonImage from '../assets/images/coming_soon.png';

export function ComingSoon() {
  return (
    <div className="h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#052720] p-4 overflow-hidden">
      <div className="flex flex-1 flex-col items-center justify-center min-h-0 w-full">
        <img
          src={comingSoonImage}
          alt="Love You More - Coming Soon"
          className="max-w-full max-h-[70dvh] w-auto h-auto object-contain flex-shrink"
        />
        <p className="mt-4 flex-shrink-0 font-['Roboto'] font-normal text-[15.19px] leading-[19.4px] tracking-[6.33px] md:text-[27.27px] md:leading-[34.84px] md:tracking-[11.36px] uppercase bg-[radial-gradient(129.35%_458.06%_at_50%_80.17%,#F2CF8B_0%,#8C7850_100%)] bg-clip-text text-transparent">
          Coming Soon
        </p>
      </div>
    </div>
  );
}
