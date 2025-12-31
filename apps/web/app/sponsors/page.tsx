import React, { JSX } from "react";

// Paths to assets in the public folder
const background = "/sponsors/background.jpg";
const logo = ""; // Add logo path here if available

export default function SponsorsPage(): JSX.Element {
  const platinumSponsors = [
    { id: 1, row: 1, col: 1, hasBorder: true },
    { id: 2, row: 1, col: 2, hasBorder: true },
    { id: 3, row: 1, col: 3, hasBorder: true },
  ];

  return (
    <div className="bg-[#010005] overflow-hidden w-full min-h-screen relative text-white font-sans">
      {/* Background with Masks */}
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        alt="Carnival Background"
        src={background}
      />

      {/* Dark Overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />

      {/* Side Blur Ellipses (from design) */}
      <div
        className="absolute left-[-246px] top-[-109px] w-[702px] h-[1391px] rounded-[1391px] pointer-events-none z-0"
        style={{
          background: "linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          maskImage: "linear-gradient(to right, black 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, black 20%, transparent 100%)",
        }}
      />
      <div
        className="absolute right-[-246px] top-[-109px] w-[702px] h-[1391px] rounded-[1391px] pointer-events-none z-0"
        style={{
          background: "linear-gradient(270deg, #000000 0%, rgba(0, 0, 0, 0) 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          maskImage: "linear-gradient(to left, black 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 20%, transparent 100%)",
        }}
      />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-20 pb-20">
        {/* Title Sponsors */}
        <section className="flex flex-col items-center gap-8 mb-32">
          <h2 className="text-xl font-bold tracking-[0.3em] uppercase opacity-80">
            TITLE SPONSORS
          </h2>

          <div className="flex items-center gap-8">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-white/40 to-white/60" />
            <div className="w-64 h-24 bg-white/5 backdrop-blur-md border border-white/20 relative group overflow-hidden">
              {/* Animated Gradient Border Effect */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 opacity-40 blur-sm pointer-events-none" />
              <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors flex items-center justify-center">
                <span className="text-white/20 text-xs italic">Logo Placeholder</span>
              </div>
            </div>
            <div className="h-px w-40 bg-gradient-to-l from-transparent via-white/40 to-white/60" />
          </div>
        </section>

        {/* Platinum Sponsors */}
        <section className="flex flex-col items-center gap-12">
          <h2 className="text-xl font-bold tracking-[0.3em] uppercase opacity-80">
            PLATINUM SPONSORS
          </h2>

          <div className="grid grid-cols-3 gap-8">
            {platinumSponsors.map((sponsor) => (
              <div
                key={sponsor.id}
                className={`w-52 h-20 bg-white/5 backdrop-blur-sm border transition-all hover:scale-105 hover:bg-white/10 flex items-center justify-center ${
                  sponsor.hasBorder
                    ? "border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    : "border-transparent opacity-40"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <span className="text-white/10 text-[10px] uppercase tracking-widest italic">
                  Logo
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Audio Icon / Additional decoration */}
      <div className="fixed bottom-10 right-10 z-50">
        {/* You can add more social icons or decorations here */}
      </div>
    </div>
  );
}
