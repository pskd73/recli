const { Row } = require("./row");

const Table = (rows, x, y) => {
  let rowRenders = [];
  let prevY = y;
  rows.forEach((row) => {
    const maxHeight = Math.max(...row.map((cell) => cell.h));
    rowRenders = [...rowRenders, ...Row(row, x, prevY)];
    prevY += maxHeight;
  });
  return rowRenders;
}

module.exports = {
  Table
};
