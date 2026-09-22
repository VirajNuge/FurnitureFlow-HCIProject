import { describe, expect, it } from 'vitest';
import { autoArrange } from './autoArrange';

describe('autoArrange', () => {
  it('places furniture inside the room using depth as the floor-plan axis', () => {
    const result = autoArrange([{ id: 'chair', width: 50, depth: 40 }], { width: 200, depth: 200 });
    expect(result.overflow).toBe(0);
    expect(result.items[0].x).toBeGreaterThanOrEqual(0);
    expect(result.items[0].y).toBeGreaterThanOrEqual(0);
  });

  it('reports furniture that cannot fit', () => {
    const result = autoArrange([{ id: 'sofa', width: 500, depth: 400 }], { width: 200, depth: 200 });
    expect(result.overflow).toBe(1);
  });
});
