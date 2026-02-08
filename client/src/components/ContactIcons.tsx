import callSvg from '../assets/images/contact.svg';
import emailSvg from '../assets/images/email.svg';
import whatsappSvg from '../assets/images/whatsapp.svg';
import floralAccent from '../assets/images/floral_accent.png';

const ICONS = [
  { href: 'tel:+14249778000', src: callSvg, alt: 'Call' },
  { href: 'mailto:info@loveyoumoreresidentialvilla.org', src: emailSvg, alt: 'Email' },
  { href: 'https://wa.me/14249778000', src: whatsappSvg, alt: 'WhatsApp' },
] as const;

export function ContactIcons() {
  return (
    <section className="relative overflow-visible bg-[#052720] py-6 sm:py-8">
      {/* Decorative left — extends into header */}
      <div className="pointer-events-none absolute left-0 bottom-0 z-0 hidden lg:block">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] object-contain object-left-top"
          aria-hidden
        />
      </div>

      {/* Icons row */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-6 px-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 min-[1200px]:gap-[80px] min-[1400px]:gap-[100px] min-[1600px]:gap-[120px]">
        {ICONS.map(({ href, src, alt }) => (
          <a
            key={alt}
            href={href}
            target={alt === 'WhatsApp' ? '_blank' : undefined}
            rel={alt === 'WhatsApp' ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-center w-[60px] h-[60px] md:w-[90px] md:h-[90px]"
            aria-label={alt}
          >
            <img src={src} alt="" className="h-full w-full object-contain" />
          </a>
        ))}
      </div>

      {/* Decorative right — mirrored, extends into header */}
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 hidden lg:block">
        <img
          src={floralAccent}
          alt=""
          className="h-[298px] w-[287px] scale-x-[-1] object-contain object-right-top"
          aria-hidden
        />
      </div>
    </section>
  );
}
