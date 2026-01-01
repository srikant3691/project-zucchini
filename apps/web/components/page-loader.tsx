"use client";

import React, { useEffect, useState } from "react";
import NitrutsavText from "@/components/hero/nitrutsav-text";
import Image from "next/image";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsVisible(false), 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image src="/loading.webp" alt="Loading background" fill className="object-cover" priority />

      <div className="relative w-[80vw] max-w-[600px] aspect-[1146/303] pointer-events-none">
        <div className="absolute -top-20 left-0 right-0 text-black text-center font-berlins text-[0.5rem] lsm:flex hidden lsm:text-xs llsmd:text-sm font-semibold items-center justify-center gap-2 pointer-events-none">
          <span>Made with 🧠 by</span>{" "}
          <Image src="/gdg.png" alt="logo" width={25} height={25} className="-mr-[2px]" />
          <span> DSC NIT ROURKELA</span>
        </div>

        <NitrutsavText />

        <div className="text-black mt-5 text-center font-berlins text-xs lsm:text-base llsmd:text-lg font-semibold !pointer-events-none">
          WELCOME TO THE CARNIVAL OF COLORS
        </div>
      </div>
    </div>
  );
}
