import React, { useMemo, useEffect, useRef, useState } from "react";

const CLIENTS = [
  { name: "Lenskart", logo: "/trusted-logos/lenskart.png", alt: "Lenskart" },
  { name: "Blue Tokai Coffee Roasters", logo: "/trusted-logos/blue-tokai.png", alt: "Blue Tokai Coffee Roasters" },
  { name: "Phoenix Marketcity", logo: "/trusted-logos/phoenix-marketcity.png", alt: "Phoenix Marketcity" },
  { name: "Success Engineers", logo: "/trusted-logos/success-engineers.png", alt: "Success Engineers" },
  { name: "Alora Resto & Bar", logo: "/trusted-logos/alora.png", alt: "Alora Resto & Bar" },
  { name: "Force Motors Ltd.", logo: "/trusted-logos/force-motors.png", alt: "Force Motors Ltd." },
  { name: "IIFL Securities", logo: "/trusted-logos/iifl-securities.png", alt: "IIFL Securities" },
];

const LogoCard = ({ client }) => {
  const [hasBrokenLogo, setHasBrokenLogo] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const showImage = client.logo && !hasBrokenLogo;

  return (
    <div className="group relative w-1/2 sm:w-1/4 lg:w-1/6 flex-shrink-0 flex items-center justify-center p-3">
      <div className="relative flex h-28 w-full items-center justify-center rounded-[14px] border border-slate-200 bg-white p-4 shadow-[0_12px_30px_-18px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03]">
        {showImage ? (
          <img
            src={client.logo}
            alt={client.alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setHasLoaded(true)}
            onError={() => setHasBrokenLogo(true)}
            className={`max-h-[56px] w-full max-w-[160px] object-contain object-center ${hasLoaded ? "" : "hidden"}`}
          />
        ) : null}

        {(!showImage || hasBrokenLogo || !hasLoaded) && (
          <div className="flex h-full w-full items-center justify-center text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
              {client.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const TrustedClientsSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const logos = useMemo(() => [...CLIENTS, ...CLIENTS], []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    let animationFrame;
    const step = () => {
      if (!element) return;
      if (!isPaused) {
        const loopPoint = element.scrollWidth / 2;
        element.scrollLeft += 0.85;
        if (element.scrollLeft >= loopPoint) {
          element.scrollLeft -= loopPoint;
        }
      }
      animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused, logos.length]);

  return (
    <section id="trusted-clients" className="py-6 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.35em] text-[#2563EB]">
            TRUSTED BY LEADING BRANDS
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold text-[#0F172A] sm:text-4xl">
            Our Trusted Clients
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#475569]">
            We're proud to provide professional cleaning services for leading brands, offices, restaurants, retail stores, and commercial spaces across Pune.
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50/80 px-3 py-8 shadow-sm">
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
            className="no-scrollbar overflow-x-auto scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-x" }}
          >
            <div className="flex gap-5 items-center">
              {logos.map((client, index) => (
                <LogoCard key={`${client.name}-${index}`} client={client} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedClientsSection;
