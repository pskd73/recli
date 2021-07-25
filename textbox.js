const { wrapText } = require("./wrap");
const term = require("terminal-kit").terminal;

const draw = (lines) => {
  lines.forEach((line) => {
    const {x, y, text, logger} = line;
    term.moveTo(x, y);
    logger(text)
  });
};

const TextBox = ({logger, text, x, y, w, h, align, extra}) => {
  let opts = {logger, text, x, y, w, h, align, extra};
  
  return {
    render: () => {
      const {logger, text, x, y, w, h, align} = opts
      lines = wrapText(text, w, h, align);
      lines = lines.map((line, i) => ({x, y: y + i, text: line, logger}))
      draw(lines)
    },
    update: (args) => {
      opts = {...opts, ...args};
    },
    opts: () => opts,
  }
};

module.exports = {
  TextBox
};
