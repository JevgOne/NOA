export default function LeafRule({ marginBottom }: { marginBottom?: string }) {
  return (
    <div className="leafrule" style={marginBottom ? { marginBottom } : undefined}>
      <span className="l" />
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
        <path d="M12 3C7 6 5 11 5 15c0 3 2 6 7 6 0-6 0-12 0-18Z" />
        <path d="M12 6c3 2 4 5 4 8" />
      </svg>
      <span className="l" />
    </div>
  );
}
