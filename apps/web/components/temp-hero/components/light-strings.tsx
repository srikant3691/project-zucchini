import LeftLightString from "../left-light-string";
import RightLightString from "../right-light-string";
import { PARALLAX_MOUSE, PARALLAX_SCROLL, TRANSITIONS } from "../config";

interface LightStringsProps {
  mouse: { x: number; y: number };
  scrollY: number;
}

export function LightStrings({ mouse, scrollY }: LightStringsProps) {
  const style = {
    transform: `translate(${mouse.x * PARALLAX_MOUSE.lightStrings.x}px, ${mouse.y * PARALLAX_MOUSE.lightStrings.y}px) translateY(${scrollY * PARALLAX_SCROLL.lightStrings}px)`,
    transition: `transform ${TRANSITIONS.lightStrings}s ease-out`,
  };

  return (
    <>
      {/* Left light string - positioned relative to logo */}
      <div
        className="absolute top-[2vw] -left-[30vw] w-[50vw] h-[60vh] pointer-events-none z-[-1] rotate-[22deg]"
        style={style}
      >
        <LeftLightString />
      </div>

      {/* Right light string - positioned relative to logo */}
      <div
        className="absolute -top-[12vw] -right-[25vw] w-[50vw] h-[60vh] pointer-events-none z-[-1]"
        style={style}
      >
        <RightLightString />
      </div>
    </>
  );
}
