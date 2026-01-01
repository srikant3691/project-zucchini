"use client";

import { useState } from "react";
import Image from "next/image";
// import Navbar from "@/components/marginals/navbar";
// import CountdownTimer from "@/components/hero/countdown-timer";
// import MusicVisualizer from "@/components/hero/music-visualizer";
import { faqImages } from "@/config/faq";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Are there any registration fees for participating in NITRUTSAV Events?",
    answer:
      "Yes, a small registration fee is there. Check the event details on the website for specific information.",
  },
  {
    question: "Are there any registration fees for participating in NITRUTSAV Events?",
    answer:
      "Yes, a small registration fee is there. Check the event details on the website for specific information.",
  },
  {
    question: "Are there any registration fees for participating in NITRUTSAV Events?",
    answer:
      "Yes, a small registration fee is there. Check the event details on the website for specific information.",
  },
  {
    question: "Are there any registration fees for participating in NITRUTSAV Events?",
    answer:
      "Yes, a small registration fee is there. Check the event details on the website for specific information.",
  },
  {
    question: "Are there any registration fees for participating in NITRUTSAV Events?",
    answer:
      "Yes, a small registration fee is there. Check the event details on the website for specific information.",
  },
  {
    question: "Are there any registration fees for participating in NITRUTSAV Events?",
    answer:
      "Yes, a small registration fee is there. Check the event details on the website for specific information.",
  },
];

interface FAQAccordionItemProps {
  item: FAQItem;
  isExpanded: boolean;
  onClick: () => void;
  index: number;
}

function FAQAccordionItem({ item, isExpanded, onClick, index }: FAQAccordionItemProps) {
  return (
    <div
      className="relative cursor-pointer"
      onClick={onClick}
      style={{
        borderRadius: "0px 16px 0px 16px",
      }}
    >
      <div
        className="relative w-full"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "2px solid #FFFFFF",
          borderRadius: "0px 16px 0px 16px",
          padding: "22px 28px",
          backdropFilter: "blur(14.1px)",
          transition: "padding 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          ...(isExpanded && { padding: "36px 28px" }),
        }}
      >
        <div className="flex items-start justify-between gap-2 md:gap-4 w-full">
          <div className="flex-1 flex flex-col">
            <h3
              className="text-white"
              style={{
                fontFamily: "var(--font-inria), 'Inria Sans', sans-serif",
                fontWeight: 700,
                fontStyle: "normal",
                fontSize: "24px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              {item.question}
            </h3>
            {/* Answer with smooth height animation */}
            <div
              style={{
                display: "grid",
                gridTemplateRows: isExpanded ? "1fr" : "0fr",
                opacity: isExpanded ? 1 : 0,
                transition:
                  "grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-in-out, margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                marginTop: isExpanded ? "32px" : "0px",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <p
                  className="text-white"
                  style={{
                    fontFamily: "var(--font-inria), 'Inria Sans', sans-serif",
                    fontWeight: 300,
                    fontStyle: "normal",
                    fontSize: "24px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
          {/* Animated +/- Icon */}
          <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{
              width: "32px",
              height: "32px",
              minWidth: "32px",
              position: "relative",
            }}
          >
            {/* Horizontal line (always visible) */}
            <div
              style={{
                position: "absolute",
                width: "22px",
                height: "2px",
                backgroundColor: "white",
                borderRadius: "1px",
              }}
            />
            {/* Vertical line (animates to 0 height when expanded) */}
            <div
              style={{
                position: "absolute",
                width: "2px",
                height: "22px",
                backgroundColor: "white",
                borderRadius: "1px",
                transition:
                  "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: isExpanded ? "scaleY(0)" : "scaleY(1)",
                opacity: isExpanded ? 0 : 1,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set([1])); // Second item expanded by default

  const handleToggle = (index: number) => {
    setExpandedIndices((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "#010005",
        width: "100%",
      }}
    >
      {/* Background Images Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        style={{ background: "#010005" }}
      >
        {/* Image 84 - Carnival Masks with hue blend - shows the side masks */}
        <div
          className="absolute inset-0"
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <Image
            src={faqImages.secondary}
            alt="FAQ Background Secondary - Carnival Masks"
            fill
            className="object-cover"
            style={{
              // mixBlendMode: "multiply",
              opacity: 1,
              filter: "blur(8.15px)",
            }}
          />
        </div>

        {/* Image 115 - Native Chief overlay with color-dodge for glow effect */}
        <div
          className="absolute"
          style={{
            width: "1112px",
            height: "2116px",
            left: "50%",
            top: "-415px",
            transform: "translateX(-50%)",
          }}
        >
          <Image
            src={faqImages.overlay}
            alt="FAQ Background Overlay - Native American Chief"
            fill
            className="object-cover"
            style={{
              mixBlendMode: "color-dodge",
              opacity: 0.7,
            }}
          />
        </div>
        {/* Image 90 - Cosmic Nebula - Base layer with blur */}
        <div
          className="absolute inset-0"
          style={{
            width: "100vw",
            height: "100vh",
          }}
        >
          <Image
            src={faqImages.main}
            alt="FAQ Background Main - Cosmic Nebula"
            fill
            className="object-cover"
            priority
            style={{
              opacity: 1,
              filter: "blur(8.15px)",
              mixBlendMode: "hue",
            }}
          />
          {/* Radial gradient overlay for darkening edges */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)",
            }}
          />
        </div>

        {/* Dark vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(1, 0, 5, 0.7) 80%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Navbar and Countdown Timer */}
      {/* <div className="relative z-20">
                <Navbar />
                <CountdownTimer />
                <MusicVisualizer />
            </div> */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-24 md:pt-32 lg:pt-40 pb-10 md:pb-16 lg:pb-10">
        {/* FAQ Title Section */}
        <div className="w-full max-w-[1280px] flex items-center justify-center mb-6 md:mb-10">
          <div className="flex items-center justify-center gap-4 md:gap-8 lg:gap-[35px] w-full">
            {/* Left Line */}
            <div
              className="hidden md:flex flex-1"
              style={{
                height: "4px",
                background: "#FFFFFF",
              }}
            />

            {/* FAQ Title */}
            <div
              className="flex items-center justify-center"
              style={{
                width: "240px",
                height: "80px",
                background: "rgba(0, 0, 0, 0.6)",
                border: "2px solid #FFFFFF",
                borderRadius: "0px 20px 0px 20px",
                backdropFilter: "blur(5.15px)",
              }}
            >
              <h2
                className="text-white"
                style={{
                  fontFamily: "'Berryfield Regular', var(--font-baloo), 'Baloo', sans-serif",
                  fontWeight: 400,
                  fontStyle: "normal",
                  fontSize: "31.36px",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.43)",
                }}
              >
                FAQ&apos;S
              </h2>
            </div>

            {/* Right Line */}
            <div
              className="hidden md:flex flex-1"
              style={{
                height: "4px",
                background: "#FFFFFF",
              }}
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div
          className="flex flex-col w-full"
          style={{
            maxWidth: "1280px",
            gap: "16px",
          }}
        >
          {faqData.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              index={index}
              isExpanded={expandedIndices.has(index)}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>

      {/* Feather Overlays - Left Side Group */}
      <div
        className="fixed pointer-events-none z-50 hidden lg:block"
        style={{
          width: "496.88px",
          height: "696.04px",
          left: "0px",
          bottom: "0px",
        }}
      >
        {/* Feather 116 - Left */}
        <div
          className="absolute"
          style={{
            width: "304.31px",
            height: "608.62px",
            left: "29px",
            bottom: "0px",
            transform: "matrix(-0.96, -0.28, -0.28, 0.96, 0, 80)",
          }}
        >
          <Image src={faqImages.feather} alt="Decorative Feather" fill className="object-contain" />
        </div>

        {/* Feather 117 - Left */}
        <div
          className="absolute"
          style={{
            width: "228.48px",
            height: "456.96px",
            left: "23.83px",
            bottom: "-201.82px",
            transform: "matrix(-0.75, -0.66, -0.66, 0.75, 0, 0)",
          }}
        >
          <Image src={faqImages.feather} alt="Decorative Feather" fill className="object-contain" />
        </div>

        {/* Feather 118 - Left */}
        <div
          className="absolute"
          style={{
            width: "228.48px",
            height: "456.96px",
            left: "0px",
            bottom: "-113px",
            transform: "matrix(-0.97, 0.26, 0.26, 0.97, -70, 0)",
          }}
        >
          <Image src={faqImages.feather} alt="Decorative Feather" fill className="object-contain" />
        </div>
      </div>

      {/* Feather Overlays - Right Side Group (Mirrored) */}
      <div
        className="fixed pointer-events-none z-50 hidden lg:block"
        style={{
          width: "496.88px",
          height: "696.04px",
          right: "0px",
          bottom: "0px",
          transform: "scaleX(-1)",
        }}
      >
        {/* Feather 116 - Right */}
        <div
          className="absolute"
          style={{
            width: "304.31px",
            height: "608.62px",
            left: "29px",
            bottom: "0px",
            transform: "matrix(-0.96, -0.28, -0.28, 0.96, 0, 80)",
          }}
        >
          <Image src={faqImages.feather} alt="Decorative Feather" fill className="object-contain" />
        </div>

        {/* Feather 117 - Right */}
        <div
          className="absolute"
          style={{
            width: "228.48px",
            height: "456.96px",
            left: "23.83px",
            bottom: "-201.82px",
            transform: "matrix(-0.75, -0.66, -0.66, 0.75, 0, 0)",
          }}
        >
          <Image src={faqImages.feather} alt="Decorative Feather" fill className="object-contain" />
        </div>

        {/* Feather 118 - Right */}
        <div
          className="absolute"
          style={{
            width: "228.48px",
            height: "456.96px",
            left: "0px",
            bottom: "-113px",
            transform: "matrix(-0.97, 0.26, 0.26, 0.97, -80, 0)",
          }}
        >
          <Image src={faqImages.feather} alt="Decorative Feather" fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}
