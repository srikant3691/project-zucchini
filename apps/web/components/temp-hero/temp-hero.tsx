"use client";

import { useRef } from "react";
import { useParallax } from "./hooks";
import { LightStrings } from "./components";
import {
  BackgroundLayer,
  PeacockLeftLayer,
  OwlRightDecorationLayer,
  PeacockBehindLayer,
  GirlLayer,
  LogoLayer,
  GradientOverlay,
  PeacockRightLayer,
  Parrot,
} from "./layers";

export default function TempHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mouse, scrollY } = useParallax(containerRef);

  return (
    <main
      ref={containerRef}
      className="min-h-screen w-full overflow-hidden relative 2xl:max-h-[56.25vw] 2xl:min-h-[56.25vw]"
    >
      <BackgroundLayer mouse={mouse} scrollY={scrollY} />

      <PeacockLeftLayer mouse={mouse} scrollY={scrollY} />
      <PeacockRightLayer mouse={mouse} scrollY={scrollY} />
      <Parrot mouse={mouse} scrollY={scrollY} />
      <OwlRightDecorationLayer mouse={mouse} scrollY={scrollY} />

      {/* <PeacockBehindLayer mouse={mouse} scrollY={scrollY} /> */}

      <LogoLayer mouse={mouse} scrollY={scrollY}>
        {/* <LightStrings mouse={mouse} scrollY={scrollY} /> */}
      </LogoLayer>

      <GirlLayer mouse={mouse} scrollY={scrollY} />

      <GradientOverlay />
    </main>
  );
}
