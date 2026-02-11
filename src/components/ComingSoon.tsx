import comingSoonImage from '../assets/images/coming_soon.png';

export function ComingSoon() {
  return (
    <div className="h-screen min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#052720] p-4 overflow-hidden">
      <main className="flex flex-1 flex-col items-center justify-center min-h-0 w-full">
        <h1 className="sr-only">Love You More - Coming Soon</h1>
        <img
          src={comingSoonImage}
          alt="Love You More - Coming Soon"
          className="max-w-full max-h-[50dvh] w-auto h-auto object-contain flex-shrink"
        />
        <p className="mt-4 ml-[11px] md:ml-[12px] flex-shrink-0 font-['Roboto'] font-normal text-[16px] leading-[19.4px] tracking-[11.33px] md:text-[25.27px] md:leading-[34.84px] md:tracking-[12.36px] uppercase text-white">
          Coming Soon
        </p>
      </main>
    </div>
  );
}
