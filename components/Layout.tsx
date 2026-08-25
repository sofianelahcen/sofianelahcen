import type { CSSProperties, ReactNode } from "react";

type PageProps = {
  id?: string;
  children: ReactNode;
  pinned?: "top" | "bottom";
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
};

export function Page({
  id,
  children,
  pinned,
  zIndex,
  className,
  style,
}: PageProps) {
  const pinClass = pinned
    ? `page-pinned page-pinned-${pinned}`
    : "";

  return (
    <section
      id={id}
      className={["page", pinClass, className].filter(Boolean).join(" ")}
      style={{ zIndex, ...style }}
    >
      <div className="page-layout">
        <div className="page-content">
          <div className="bodycopy">{children}</div>
        </div>
      </div>
    </section>
  );
}

type ColumnSetProps = {
  columns: string;
  gutter: string;
  stackOnMobile?: boolean;
  children: ReactNode;
};

export function ColumnSet({
  columns,
  gutter,
  stackOnMobile = true,
  children,
}: ColumnSetProps) {
  return (
    <div
      className={stackOnMobile ? "column-set column-set-stacks" : "column-set"}
      style={
        { "--columns": columns, "--gutter": gutter } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function ColumnUnit({ children }: { children?: ReactNode }) {
  return <div className="column-unit">{children}</div>;
}

export function Lines({ count }: { count: number }) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <span key={index} aria-hidden className="rule-break" />
      ))}
    </>
  );
}
