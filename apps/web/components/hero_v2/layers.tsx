import Image from "next/image";
import { HERO_IMAGES, PARALLAX_MOUSE, PARALLAX_SCROLL, TRANSITIONS } from "@/config/hero";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-is-mobile";

interface ParallaxLayerProps {
  mouse: { x: number; y: number };
  scrollY: number;
}

export function BackgroundLayer({ mouse, scrollY }: ParallaxLayerProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none h-[110vh] overflow-visible"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.background.x}vw, ${mouse.y * PARALLAX_MOUSE.background.y}vw) translateY(${scrollY * PARALLAX_SCROLL.background}px)`,
        transition: `transform ${TRANSITIONS.background}s ease-out`,
      }}
    >
      <Image
        src={isMobile ? HERO_IMAGES.backgroundMobile : HERO_IMAGES.background}
        alt="Background"
        fill
        className="object-cover object-top scale-105"
        priority
      />
    </div>
  );
}

export function PeacockLeftLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden md:block absolute left-[-10vw] md:left-[15vw] bottom-[-5vw] md:bottom-[-20vw] w-[40vw] md:w-[45vw] h-[40vw] md:h-[45vw] z-[12] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.owls.x}vw, ${mouse.y * PARALLAX_MOUSE.owls.y}vw) rotate(-8deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.owlLeft} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function PeacockRightLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden md:block absolute right-[-10vw] md:right-[15vw] bottom-[-5vw] md:bottom-[-20vw] w-[40vw] md:w-[45vw] h-[40vw] md:h-[45vw] z-[15] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.owls.x}vw, ${mouse.y * PARALLAX_MOUSE.owls.y}vw) rotate(8deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.owlLeft} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function Parrot({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden md:block absolute left-[-20vw] md:left-[-15vw] bottom-[-10vw] md:bottom-[-15vw] w-[50vw] md:w-[35vw] h-[50vw] md:h-[35vw] z-[16] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.peacockFeathers.x}vw, ${mouse.y * PARALLAX_MOUSE.peacockFeathers.y}vw) rotate(38deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.peacockLeft} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function OwlRightDecorationLayer({ mouse, scrollY }: ParallaxLayerProps) {
  return (
    <div
      className="hidden md:block absolute right-[-15vw] md:right-[-10vw] bottom-[-10vw] md:bottom-[-10vw] w-[40vw] md:w-[30vw] h-[40vw] md:h-[30vw] z-[15] pointer-events-none"
      style={{
        transform: `translate(${mouse.x * PARALLAX_MOUSE.owlRight.x}vw, ${mouse.y * PARALLAX_MOUSE.owlRight.y}vw) rotate(-31deg) translateY(${scrollY * PARALLAX_SCROLL.owls}px)`,
        transition: `transform ${TRANSITIONS.owls}s ease-out`,
      }}
    >
      <Image src={HERO_IMAGES.owlRight} alt="" fill className="object-contain" unoptimized />
    </div>
  );
}

export function GirlLayer({ mouse, scrollY }: ParallaxLayerProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={cn(
        "absolute left-1/2 -translate-x-1/2 md:bottom-[-5vw] h-[55vh] w-[55vh] ssm:h-[110vw] ssm:w-[110vw] lsm:h-[80vw] lmd:h-[35vw] lsm:w-[80vw] llsmd:w-[60vw] llsmd:h-[60vw] md:w-[50vw] z-20 llmd:w-[60vw] pointer-events-none -bottom-20 scale-75 md:scale-100"
      )}
      style={
        isMobile
          ? {}
          : {
              transform: `translate(${mouse.x * PARALLAX_MOUSE.girl.x}vw, ${mouse.y * PARALLAX_MOUSE.girl.y}vw) translateY(${scrollY * PARALLAX_SCROLL.girl}px)`,
              transition: `transform ${TRANSITIONS.girl}s ease-out`,
            }
      }
    >
      <Image
        src={HERO_IMAGES.girl}
        alt="Nitrutsav Character"
        fill
        className="object-contain object-bottom"
        priority
        unoptimized
      />
      <div
        className={cn(
          "md:block hidden absolute left-1/2 -translate-x-1/2  w-[105vw] h-[90%] bg-linear-to-b from-transparent to-black/50 pointer-events-none"
          // isTallScreen ? "via-black/90 top-[60%]" : "top-[40%] via-black/90"
        )}
      />
    </div>
  );
}

export function LogoLayer({
  mouse,
  scrollY,
  children,
}: ParallaxLayerProps & { children?: React.ReactNode }) {
  return (
    <div className="absolute left-0 right-0 -top-20 lsm:-top-12 llmd:-top-10 llg:-top-50 2xl:-top-80 bottom-0 flex items-center justify-center z-[25] pointer-events-none">
      <div
        className="flex flex-col items-center 2xl:items-start max-w-[80%] md:max-w-[50%] 2xl:max-w-[50%]"
        style={{
          transform: `translate(${mouse.x * PARALLAX_MOUSE.logo.x}vw, ${mouse.y * PARALLAX_MOUSE.logo.y}vw) translateY(${scrollY * PARALLAX_SCROLL.logo}px)`,
          transition: `transform ${TRANSITIONS.logo}s ease-out`,
        }}
      >
        {/* Light strings relative to logo */}
        {children}
        {/* Logo */}
        <div className="relative w-[90vw] lsm:w-[80vw] md:w-[50vw] 2xl:w-[50vw] h-[35vw] lsm:h-[35vw] md:h-[20vw] 2xl:h-[15vw] drop-shadow-[0_0_25px_rgba(255,255,255,0.3)] filter">
          <Image
            src={HERO_IMAGES.logo}
            alt="Nitrutsav 2026"
            fill
            className="object-contain object-center scale-95 md:scale-125"
            priority
          />
        </div>
        {/* Date */}
      </div>
    </div>
  );
}

export function GradientOverlay() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[20vh] md:h-[10vw] bg-gradient-to-t from-black to-transparent z-[40] pointer-events-none" />
  );
}
