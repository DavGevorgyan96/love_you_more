type ThumbProps = {
  selected: boolean;
  onClick: () => void;
  imgSrc: string;
};

export function EmblaCarouselThumb({ selected, onClick, imgSrc }: ThumbProps) {
  return (
    <div
      className={`embla__slide embla__slide--thumb ${selected ? 'is-selected' : ''}`}
    >
      <button
        onClick={onClick}
        className="embla__slide__inner embla__slide__inner--thumb"
        type="button"
        aria-pressed={selected}
      >
        <img
          className="embla__slide__thumbnail"
          src={imgSrc}
          alt=""
          loading="lazy"
        />
      </button>
    </div>
  );
}
