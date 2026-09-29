import { useEffect, useRef, useState, type ReactNode } from "react";

export function OldLogoMark({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="og" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7931e" />
          <stop offset="1" stopColor="#e8501a" />
        </linearGradient>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3b8ff0" />
          <stop offset="1" stopColor="#1456b8" />
        </linearGradient>
      </defs>
      <path d="M18 58 A34 34 0 0 1 70 22 C52 26 34 40 18 58Z" fill="url(#og)" />
      <path d="M22 70 C36 50 56 36 78 30 A34 34 0 1 1 22 70Z" fill="url(#bg)" />
      <path d="M20 64 C36 46 56 34 80 28" stroke="#fff" strokeWidth="4" fill="none" />
      <path d="M26 76 C40 60 58 48 82 42" stroke="#d7262e" strokeWidth="3" fill="none" />
      <path d="M72 14 l14 -4 l-4 3 l6 2 l-2 2 l-7 -1 l-4 6 l-2 0 l2 -6z" fill="#1f6fd1" />
    </svg>
  );
}

export function Globe({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="52" r="40" fill="#6b6b6b" stroke="#0a5cb0" strokeWidth="2.5" />
      <path d="M28 30c6-4 12-6 18-4 2 4-3 7-1 11 3 4 9 2 11 7 1 5-5 7-9 9-4 3-2 9-6 11-5-1-6-7-9-10-4-4-9-6-8-12 1-5 2-9 4-12z" fill="#fff" />
      <path d="M62 22c6 2 12 7 15 13-4 1-7-2-11 0-3 2-1 6-4 8-3-2-5-6-4-10 1-4 3-8 4-11z" fill="#fff" />
      <path d="M58 64c5-2 10 1 12 5-2 6-7 11-13 13 0-6-3-12 1-18z" fill="#fff" />
      <path d="M8 60 C30 78 70 72 92 30" stroke="#fff" strokeWidth="9" fill="none" />
      <path d="M8 60 C30 76 70 70 92 30" stroke="#0a5cb0" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M86 18 l10 -8 l1 2 l-6 7 l5 4 l-1 2 l-6 -3 l-4 5 l-2 -1 l2 -6 z" fill="#0a5cb0" />
    </svg>
  );
}

function SvgLogo({ light }: { light: boolean }) {
  return (
    <div className="leading-none select-none">
      <div className={`flex items-center text-[34px] font-black tracking-tight ${light ? "text-white" : "text-[#0a5cb0]"}`}>
        <span>OX</span>
        <Globe className="h-10 w-10 -mx-0.5" />
        <span>N</span>
      </div>
      <div className={`text-[10.5px] font-bold tracking-wide ${light ? "text-red-400" : "text-[#e3101b]"}`}>TRAVEL &amp; TOURS (P.) LTD.</div>
      <div className={`text-[7.5px] italic font-serif mt-0.5 ${light ? "text-white/70" : "text-[#0a5cb0]"}`}>Journeys, Exploration And Adventures</div>
    </div>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <a href="#home" className="flex items-center">
      {failed ? (
        <SvgLogo light={light} />
      ) : (
        <span className={light ? "bg-white rounded-xl px-2 py-1" : ""}>
          <img src="/images/logo.png" alt="Oxon Travel & Tours (P.) Ltd." onError={() => setFailed(true)} className="h-14 w-auto object-contain" />
        </span>
      )}
    </a>
  );
}

export function Photo({
  src,
  alt,
  initials,
  className = "",
}: {
  src: string;
  alt: string;
  initials: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-navy-800 via-brand-blue to-brand-orange text-white text-5xl font-bold ${className}`}
      >
        {initials}
      </div>
    );
  }
  return <img src={src} alt={alt} onError={() => setFailed(true)} className={`object-cover ${className}`} />;
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("show");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionTitle({ kicker, title, sub, light = false }: { kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <div className="inline-flex items-center gap-2 text-brand-orange font-semibold text-sm tracking-[0.2em] uppercase">
        <span className="h-px w-8 bg-brand-orange" />
        {kicker}
        <span className="h-px w-8 bg-brand-orange" />
      </div>
      <h2 className={`mt-3 font-serif text-4xl md:text-5xl font-bold ${light ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {sub && <p className={`mt-4 ${light ? "text-white/70" : "text-slate-600"}`}>{sub}</p>}
    </div>
  );
}
