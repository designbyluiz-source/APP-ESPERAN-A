type Variant = "home" | "login" | "calendar" | "worship" | "giving";

function Block({ className = "" }: { className?: string }) {
  return <span className={`skeleton-block ${className}`} />;
}

function Lines() {
  return (
    <div className="skeleton-lines">
      {Array.from({ length: 7 }, (_, i) => (
        <Block key={i} className={i % 3 === 2 ? "skeleton-short" : ""} />
      ))}
    </div>
  );
}

/** CSS delays visibility by 350ms, including before hydration. No artificial load delay. */
export function RouteSkeleton({ variant = "home" }: { variant?: Variant }) {
  return (
    <main
      className={`route-skeleton delayed-skeleton skeleton-${variant}`}
      role="status"
      aria-label="Carregando página"
      aria-busy="true"
    >
      <div className="skeleton-layout" aria-hidden="true">
        {variant === "home" ? (
          <>
            <div className="skeleton-header">
              <Block className="skeleton-brand" />
              <Block className="skeleton-chip" />
            </div>
            <div className="skeleton-home-grid">
              <Block className="skeleton-hero" />
              <div className="skeleton-features">
                <Block />
                <Block />
                <Block />
                <Block />
              </div>
              <div className="skeleton-news">
                <Block className="skeleton-title" />
                <div>
                  <Block />
                  <Block />
                </div>
              </div>
            </div>
          </>
        ) : variant === "login" ? (
          <>
            <Block className="skeleton-title" />
            <Block className="skeleton-brand" />
            <div className="skeleton-login-fields">
              <Block />
              <Block />
            </div>
            <div className="skeleton-login-actions">
              <Block />
              <Block />
            </div>
            <Block className="skeleton-footer" />
          </>
        ) : (
          <>
            <Block className="skeleton-title" />
            {variant === "calendar" ? (
              <div className="skeleton-calendar">
                {Array.from({ length: 35 }, (_, i) => (
                  <Block key={i} />
                ))}
              </div>
            ) : variant === "giving" ? (
              <Block className="skeleton-qr" />
            ) : (
              <Block className="skeleton-worship-hero" />
            )}
            {variant === "worship" ? (
              <>
                <div className="skeleton-tabs">
                  <Block />
                  <Block />
                </div>
                <Lines />
              </>
            ) : (
              <div className="skeleton-list">
                {Array.from({ length: 3 }, (_, i) => (
                  <Block key={i} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
