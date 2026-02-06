import floralAccent from '../assets/images/floral_accent.png';

const NAV_LINKS = [
  { label: 'About us', href: '#about' },
  { label: 'Activities', href: '#activities' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact us', href: '#contact' },
  { label: 'FAQ', href: '#faq' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/pdfs/privacy-policy.pdf', download: 'privacy-policy.pdf' },
  { label: 'Terms', href: '/pdfs/terms.pdf', download: 'terms.pdf' },
  { label: 'Cookie Policy', href: '/pdfs/cookie-policy.pdf', download: 'cookie-policy.pdf' },
  { label: 'Accessibility Statement', href: '/pdfs/accessibility-statement.pdf', download: 'accessibility-statement.pdf' },
];

export function Footer() {
  return (
    <footer className="relative flex -mt-px overflow-hidden bg-[#052720] pt-10 sm:pt-12 md:pt-[103px]">
      {/* Decorative florals — bottom corners, curving up */}
      <div className="pointer-events-none bottom-0 left-0 z-0 hidden lg:block">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] object-contain object-left-bottom"
          aria-hidden
        />
      </div>
     
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Top row: navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-sans text-[18px] font-normal leading-[140%] tracking-normal text-[#F2CF8B] transition hover:opacity-90"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Bottom row: legal */}
        <div className="mt-[22px] flex flex-wrap items-center justify-center gap-y-2">
          {LEGAL_LINKS.map((item, i) => (
            <span key={item.href}>
              {i > 0 && <span className="mx-1.5 text-[#FFFFFF]">|</span>}
              <a
                href={item.href}
                download={item.download}
                className="font-sans text-[18px] font-normal leading-[130%] tracking-normal text-[#FFFFFF] transition hover:opacity-90"
              >
                {item.label}
              </a>
            </span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none bottom-0 right-0 z-0 hidden lg:block">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] scale-x-[-1] object-contain object-right-bottom"
          aria-hidden
        />
      </div>
    </footer>
  );
}
