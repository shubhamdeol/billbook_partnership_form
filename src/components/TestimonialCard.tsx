"use client";

import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.08)] flex flex-col h-full min-w-[300px] md:min-w-0">
      <Quote className="w-8 h-8 text-primary-light mb-4 flex-shrink-0" />

      <p className="text-text italic leading-relaxed text-sm md:text-base flex-grow mb-6">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-3 mt-auto">
        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-text text-sm">{testimonial.name}</p>
          <p className="text-text-secondary text-xs">
            {testimonial.title}, {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
}
