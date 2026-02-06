import { useState, useRef, useEffect } from 'react';
import orchidSmall from '../assets/images/orchid_small.png';
import { api } from '../api/client';

type SelectOption = { value: string; label: string };

function CustomSelect({
  id,
  options,
  value,
  onChange,
  triggerClassName,
}: {
  id: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  triggerClassName: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  const displayLabel = options.find((o) => o.value === value)?.label ?? options[0]?.label ?? '';
  const isPlaceholder = !value;

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={displayLabel}
        onClick={() => setOpen((p) => !p)}
        className={`flex h-[44px] sm:h-[40px] w-full items-center justify-between rounded-[13px] border border-[#D1D5DB] bg-white px-3 text-left font-sans text-sm focus:outline-none ${triggerClassName}`}
      >
        <span className={isPlaceholder ? 'text-[#D9D9D9]' : 'text-[#282828]'}>{displayLabel}</span>
        <svg
          className={`pointer-events-none h-4 w-4 shrink-0 text-[#909090] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-[240px] overflow-auto rounded-[13px] border border-[#D1D5DB] bg-white py-1 shadow-lg"
          aria-activedescendant={value ? undefined : undefined}
        >
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li
                key={opt.value || 'placeholder'}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex cursor-pointer items-center gap-2 px-3 py-2.5 font-sans text-sm text-[#282828] transition-colors first:rounded-t-[10px] last:rounded-b-[10px] hover:bg-[#E8F0FE] ${
                  selected ? 'bg-[#6B9BD1] font-semibold text-white hover:bg-[#5a8ac4]' : ''
                }`}
              >
                {selected && (
                  <span className="text-sm" aria-hidden>
                    ✓
                  </span>
                )}
                <span className={selected ? 'text-white' : ''}>{opt.label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || '';

const HOW_CAN_WE_HELP_OPTIONS = [
  { value: '', label: 'Tell us how we can help' },
  { value: 'Booking a Tour', label: 'Booking a Tour' },
  { value: 'Pricing & Availability', label: 'Pricing & Availability' },
  { value: 'Careers', label: 'Careers' },
  { value: 'Volunteering', label: 'Volunteering' },
  { value: 'Other', label: 'Other' },
];

const HOW_DID_YOU_HEAR_OPTIONS = [
  { value: '', label: 'e.g. referral, search, etc.' },
  { value: 'Search Engine', label: 'Search Engine' },
  { value: 'Word of Mouth', label: 'Word of Mouth' },
  { value: 'Referral', label: 'Referral' },
  { value: 'Social Media', label: 'Social Media' },
];

export function Contact() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [howCanWeHelp, setHowCanWeHelp] = useState('');
  const [howDidYouHear, setHowDidYouHear] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (status !== 'success' && status !== 'error') return;
    const t = setTimeout(() => {
      setStatus('idle');
      setStatusMessage('');
    }, 4000);
    return () => clearTimeout(t);
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setStatus('error');
      setStatusMessage('Please agree to the processing of personal data.');
      return;
    }
    if (!CONTACT_EMAIL) {
      setStatus('error');
      setStatusMessage('Contact form is not configured (missing VITE_CONTACT_EMAIL).');
      return;
    }
    setStatus('loading');
    setStatusMessage('');
    const subject = `Contact form: ${firstName} ${lastName}`.trim() || 'Contact form submission';
    const text = [
      `Name: ${firstName} ${lastName}`,
      `Phone: ${phone}`,
      `Zip Code: ${zipCode}`,
      `Email: ${email}`,
      `How can we help: ${howCanWeHelp}`,
      `How did you hear about us: ${howDidYouHear}`,
      `Agreed to processing of personal data: ${agree ? 'Yes' : 'No'}`,
      '',
      'Message:',
      message,
    ].join('\n');
    try {
      await api.sendMail({ to: CONTACT_EMAIL, subject, text });
      setStatus('success');
      setStatusMessage('Thank you. Your message has been sent.');
      setFirstName('');
      setLastName('');
      setPhone('');
      setZipCode('');
      setEmail('');
      setHowCanWeHelp('');
      setHowDidYouHear('');
      setMessage('');
      setAgree(false);
    } catch (err) {
      setStatus('error');
      setStatusMessage(err instanceof Error ? err.message : 'Failed to send. Please try again.');
    }
  };

  const labelClass =
    'mb-1.5 block font-sans text-[15px] sm:text-[17px] font-semibold leading-[140%] tracking-normal text-[#000000]';
  const inputBaseClass =
    'w-full rounded-[13px] border border-[#D1D5DB] bg-white px-3 font-sans text-sm text-[#000000] placeholder:font-bold placeholder:text-xs placeholder:leading-[100%] placeholder:tracking-[1px] placeholder:uppercase placeholder:text-[#D9D9D9] focus:outline-none';
  const inputClass = `${inputBaseClass} h-[44px] sm:h-[40px]`;

  return (
    <section id="contact" className="relative overflow-visible bg-white">

      {/* Corner florals — gold/orchid banner style */}
      <div className="pointer-events-none absolute left-0 top-0 z-0 hidden lg:block">
        <img
          src={orchidSmall}
          alt=""
          className="h-[148px] w-[300px] object-contain object-left-bottom"
          aria-hidden
        />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 z-0 hidden lg:block">
        <img
          src={orchidSmall}
          alt=""
          className="h-[148px] w-[300px] scale-x-[-1] object-contain object-right-bottom"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1232px] px-4 sm:px-6 md:px-8 pt-6 sm:pt-10 md:pt-14 lg:pt-24 xl:pt-[120px] pb-12 sm:pb-16 lg:pb-24">
        <h2
          className="text-center font-normal capitalize leading-[0.85] tracking-normal text-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px]"
          style={{ fontFamily: '"Tangerine", cursive' }}
        >
          Transparency Through Direct Engagement
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col mt-6 sm:mt-8 lg:mt-14 lg:flex-row lg:gap-[60px] xl:gap-[107px]">
          {/* Left column */}
          <div className="w-full flex-1 space-y-3 sm:space-y-4">
            <div>
              <label className={labelClass}>
                Name / Last Name <span className="text-[#000000]">*</span>
              </label>
              <div className="flex flex-col gap-3 sm:gap-3">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="FIRST NAME"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="LAST NAME"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="w-full">
                <label className={labelClass}>
                  Phone <span className="text-[#000000]">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="10-DIGIT PHONE NUMBER"
                />
              </div>
              <div className="w-full">
                <label className={labelClass}>
                  Zip Code
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className={inputClass}
                  placeholder="ZIP CODE"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>
                Email <span className="text-[#000000]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={inputClass}
                placeholder="EMAIL"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="how-can-we-help">
                How can we help you?
              </label>
              <CustomSelect
                id="how-can-we-help"
                options={HOW_CAN_WE_HELP_OPTIONS}
                value={howCanWeHelp}
                onChange={setHowCanWeHelp}
                triggerClassName="text-[#909090]"
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="how-did-you-hear">
                How did you hear about us?
              </label>
              <CustomSelect
                id="how-did-you-hear"
                options={HOW_DID_YOU_HEAR_OPTIONS}
                value={howDidYouHear}
                onChange={setHowDidYouHear}
                triggerClassName="text-[#909090]"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="w-full flex-1 flex flex-col justify-between mt-6 lg:mt-0">
            <div>
              <label className={labelClass}>
                Your Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className={`${inputBaseClass} min-h-[160px] sm:min-h-[200px] lg:min-h-[277px] resize-y py-2.5`}
                placeholder="YOUR MESSAGE"
              />
            </div>
            <div className="mt-6 flex flex-col gap-6 sm:gap-8 lg:gap-12">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-4 w-4 shrink-0 rounded-none border-2 border-[#4D4D4D] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)] accent-[#4D4D4D] focus:ring-2 focus:ring-[#6B9BD1] focus:ring-offset-0"
                />
                <span className="font-inter text-[14px] font-normal leading-[140%] tracking-normal text-[#909090] align-middle">
                  I agree to the processing of{' '}
                  <a
                    href="/pdfs/privacy-policy.pdf"
                    download="privacy-policy.pdf"
                    className="font-inter text-[14px] font-normal leading-[140%] tracking-normal text-[#000000] underline align-middle hover:opacity-80"
                  >
                    Personal data
                  </a>
                </span>
              </label>
              {statusMessage && (
                <div
                  role="alert"
                  className={`fixed left-4 right-4 top-4 z-50 flex max-w-[360px] sm:left-auto mx-auto sm:mx-0 items-center gap-3 rounded-xl border px-4 py-3 shadow-lg transition-all sm:right-6 sm:top-6 ${
                    status === 'success'
                      ? 'border-green-200 bg-green-50 text-green-800'
                      : 'border-red-200 bg-red-50 text-red-800'
                  }`}
                >
                  {status === 'success' ? (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600" aria-hidden>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </span>
                  ) : (
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600" aria-hidden>
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </span>
                  )}
                  <p className="font-sans text-sm font-medium leading-snug">
                    {statusMessage}
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full sm:max-w-[200px] rounded-lg bg-[#0F2C2A] px-6 py-3.5 font-sans text-sm font-medium text-white transition hover:bg-[#1a3d3a] disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
