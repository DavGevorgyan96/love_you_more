type BlockPlaceholderProps = {
  id: string;
  title: string;
  className?: string;
};

export function BlockPlaceholder({ id, title, className = '' }: BlockPlaceholderProps) {
  return (
    <section id={id} className={`py-16 lg:py-24 px-3   lg:px-[100px] xl:px-[150px] 2xl:px-[200px] ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-semibold text-slate-800 lg:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-slate-600">Блок — контент будет добавлен.</p>
      </div>
    </section>
  );
}
