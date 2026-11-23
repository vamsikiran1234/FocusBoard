import React from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useTasks } from '../context/TaskContext';
import { FOCUS_SLIDES } from '../data/focusSlides';

export const FocusCarousel: React.FC = () => {
  const { activeSlideIndex, currentSlide, nextSlide, prevSlide, setSlide } = useTasks();

  return (
    <section
      className="w-full relative rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#5347E8] via-[#5A4EF0] to-[#6355F4] text-white p-5 sm:p-7 md:p-8 overflow-hidden shadow-lg shadow-brand-500/15"
      aria-label="Focus Notes Carousel"
    >
      {/* Decorative gradient accents */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-16 w-52 h-52 rounded-full bg-white/5 blur-xl pointer-events-none" />

      {/* Mobile Layout (Exact Figma 390px banner) */}
      <div className="relative z-10 sm:hidden flex flex-col">
        <div className="text-[11px] font-bold uppercase tracking-wider text-white/70 mb-1.5">
          {currentSlide.mobileGreeting || 'GOOD AFTERNOON'}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white mb-1.5">
          {currentSlide.title.replace('.', '')}
        </h2>
        <p className="text-xs text-white/80 font-normal mb-4">
          {currentSlide.mobileSubtitle || '3 tasks waiting for your attention.'}
        </p>

        {/* Mobile Horizontal Progress Bar Row */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${currentSlide.cardProgress}%` }}
            />
          </div>
          <span className="text-xs font-bold text-white tracking-tight">
            {currentSlide.cardProgress}%
          </span>
        </div>
      </div>

      {/* Desktop & Tablet Layout (Full 3-Slide Carousel with Tilted Cards & Arrows) */}
      <div className="relative z-10 hidden sm:flex flex-col md:flex-row md:items-center justify-between gap-6">
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
            className="flex items-center gap-2.5"
            role="tablist"
            aria-label="Focus Notes Slide Selector"
          >
            {FOCUS_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setSlide(idx)}
                  className={`h-[3px] w-10 sm:w-11 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-white/80 cursor-pointer ${
                    isActive ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
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
            {/* Background card: Left is DOWN, Right is UP */}
            <div className="absolute inset-0 bg-white/20 rounded-2xl transform -rotate-[2.5deg] -translate-x-3 translate-y-2 scale-[1.03] transition-transform duration-300 pointer-events-none" />

            {/* Foreground white card: Left is UP, Right is DOWN */}
            <div className="relative bg-white text-slate-900 rounded-2xl p-5 w-64 sm:w-72 shadow-xl transform rotate-[2.5deg] transition-transform duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  {currentSlide.cardBadge}
                </span>
              </div>

              <div className="text-[15px] sm:text-base font-bold text-slate-900 truncate mb-3">
                {currentSlide.cardTitle}
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-brand-50 overflow-hidden">
                  <div
                    className="h-full bg-[#6457F5] rounded-full transition-all duration-500"
                    style={{ width: `${currentSlide.cardProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-[#6457F5]">
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
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 active:scale-95 text-white flex items-center justify-center transition-all duration-200 backdrop-blur-sm cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 active:scale-95 text-brand-600 shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
