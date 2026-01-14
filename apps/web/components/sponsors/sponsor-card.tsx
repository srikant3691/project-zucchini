"use client";
import Image from "next/image";

export default function SponsorCard({
  logo,
  href,
  name,
  type,
  className,
}: {
  logo: string;
  href: string;
  name: string;
  type?: string;
  className?: string;
}) {
  function handleRedirect(href: string) {
    if (href == "") return;
    window.open(href, "_blank");
  }

  return (
    <div className="flex flex-col items-center gap-4 group">
      <div
        onClick={() => handleRedirect(href)}
        className={`relative flex items-center justify-center overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer ${className}`}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {logo ? (
          <div className="relative w-[80%] h-[80%]">
            <Image src={logo} alt={`${name} logo`} fill className="object-contain drop-shadow-md" />
          </div>
        ) : (
          <div className="grid place-items-center font-inria text-white/50 text-sm">
            Coming Soon...
          </div>
        )}
      </div>

      {/* Company Name */}
      <span className="text-xl font-bold font-inria text-white uppercase tracking-wider text-center mt-2">
        {name}
      </span>
    </div>
  );
}
