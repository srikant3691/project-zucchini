import { platinumSponsors } from "@/config/sponsors";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import SponsorCard from "./sponsor-card";

export default function PlatinumSponsors() {
  return (
    <section className="min-h-screen grid place-items-center mb-20">
      <div className="flex flex-col items-center justify-center py-20 gap-20">
        <h2 className="text-3xl font-bold uppercase font-inria opacity-95">PLATINUM SPONSORS</h2>

        <div className="max-w-3xl w-[20rem] msm:w-[25rem] lsm:w-[28rem] llsm:w-[35rem]  md:w-full  overflow-hidden">
          <Marquee className="h-44">
            {platinumSponsors.map(({ href, logo, name }, index) => (
              <SponsorCard
                key={name + index}
                href={href}
                logo={logo}
                name={name}
                className={"mr-10 w-64 h-32"}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
