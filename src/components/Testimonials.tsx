"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { testimonials } from "@/lib/testimonials";
import { TestimonialCard } from "./TestimonialCard";

const CARD_WIDTH = 260;
const GAP = 16;
const AUTO_SCROLL_INTERVAL = 3000; // 3 seconds per card
const PAUSE_DURATION = 5000; // 5 seconds pause after interaction

export function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    if (scrollRef.current) {
      const scrollPosition = index * (CARD_WIDTH + GAP);
      scrollRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % testimonials.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused, scrollToIndex]);

  const handleInteractionStart = () => {
    setIsPaused(true);

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
  };

  const handleInteractionEnd = () => {
    // Resume auto-scroll after pause duration
    pauseTimeoutRef.current = setTimeout(() => {
      // Update current index based on scroll position
      if (scrollRef.current) {
        const scrollLeft = scrollRef.current.scrollLeft;
        const newIndex = Math.round(scrollLeft / (CARD_WIDTH + GAP));
        setCurrentIndex(Math.min(newIndex, testimonials.length - 1));
      }
      setIsPaused(false);
    }, PAUSE_DURATION);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, []);

  return (
    <section className="py-4 bg-background-alt overflow-visible">
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleInteractionEnd}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onMouseLeave={handleInteractionEnd}
      >
        <div className="flex gap-4 px-4 py-2 w-fit">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex-shrink-0 snap-center">
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              scrollToIndex(index);
              handleInteractionStart();
              handleInteractionEnd();
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-border hover:bg-text-secondary"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
