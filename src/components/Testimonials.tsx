"use client";

import { testimonials } from "@/lib/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  return (
    <section className="py-16 px-4 bg-background-alt">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-text text-center mb-3">
          Trusted by Growing Businesses
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-md mx-auto">
          See how companies are transforming their expense management with
          CashBook
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
