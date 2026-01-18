"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface Event {
  name: string;
  description: string;
  posterurl: string;
  club?: string;
  rulebook?: string;
}

interface EventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 "
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full max-w-4xl flex flex-col items-end gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="w-full bg-[#ffffff1a] backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden max-h-[calc(100vh-10rem)] overflow-y-auto">
              <div className="flex flex-col">
                <div className="p-6 md:p-8 flex flex-col justify-center gap-6">
                  <h2 className="text-2xl md:text-3xl font-calistoga font-bold uppercase tracking-wide text-white">
                    {event.name}
                  </h2>

                  <p className="text-base md:text-lg font-inria leading-relaxed text-white/80">
                    {event.description}
                  </p>

                  <p className="text-sm md:text-base font-inria text-white/60">{event.club}</p>

                  <div className="flex items-center gap-4 mt-2">
                    {event.rulebook && (
                      <a
                        href={event.rulebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium transition-colors font-inria"
                      >
                        Rulebook
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
