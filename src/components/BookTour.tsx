import contactSvg from '../assets/images/contact.svg';
import emailSvg from '../assets/images/email.svg';
import whatsappSvg from '../assets/images/whatsapp.svg';
import faxSvg from '../assets/images/fax.svg';

const ADDRESS = '9371 Dorrington Pl, Los Angeles, CA 91331';
const EMAIL = 'info@loveyoumoreresidentialvilla.org';
const PHONE = 'tel:+14249778000';
const WHATSAPP_URL = 'https://wa.me/14249778000';

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
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.3429694903!2d-118.44742101907204!3d34.23979113842923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c290df1dbb5b83%3A0x2fd8e5989cf85a5!2s9371%20Dorrington%20Pl%2C%20Arleta%2C%20CA%2091331%2C%20USA!5e0!3m2!1sen!2sam!4v1770787047030!5m2!1sen!2sam';

export function BookTour() {
  return (
    <section id="tour" className="min-h-[400px] md:min-h-[500px] lg:min-h-[532px]">
      <div className="flex flex-col min-h-[400px] md:min-h-[500px] md:grid md:grid-cols-[1fr_1fr] md:min-h-[500px] lg:min-h-[532px]">
        {/* Left: dark green panel — on <768px use contents so children reorder with map */}
        <div className="contents md:flex md:flex-col md:items-center md:justify-end md:gap-[31px] md:bg-[#052720] md:px-8 md:py-12 lg:px-14 lg:py-16">
          {/* 1. Experience The Difference — <768px: first */}
          <div className="order-1 flex flex-col gap-[31px] md:gap-0 items-center bg-[#052720] px-3 py-10 text-center md:bg-transparent md:px-0 md:py-0 lg:text-left">
            <h2
              className="font-normal text-[#F2CF8B] text-[56px] md:text-6xl lg:text-7xl xl:text-[80px]"
              style={{ fontFamily: '"Tangerine", cursive', lineHeight: 1 }}
            >
              Experience The Difference
            </h2>

            {/* 2. Contact icons */}
            <div className="order-2 w-full md:mt-8 flex items-center justify-between md:justify-center flex-wrap gap-4 md:gap-6">
              {TOUR_ICONS.map(({ href, src, alt }) => (
                <a
                  key={alt}
                  href={href}
                  target={alt === 'WhatsApp' ? '_blank' : undefined}
                  rel={alt === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                  className="flex h-14 w-14 items-center justify-center md:h-16 md:w-16"
                  aria-label={alt}
                >
                  <img src={src} alt="" className="h-full w-full object-contain" />
                </a>
              ))}
            </div>

            {/* 3. CTA text */}
            <p className="order-3 md:mt-6 max-w-[499px] font-sans text-start text-[16px] md:text-[18px] font-normal leading-[130%] tracking-normal capitalize text-[#F2CF8B] text-center md:text-left">
              {CTA_TEXT}
            </p>
          </div>

          {/* 5. Address — <768px: after map */}
          <div className="order-5 w-full text-center md:text-left pt-[31px] flex flex-col gap-4 md:gap-[70px] md:mt-0 md:flex-row md:flex-wrap md:items-start md:justify-between lg:mt-0 bg-[#052720] px-3 pb-3 md:pb-10 md:bg-transparent md:px-0 md:pb-0">
            <div>
              <p className="font-sans text-[18px] font-semibold leading-[130%] tracking-normal text-[#F2CF8B]">
                Address
              </p>
              <p className="mt-1 font-sans text-[18px] font-normal leading-[130%] tracking-normal text-[#FFFFFF]">
                {ADDRESS}
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-1 block font-sans text-[18px] text-white hover:underline"
              >
                {EMAIL}
              </a>
            </div>
            {/* 6. Follow us */}
            <div>
              <p className="font-sans text-[18px] font-semibold tracking-wide text-[#F2CF8B]">
                Follow us
              </p>
              <ul className="mt-1 flex md:flex-col justify-center gap-1.5">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="font-sans no-underline text-[18px] font-regular text-white underline hover:no-underline md:text-base"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 4. Map — <768px: after CTA; md+: right column */}
        <div className="order-4 relative min-h-[280px] w-full md:min-h-[320px] md:order-2 lg:min-h-full">
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
