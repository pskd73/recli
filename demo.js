const term = require("terminal-kit").terminal;
const { mount } = require("./hooks");
const { Row } = require("./row");

const Cell = ({ num }) => {
  return {
    textbox: {
      logger: num % 2 === 0 ? term.bgBlack.white : term.bgRed.white,
      text: `${num}`,
      align: "left"
    }
  };
};

const App = ({ nCells }) => {
  const cells = [];
  for (let i = 0; i < nCells; i++) {
    cells.push({
      component: Cell,
      w: 10,
      h: 1,
      props: {num: i}
    });
  }

  return {
    children: Row(cells, 1, 1),
  }
};

mount(App, { nCells: 5 });
