import { describe, it, expect } from 'vitest';
import { FOCUS_SLIDES } from '../data/focusSlides';

describe('Focus Notes Carousel Requirements', () => {
  it('contains exactly 3 Figma slides with accurate content', () => {
    expect(FOCUS_SLIDES).toHaveLength(3);

    // Slide 1
    expect(FOCUS_SLIDES[0].slideNumber).toBe('01 / 03');
    expect(FOCUS_SLIDES[0].title).toBe('Make today count.');
    expect(FOCUS_SLIDES[0].subtitle).toBe('A little focus goes a long way.');
    expect(FOCUS_SLIDES[0].cardBadge).toBe('NEXT UP');
    expect(FOCUS_SLIDES[0].cardTitle).toBe('Design landing page');
    expect(FOCUS_SLIDES[0].cardProgress).toBe(62);

    // Slide 2
    expect(FOCUS_SLIDES[1].slideNumber).toBe('02 / 03');
    expect(FOCUS_SLIDES[1].title).toBe('Small steps, big progress.');
    expect(FOCUS_SLIDES[1].subtitle).toBe('Keep your priorities in view.');
    expect(FOCUS_SLIDES[1].cardBadge).toBe('IN PROGRESS');
    expect(FOCUS_SLIDES[1].cardTitle).toBe('Fix navigation');
    expect(FOCUS_SLIDES[1].cardProgress).toBe(67);

    // Slide 3
    expect(FOCUS_SLIDES[2].slideNumber).toBe('03 / 03');
    expect(FOCUS_SLIDES[2].title).toBe('Celebrate the wins.');
    expect(FOCUS_SLIDES[2].subtitle).toBe('Every completed task moves you forward.');
    expect(FOCUS_SLIDES[2].cardBadge).toBe('COMPLETED');
    expect(FOCUS_SLIDES[2].cardTitle).toBe('Onboarding copy');
    expect(FOCUS_SLIDES[2].cardProgress).toBe(100);
  });
});
