import SponsorCard from "@/components/sponsors/sponsor-card";
import { background, sponsors } from "@/config/sponsors";
import { generatePageMetadata } from "@/config/seo";
import React, { JSX } from "react";

export const metadata = generatePageMetadata("sponsors");

const sponsorOrder = [...new Set(sponsors.map((s) => s.type || "Other"))];

export default function SponsorsPage(): JSX.Element {
  const groupedSponsors = sponsors.reduce(
    (acc, sponsor) => {
      const type = sponsor.type || "Other";
      if (!acc[type]) acc[type] = [];
      acc[type].push(sponsor);
      return acc;
    },
    {} as Record<string, typeof sponsors>
  );

  return (
    <div className="bg-[#010005] w-full relative text-white min-h-screen flex flex-col items-center pb-20">
      <img className="back-image-spons" alt="Carnival Background" src={background} />

      <div className="w-full max-w-[1440px] px-4 md:px-10 pt-32 z-10 flex flex-col items-center gap-16">
        {/* <div className=" flex-col items-center gap-6 mb-16 mt-20 flex">
          <img
            src="https://res.cloudinary.com/drf3eatfm/image/upload/v1767557161/nitrutsav-2026/bfh824fnvifwdlpuf8vn.png"
            alt="Sponsors Title Logo"
            className="w-[400px] md:w-[700px] object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          />
        </div> */}

        <div className="flex flex-col items-center w-full gap-32">
          {sponsorOrder.map((type) => {
            const sponsors = groupedSponsors[type];
            if (!sponsors || sponsors.length === 0) return null;

            return (
              <div key={type} className="flex flex-col items-center gap-12 w-full my-20">
                <h2 className="text-4xl md:text-5xl font-bold font-berkshire tracking-widest text-[#fff] drop-shadow-[0_0_4px] text-center">
                  {type}
                </h2>

                <div className="flex flex-wrap justify-center gap-16 w-full px-4 mt-20">
                  {sponsors.map((sponsor, index) => (
                    <SponsorCard
                      key={index}
                      {...sponsor}
                      className="w-[240px] h-[220px] md:w-[380px] md:h-[240px] bg-[#1a1a1a]/50 backdrop-blur-sm border border-white/10 hover:border-[#133662] transition-all duration-300"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
