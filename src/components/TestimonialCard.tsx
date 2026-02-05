"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col w-[260px] border-l-4 border-primary cursor-pointer transition-all duration-300 ease-in-out ${
        isExpanded ? "h-auto min-h-[160px]" : "h-[160px]"
      }`}
    >
      <div className="flex-grow mb-3">
        <p
          className={`text-text italic leading-snug text-xs transition-all duration-300 ${
            isExpanded ? "" : "line-clamp-4"
          }`}
        >
          &ldquo;{testimonial.quote}&rdquo;
        </p>
        <span className="text-primary text-[10px] font-medium mt-1 inline-block">
          {isExpanded ? "Show less" : "Read more"}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-text text-xs">{testimonial.name}</p>
          <p className="text-text-secondary text-[10px]">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
