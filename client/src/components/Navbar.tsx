import logoImg from '../assets/images/logo.svg';

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
  return (
    <header className="bg-[#041F1A] text-gold">
      <div className="mx-[79px] py-4">
        {/* One row: logo, nav links, CTA+address — links and buttons aligned by top */}
        <div className="flex flex-wrap items-center justify-between gap-4 lg:flex-nowrap">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Love You More"
              className="h-[128px] w-[370.91px] shrink-0 object-contain"
            />
          </div>

          {/* Nav links — same height as button block, vertically centered */}
          <nav className="order-3 w-full basis-full lg:order-2 lg:basis-auto lg:flex lg:h-[60px] lg:items-center lg:justify-center">
            <ul className="flex flex-wrap items-center justify-center gap-6 min-[1400px]:gap-[50px] min-[1600px]:gap-[65.25px]">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-inter text-[18px] font-normal leading-[1.4] tracking-normal text-[#F2CF8B] transition hover:text-gold-light"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA + Address — buttons same line as links, address under */}
          <div className="order-2 lg:order-3 flex flex-col self-end gap-2 shrink-0">
            <div className="flex h-[60px] w-[360px] items-center overflow-hidden rounded-[15px] border border-[#F2CF8B]">
              <a
                href="#tour"
                className="inline-flex h-full w-full items-center justify-center bg-transparent px-4 font-inter text-[17px] font-semibold leading-[1.4] tracking-normal text-[#F2CF8B] transition hover:bg-gold/10"
              >
                Book a Tour
              </a>
              <a
                href={PHONE}
                className="inline-flex h-full w-full items-center justify-center gap-[11px] bg-[#F2CF8B] px-4 font-inter text-[17px] font-semibold leading-[1.4] tracking-normal text-black transition hover:bg-gold-light"
                aria-label="Позвонить"
              >
                Contact us
                <svg
                  className="h-4 w-4 -scale-x-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </a>
            </div>
            <p className="text-right font-roboto text-[18px] font-normal leading-[1.4] tracking-normal text-[#F2CF8B]">
              {ADDRESS}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
