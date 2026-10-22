export default function Loading() {
  return (
    <div className="wrap loading-shell" aria-busy="true" role="status">
      <span className="sr-only">Loading / Загрузка / Inapakia</span>
      <div className="loading-line" />
      <div className="loading-line" />
      <div className="loading-line" />
    </div>
  );
}
