"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/hero_v2";
import NitrutsavText from "@/components/hero/nitrutsav-text";
import Image from "next/image";
import { HERO_IMAGES } from "@/config/hero";
import { useAudio } from "@/contexts/audio-context";

const IMAGES_TO_PRELOAD = [
  HERO_IMAGES.mainBackground,
  HERO_IMAGES.background,
  HERO_IMAGES.girl,
  HERO_IMAGES.owlLeft,
  HERO_IMAGES.owlRight,
  HERO_IMAGES.peacockLeft,
  HERO_IMAGES.logo,
  "/loading.webp",
  "/gdg.png",
  "/ink-spread-5.gif",
];

export default function Home() {
  const { play } = useAudio();

  const [showPreloader, setShowPreloader] = useState(() => {
    if (typeof window === "undefined") return true;
    if ((window as any).hasShownPreloader) return false;
    return true;
  });

  const [isActive, setIsActive] = useState(false);
  const [removeGif, setRemoveGif] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = IMAGES_TO_PRELOAD.length;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / totalImages) * 100));
          resolve();
        };
      });
    };

    Promise.all(IMAGES_TO_PRELOAD.map(preloadImage)).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  const canEnter = imagesLoaded && textAnimationComplete;

  const handleStart = useCallback(() => {
    if (canEnter && !hasAnimated.current) {
      hasAnimated.current = true;

      (window as any).hasShownPreloader = true;

      play();
      setIsActive(true);
      setShowPreloader(false);
    }
  }, [canEnter, play]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showPreloader) {
        handleStart();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showPreloader, handleStart]);

  useEffect(() => {
    if (isActive && !removeGif) {
      const timer = setTimeout(() => setRemoveGif(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [isActive, removeGif]);

  useEffect(() => {
    if (removeGif && wrapperRef.current) {
      wrapperRef.current.style.maskImage = "none";
      wrapperRef.current.style.webkitMaskImage = "none";
      document.body.style.position = "static";
      document.body.style.overflow = "auto";
    }
    if (isActive && !removeGif) {
      document.body.style.position = "fixed";
      document.body.style.overflow = "hidden";
    }
  }, [removeGif, isActive]);

  return (
    <>
      {showPreloader && (
        <div
          onClick={handleStart}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-transparent cursor-pointer"
        >
          <Image
            src="/loading.webp"
            alt="Loading background"
            fill
            className="object-cover"
            priority
          />

          <div className="relative w-[80vw] max-w-[600px] aspect-1146/303">
            <NitrutsavText onAnimationComplete={() => setTextAnimationComplete(true)} />
            <div className="text-black mt-5 text-center font-berlins text-xs lsm:text-base llsmd:text-lg font-semibold relative min-h-14 flex items-center justify-center">
              {!textAnimationComplete ? (
                <span className="animate-pulse">LOADING... {loadProgress}%</span>
              ) : (
                <>
                  <motion.span
                    className="text-lg lsm:text-xl llsmd:text-2xl font-bold tracking-wide block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  >
                    WELCOME TO THE CARNIVAL OF COLORS
                  </motion.span>
                  <motion.span
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs lsm:text-sm llsmd:text-base opacity-70 whitespace-nowrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0.4, 0.7] }}
                    transition={{
                      opacity: { duration: 2, repeat: Infinity, repeatType: "reverse" },
                    }}
                  >
                    Click anywhere or press Enter to continue
                  </motion.span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-screen">
        <div
          ref={wrapperRef}
          className={`hero-bg h-[120vh] overflow-hidden ${isActive && !removeGif ? "ink-mask" : ""}`}
        >
          <Hero />
        </div>
      </div>

      <style jsx global>{`
          .ink-mask {
          mask-image: url("/ink-spread-5.gif");
          mask-repeat: no-repeat;
          mask-size: cover;
          mask-position: center;

          -webkit-mask-image: url("/ink-spread-5.gif");
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: cover;
          -webkit-mask-position: center;

          height: 100svh;
          width: 100svw;
          overflow: hidden;
          }
        }
      `}</style>
    </>
  );
}
