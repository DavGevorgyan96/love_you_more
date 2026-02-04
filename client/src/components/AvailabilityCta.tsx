const PHONE = 'tel:+1';

export function AvailabilityCta() {
  return (
    <section className="relative bg-[#EFEEEE]">
      <div className="mx-auto flex max-w-[1232px] flex-wrap items-center justify-between gap-6 px-4 py-8 sm:px-6 md:py-10 lg:px-8">
        <p
          className="font-normal text-[#000000]"
          style={{
            fontFamily: '"Tangerine", cursive',
            fontSize: 80,
            lineHeight: '85%',
            letterSpacing: 0,
          }}
        >
          Don&apos;t Miss Your Availability
        </p>
        <a
          href={PHONE}
          className="flex items-center justify-center gap-[10px] rounded-[16px] bg-[#0F2C2A] px-[38px] py-[19px] font-sans text-[16px] font-semibold leading-[140%] tracking-normal text-white transition hover:opacity-90"
          style={{ letterSpacing: 0 }}
          aria-label="Contact us"
        >
          Contact us
          <svg
            className="h-5 w-5 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
