export function Confetti() {
  return (
    <>
      <span
        className="confetti-piece absolute left-8 top-0 bg-butter"
        style={{ animationDelay: "0s" }}
      />
      <span
        className="confetti-piece absolute left-1/3 top-0 bg-brand"
        style={{ animationDelay: "0.5s" }}
      />
      <span
        className="confetti-piece absolute right-1/3 top-0 bg-cream"
        style={{ animationDelay: "1s" }}
      />
      <span
        className="confetti-piece absolute right-8 top-0 bg-butter"
        style={{ animationDelay: "1.4s" }}
      />
      <span
        className="confetti-piece absolute left-1/2 top-0 size-1.5 rounded-full bg-butter"
        style={{ animationDelay: "0.3s" }}
      />
    </>
  );
}
