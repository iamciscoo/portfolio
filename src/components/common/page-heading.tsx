export function PageHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-heading wrap">
      <div className="eyebrow">
        <span className="blue-dot" />
        {label}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
