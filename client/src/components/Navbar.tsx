import { useState, useEffect } from 'react';
import logoImg from '../assets/images/logo.svg';

const DESKTOP_BREAKPOINT = 768; // md in Tailwind — when desktop nav is shown

const NAV_LINKS = [
  { label: 'About us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Activities', href: '#activities' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'FAQ', href: '#faq' },
];

const ADDRESS = '9371 Dorrington Pl, Los Angeles, CA 91331';
const PHONE = 'tel:+1';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  // Close mobile menu when switching to desktop viewport
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    onResize(); // run once in case we're already desktop
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center bg-[#041F1A] text-gold h-[120px] lg:h-[160px]">
      <div className="2xl:mx-[79px] mx-4 w-full h-full">
        {/* Mobile: hamburger | logo | book icon | contact icon */}
        <div className="md:hidden flex h-full items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#F2CF8B] transition hover:bg-gold/10"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <a href="#" className="flex flex-1 justify-center min-w-0">
            <img
              src={logoImg}
              alt="Love You More"
              className="h-[80px] w-auto max-w-[200px] shrink-0 object-contain"
            />
          </a>
          <a
            href="#contact"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#F2CF8B] text-[#F2CF8B] transition hover:bg-gold/10"
            aria-label="Book a Tour"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </a>
          <a
            href={PHONE}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F2CF8B] text-black transition hover:bg-gold-light"
            aria-label="Contact us"
          >
            <svg className="h-5 w-5 -scale-x-100" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
          </a>
        </div>

        {/* Desktop: logo, nav links, CTA+address */}
        <div className="hidden h-full flex-wrap items-center justify-between gap-4 md:flex md:flex-nowrap">
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Love You More"
              className="h-[100px]  shrink-0 object-contain xl:h-[128px] xl:w-[370.91px] lg:w-[290px] md:w-[200px]"
            />
          </div>
          <nav className="order-3 w-full basis-full md:order-2 md:basis-auto md:flex md:h-[60px] md:items-center md:justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-5 min-[1400px]:gap-[50px] min-[1600px]:gap-[65.25px]">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-inter text-[15px] xl:text-[18px] font-normal leading-[1.4] tracking-normal text-[#F2CF8B] transition hover:text-gold-light"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="relative order-2 lg:order-3 flex flex-col gap-2 shrink-0">
            <div className="flex h-[52px] w-[320px] items-center overflow-hidden rounded-[12px] border border-[#F2CF8B] xl:h-[60px] xl:w-[360px] lg:h-[52px] lg:w-[320px] md:h-[45px] md:w-[230px] xl:rounded-[15px]">
              <a
                href="#contact"
                className="inline-flex h-full w-full items-center justify-center bg-transparent font-inter text-[15px] font-semibold leading-[0] tracking-normal text-[#F2CF8B] transition hover:bg-gold/10 xl:px-4 xl:text-[18px]"
              >
                Book a Tour
              </a>
              <a
                href={PHONE}
                className="inline-flex h-full w-full items-center justify-center gap-2 bg-[#F2CF8B] font-inter text-[15px] font-semibold leading-[0] tracking-normal text-black transition hover:bg-gold-light xl:gap-[11px] xl:px-4 xl:text-[17px]"
                aria-label="Позвонить"
              >
                Contact us
                <svg className="h-4 w-4 -scale-x-100" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
            </div>
            <p className="absolute bottom-[-22px] right-0 text-right font-roboto font-normal leading-[1.4] tracking-normal text-[#F2CF8B] xl:text-[18px] lg:text-[15px] md:text-[11px] lg:bottom-[-32px]">
              {ADDRESS}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay + drawer from left */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-200 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeMenu}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[280px] max-w-[85vw] bg-[#041F1A] shadow-xl transition-transform duration-200 ease-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex flex-col p-4 pt-6">
            <button
              type="button"
              onClick={closeMenu}
              className="mb-4 self-end flex h-10 w-10 items-center justify-center rounded-lg text-[#F2CF8B] transition hover:bg-gold/10"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav>
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <a
                      href={href}
                      onClick={closeMenu}
                      className="block rounded-lg px-4 py-3 font-inter text-[18px] font-normal text-[#F2CF8B] transition hover:bg-gold/10 hover:text-gold-light"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
