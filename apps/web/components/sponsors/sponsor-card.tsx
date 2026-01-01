"use client";
import Image from "next/image";
export default function SponsorCard({
  logo,
  href,
  name,
  className,
}: {
  logo: string;
  href: string;
  name: string;
  className?: string;
}) {
  {
    function handleRedirect(href: string) {
      if (href == "") return;
      window.open(href, "_blank");
    }
    return (
      <div
        onClick={() => handleRedirect(href)}
        className={` transition-all hover:scale-105 spons-border cursor-pointer ${className}`}
      >
        {logo ? (
          <Image src={logo} alt={`${name} logo`} fill className="object-contain p-2" />
        ) : (
          <div className="grid place-items-center font-inria h-full">Coming Soon...</div>
        )}
      </div>
    );
  }
}
