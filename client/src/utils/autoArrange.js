const PADDING = 20;
const GRID = 20;

const snap = (v) => Math.round(v / GRID) * GRID;

/**
 * Places items row by row within room bounds.
 * Returns a new array with updated x, y values.
 */
export const autoArrange = (items, room = { x: 50, y: 50, width: 700, height: 500 }) => {
  const arranged = [];
  let curX = room.x + PADDING;
  let curY = room.y + PADDING;
  let rowHeight = 0;

  for (const item of items) {
    if (curX + item.w > room.x + room.width - PADDING) {
      curX = room.x + PADDING;
      curY += rowHeight + PADDING;
      rowHeight = 0;
    }
    arranged.push({ ...item, x: snap(curX), y: snap(curY) });
    curX += item.w + PADDING;
    rowHeight = Math.max(rowHeight, item.h);
  }

  return arranged;
};
