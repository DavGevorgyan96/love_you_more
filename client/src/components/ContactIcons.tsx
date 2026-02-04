import callSvg from '../assets/images/call.svg';
import emailSvg from '../assets/images/email.svg';
import whatsappSvg from '../assets/images/whatsapp.svg';
import floralAccent from '../assets/images/floral_accent.png';

const ICONS = [
  { href: 'tel:+1', src: callSvg, alt: 'Call' },
  { href: 'mailto:info@loveyoumore.com', src: emailSvg, alt: 'Email' },
  { href: 'https://wa.me/', src: whatsappSvg, alt: 'WhatsApp' },
] as const;

export function ContactIcons() {
  return (
    <section className="relative overflow-visible bg-[#1A4D4A] py-6 sm:py-8">
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
            className="flex items-center justify-center rounded-[30px] border border-[#F2CF8B] bg-transparent p-[25px] transition hover:bg-[#F2CF8B]/10"
            aria-label={alt}
          >
            <img src={src} alt="" className="h-8 w-8 object-contain sm:h-10 sm:w-10" />
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
