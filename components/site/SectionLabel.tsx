export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="label-row">
      <span aria-hidden="true">$</span>
      <span>{children}</span>
    </div>
  );
}
