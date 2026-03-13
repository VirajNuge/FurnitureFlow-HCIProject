const PADDING = 20;
const GRID = 20;

const snap = (v) => Math.round(v / GRID) * GRID;

/**
 * Places items row by row within room bounds.
 * Returns a new array with updated x, y values.
 */
export const autoArrange = (items, room = { x: 0, y: 0, width: 700, depth: 500 }) => {
  const arranged = [];
  let curX = (room.x ?? 0) + PADDING;
  let curY = (room.y ?? 0) + PADDING;
  let rowHeight = 0;

  const roomRight = (room.x ?? 0) + room.width - PADDING;
  const roomW = item => item.width ?? 80;
  const roomH = item => item.height ?? 80;

  for (const item of items) {
    const iw = roomW(item);
    const ih = roomH(item);

    if (curX + iw > roomRight) {
      curX = (room.x ?? 0) + PADDING;
      curY += rowHeight + PADDING;
      rowHeight = 0;
    }
    arranged.push({ ...item, x: snap(curX), y: snap(curY) });
    curX += iw + PADDING;
    rowHeight = Math.max(rowHeight, ih);
  }

  return arranged;
};
