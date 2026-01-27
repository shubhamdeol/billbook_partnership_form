"use client";

import { testimonials } from "@/lib/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  return (
    <section className="py-8 md:py-12 px-4 bg-background-alt">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-xl md:text-2xl font-bold text-text text-center mb-2">
          Trusted by Growing Businesses
        </h2>
        <p className="text-sm md:text-base text-text-secondary text-center mb-6 max-w-md mx-auto">
          See how companies are transforming their expense management
        </p>

        {/* Mobile: Horizontal scroll with snap points for smooth swiping */}
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
          <div className="flex gap-4">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="snap-center flex-shrink-0">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: 2-column grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
