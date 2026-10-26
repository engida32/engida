import type { ReactNode } from "react";

export function SectionLabel({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h2 id={id} className="label-row">
      <span aria-hidden="true">$</span>
      <span>{children}</span>
    </h2>
  );
}
