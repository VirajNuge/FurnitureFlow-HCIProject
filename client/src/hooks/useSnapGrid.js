import { useCallback } from 'react';

const DEFAULT_GRID = 20;

/**
 * Returns a snap function that rounds a position to the nearest grid cell.
 * @param {number} gridSize - Cell size in pixels (default 20)
 */
const useSnapGrid = (gridSize = DEFAULT_GRID) => {
  const snap = useCallback(
    (value) => Math.round(value / gridSize) * gridSize,
    [gridSize]
  );

  const snapPoint = useCallback(
    ({ x, y }) => ({ x: snap(x), y: snap(y) }),
    [snap]
  );

  const snapRect = useCallback(
    ({ x, y, width, height }) => ({
      x: snap(x),
      y: snap(y),
      width: Math.max(gridSize, snap(width)),
      height: Math.max(gridSize, snap(height)),
    }),
    [snap, gridSize]
  );

  return { snap, snapPoint, snapRect, gridSize };
};

export default useSnapGrid;
