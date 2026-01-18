"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EventModal, type Event } from "./event-modal";
import "swiper/css";

interface EventInfoProps {
  events: Event[];
  onSwiper: (swiper: any) => void;
  onModalChange?: (isOpen: boolean) => void;
}

export default function EventInfo({ events, onSwiper, onModalChange }: EventInfoProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  useEffect(() => {
    onModalChange?.(!!selectedEvent);
  }, [selectedEvent, onModalChange]);

  return (
    <>
      <div className="h-[250px] md:h-[300px] w-full overflow-hidden">
        <Swiper
          direction="vertical"
          onSwiper={onSwiper}
          allowTouchMove={false}
          touchStartPreventDefault={false}
          slidesPerView={1}
          spaceBetween={20}
          speed={500}
          className="h-full"
        >
          {events.map((event, idx) => (
            <SwiperSlide key={idx} className="flex flex-col justify-center">
              <div className="flex flex-col items-start justify-center gap-4">
                <h1 className="text-2xl md:text-4xl font-calistoga font-bold uppercase tracking-wide text-white">
                  {event.name}
                </h1>
                <p className="text-lg xl font-inria leading-relaxed text-white/90 max-w-xl line-clamp-3">
                  {event.description}
                </p>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className=" px-6 py-2.5 rounded-lg bg-[#ffffff1a] hover:bg-[#ffffff2a] text-white font-semibold transition-colors cursor-pointer font-inria backdrop-blur-md"
                >
                  View Details
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <EventModal
        event={selectedEvent!}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
