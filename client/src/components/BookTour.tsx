import contactSvg from '../assets/images/contact.svg';
import emailSvg from '../assets/images/email.svg';
import whatsappSvg from '../assets/images/whatsapp.svg';
import faxSvg from '../assets/images/fax.svg';

const ADDRESS = '9371 Dorrington Pl, Los Angeles, CA 91331';
const EMAIL = 'hello@email.pro';
const PHONE = 'tel:+1';
const WHATSAPP_URL = 'https://wa.me/';

const TOUR_ICONS = [
  { href: PHONE, src: contactSvg, alt: 'Call' },
  { href: WHATSAPP_URL, src: whatsappSvg, alt: 'WhatsApp' },
  { href: `mailto:${EMAIL}`, src: emailSvg, alt: 'Email' },
  { href: PHONE, src: faxSvg, alt: 'Fax' },
];

const CTA_TEXT =
  'Schedule Your Confidential Tour Today And Entrust Your Loved One To A Life Of Unparalleled Distinction.';

const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Linkedin', href: '#' },
];

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d373.1043654075474!2d-118.4424497096089!3d34.23961276360128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c290df1dbb5b83%3Ax2fd8e5989cf85a5!2zOTM3MSBEb3JyaW5ndG9uIFBsLCBBcmxldGEsIENBIDkxMzMxLCDQodCo0JA!5e0!3m2!1sen!2sam!4v1770302746703!5m2!1sru!2sam';

export function BookTour() {
  return (
    <section id="tour" className="min-h-[400px] md:min-h-[500px] lg:min-h-[532px]">
      <div className="grid min-h-[400px] md:min-h-[500px] lg:grid-cols-[1fr_1fr] lg:min-h-[532px]">
        {/* Left: dark green panel */}
        <div className="flex flex-col items-center justify-end gap-[31px] bg-[#052720] px-6 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:px-14 lg:py-16">
          <div>
            <h2
              className="font-normal text-[#F2CF8B] max-sm:text-4xl sm:text-5xl md:text-6xl lg:text-[72px]"
              style={{ fontFamily: '"Tangerine", cursive', lineHeight: 1 }}
            >
              Experience The Difference
            </h2>

            {/* Contact icons — circular, golden */}
            <div className="mt-8 flex items-center justify-center flex-wrap gap-4 sm:gap-6">
              {TOUR_ICONS.map(({ href, src, alt }) => (
                <a
                  key={alt}
                  href={href}
                  target={alt === 'WhatsApp' ? '_blank' : undefined}
                  rel={alt === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="flex h-14 w-14 items-center justify-center sm:h-16 sm:w-16"
                  aria-label={alt}
                >
                  <img src={src} alt="" className="h-full w-full object-contain" />
                </a>
              ))}
            </div>

            <p className="mt-6 max-w-[499px] font-sans text-[21px] font-normal leading-[130%] tracking-normal capitalize text-[#F2CF8B]">
              {CTA_TEXT}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-[70px] sm:flex-row sm:flex-wrap sm:items-start sm:justify-between lg:mt-0">
            <div>
              <p className="font-sans text-[18px] font-semibold leading-[130%] tracking-normal text-[#F2CF8B]">
                Address
              </p>
              <p className="mt-1 font-sans text-[18px] font-normal leading-[130%] tracking-normal text-[#FFFFFF]">
                {ADDRESS}
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-1 block font-sans text-sm text-white underline hover:no-underline sm:text-base"
              >
                {EMAIL}
              </a>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold tracking-wide text-[#F2CF8B] sm:text-base">
                Follow us
              </p>
              <ul className="mt-1 flex flex-col gap-0.5">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-sans no-underline text-sm text-white underline hover:no-underline sm:text-base"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: map */}
        <div className="relative min-h-[280px] w-full sm:min-h-[320px] lg:min-h-full">
          <iframe
            title="Love You More location"
            src={MAP_EMBED_URL}
            width="100%"
            height="100%"
            className="absolute inset-0 border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
