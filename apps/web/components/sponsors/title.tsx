import { titleSponsor } from "@/config/sponsors";
import { Lines } from "../ui";
import SponsorCard from "./sponsor-card";
export default function TitleSponsors() {
  return (
    <section className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-20 ">
        <h2 className="text-3xl font-bold font-inria uppercase opacity-95">TITLE SPONSORS</h2>

        <div className="flex items-center gap-8 relative">
          <SponsorCard
            href={titleSponsor.href}
            logo={titleSponsor.logo}
            name={titleSponsor.name}
            className="w-72 h-40"
          />

          <Lines
            className="absolute -top-1 left-78 md:block hidden"
            length={220}
            flowDirection="rtl"
          />
          <Lines className="absolute -bottom-1 right-78 md:block hidden" length={220} />
        </div>
      </div>
    </section>
  );
}
