"use client";

import Image from "next/image";
import {
  FlagshipEvents,
  ProShows,
  MainEvents,
  FunEvents,
  WorkshopandExihibition,
  Images,
} from "@/config/events";
import EventSwiper from "./eventswiper";
import EventInfo from "./eventinfo";
import EventCategory from "./eventcatagory";
import { useState, useRef, useEffect } from "react";
import { useEventCategory } from "@/contexts/event-category-context";
import "swiper/css";

const categories: Record<string, any[]> = {
  "Flagship Events": FlagshipEvents,
  "Pro Shows": ProShows,
  "Fun Events": FunEvents,
  "Main Events": MainEvents,
  "Workshops and Exhibition": WorkshopandExihibition,
};

export default function Event() {
  const { activeCategory, setActiveCategory } = useEventCategory();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const textSwiperRef = useRef<any>(null);

  const currentEvents = categories[activeCategory] || ProShows;

  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  useEffect(() => {
    if (textSwiperRef.current) {
      textSwiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden events-bg py-20">
      <div
        className="
                    absolute inset-0 bg-black/55 pointer-events-none
                    [mask-image:radial-gradient(circle_at_center,transparent_30%,black_80%)]
                "
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col w-full min-h-screen ">
        {/* HERO SWIPER */}
        <div className="flex flex-col items-center justify-center mt-6 md:mt-8 mb-6">
          <EventSwiper
            events={currentEvents}
            onSlideChange={setActiveIndex}
            disabled={isModalOpen}
          />
        </div>

        <div className="w-full max-w-[90vw] mx-auto mt-2 mb-2 flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-14 px-4 text-white">
          <EventInfo
            events={currentEvents}
            onSwiper={(swiper) => (textSwiperRef.current = swiper)}
            onModalChange={setIsModalOpen}
          />

          <EventCategory
            categories={Object.keys(categories)}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>
      </div>
    </div>
  );
}
