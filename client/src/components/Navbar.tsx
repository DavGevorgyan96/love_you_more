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
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 17 17" aria-hidden>
              <path d="M15.6343 6.55923C13.7141 10.7398 10.3029 14.0533 6.06829 15.8512L5.38829 16.1542C4.63526 16.4895 3.78804 16.5483 2.99592 16.3202C2.20381 16.0921 1.51762 15.5917 1.05829 14.9072L0.169287 13.5832C0.0301723 13.3756 -0.0261459 13.1234 0.0114269 12.8763C0.0489998 12.6292 0.177742 12.4051 0.372288 12.2482L3.38429 9.81823C3.48918 9.73366 3.61009 9.67116 3.73974 9.63448C3.8694 9.59781 4.00513 9.58771 4.13878 9.6048C4.27243 9.6219 4.40125 9.66582 4.51751 9.73394C4.63376 9.80207 4.73505 9.89298 4.81529 10.0012L5.74729 11.2582C8.13968 10.0767 10.0762 8.13983 11.2573 5.74723L10.0013 4.81523C9.89304 4.73499 9.80213 4.6337 9.734 4.51745C9.66588 4.4012 9.62196 4.27237 9.60486 4.13872C9.58777 4.00507 9.59787 3.86934 9.63454 3.73968C9.67122 3.61003 9.73372 3.48912 9.81829 3.38423L12.2483 0.372227C12.4052 0.17768 12.6293 0.0489404 12.8763 0.0113674C13.1234 -0.0262056 13.3756 0.0301121 13.5833 0.169227L14.9163 1.06323C15.6049 1.52501 16.1072 2.21624 16.3337 3.01379C16.5603 3.81134 16.4963 4.66342 16.1533 5.41823L15.6343 6.55923Z" />
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
                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 17 17" aria-hidden>
                  <path d="M15.6343 6.55923C13.7141 10.7398 10.3029 14.0533 6.06829 15.8512L5.38829 16.1542C4.63526 16.4895 3.78804 16.5483 2.99592 16.3202C2.20381 16.0921 1.51762 15.5917 1.05829 14.9072L0.169287 13.5832C0.0301723 13.3756 -0.0261459 13.1234 0.0114269 12.8763C0.0489998 12.6292 0.177742 12.4051 0.372288 12.2482L3.38429 9.81823C3.48918 9.73366 3.61009 9.67116 3.73974 9.63448C3.8694 9.59781 4.00513 9.58771 4.13878 9.6048C4.27243 9.6219 4.40125 9.66582 4.51751 9.73394C4.63376 9.80207 4.73505 9.89298 4.81529 10.0012L5.74729 11.2582C8.13968 10.0767 10.0762 8.13983 11.2573 5.74723L10.0013 4.81523C9.89304 4.73499 9.80213 4.6337 9.734 4.51745C9.66588 4.4012 9.62196 4.27237 9.60486 4.13872C9.58777 4.00507 9.59787 3.86934 9.63454 3.73968C9.67122 3.61003 9.73372 3.48912 9.81829 3.38423L12.2483 0.372227C12.4052 0.17768 12.6293 0.0489404 12.8763 0.0113674C13.1234 -0.0262056 13.3756 0.0301121 13.5833 0.169227L14.9163 1.06323C15.6049 1.52501 16.1072 2.21624 16.3337 3.01379C16.5603 3.81134 16.4963 4.66342 16.1533 5.41823L15.6343 6.55923Z" />
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
