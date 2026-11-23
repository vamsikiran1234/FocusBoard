import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { FOCUS_SLIDES } from '../data/focusSlides';

export const FocusCarousel: React.FC = () => {
  const { activeSlideIndex, currentSlide, nextSlide, prevSlide, setSlide } = useTasks();

  return (
    <section
      className="w-full relative rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#5347E8] via-[#5A4EF0] to-[#6355F4] text-white p-6 md:p-8 overflow-hidden shadow-lg shadow-brand-500/15"
      aria-label="Focus Notes Carousel"
    >
      {/* Decorative gradient accents */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-52 h-52 rounded-full bg-white/5 blur-xl pointer-events-none" />

      {/* Desktop & Tablet Layout */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left Side: Content & Indicators */}
        <div className="flex-1 max-w-xl">
          {/* Slide Category & Index Badge */}
          <div className="flex items-center gap-3 text-xs font-semibold tracking-wider text-white/70 uppercase mb-3">
            <span>{currentSlide.badge}</span>
            <span className="text-white/40">•</span>
            <span>{currentSlide.slideNumber}</span>
          </div>

          {/* Slide Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2 text-white">
            {currentSlide.title}
          </h2>

          {/* Slide Subtitle */}
          <p className="text-sm sm:text-base text-white/80 font-normal mb-8 leading-relaxed">
            {currentSlide.subtitle}
          </p>

          {/* Carousel Slide Indicators */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Focus Notes Slide Selector"
          >
            {FOCUS_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/80 ${
                    isActive ? 'w-8 bg-white' : 'w-6 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.title}`}
                  aria-selected={isActive}
                  role="tab"
                />
              );
            })}
          </div>
        </div>

        {/* Right Side: Tilted Card Preview + Arrow Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 self-center md:self-auto">
          {/* Floating Figma-like Task Card Preview */}
          <div className="relative group">
            {/* Background shadow layer tilted */}
            <div className="absolute inset-0 bg-white/15 rounded-2xl transform rotate-3 translate-x-2 translate-y-1 transition-transform group-hover:rotate-4" />

            {/* Foreground white card */}
            <div className="relative bg-white text-slate-900 rounded-2xl p-4 sm:p-5 w-60 sm:w-64 shadow-xl transform -rotate-1 transition-transform group-hover:rotate-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {currentSlide.cardBadge}
                </span>
              </div>

              <div className="text-sm font-bold text-slate-900 truncate mb-3">
                {currentSlide.cardTitle}
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-brand-50 overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full transition-all duration-500"
                    style={{ width: `${currentSlide.cardProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-brand-600">
                  {currentSlide.cardProgress}%
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-brand-600 shadow-md flex items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
