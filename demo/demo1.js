const term = require("terminal-kit").terminal;
const { mount, Table, TableCell } = require("../index");

const Cell = ({ num }) => {
  return {
    textbox: {
      logger: num % 2 === 0 ? term.bgBlack.white : term.bgRed.white,
      text: `${num}`,
      align: "left"
    }
  };
};

const TextCell = ({ text, align }) => {
  return {
    textbox: {
      logger: term.bgGray.white,
      text,
      align
    }
  };
};


const App = () => {
  return {
    children: Table([
      [
        TableCell(
          TextCell, 
          {align: "left", text: "As that name suggests, the theory postulates the existence of dark matter – a mysterious substance that (according to the theorists) comprises the bulk of the matter in the Universe. It is widely embraced. Every cosmologist working today was educated in the Standard Model tradition, and virtually all of them take the existence of dark matter for granted. In the words of the Nobel Prize winner P J E Peebles: ‘The evidence for the dark matter of the hot Big Bang cosmology is about as good as it gets in natural science.’"},
          20, 10
        ),
        TableCell(Cell, {num: 8}, 5, 1),
      ],
      [
        TableCell(Cell, {num: 39}, 3, 2),
        TableCell(TextCell, {text: "hello world!", align: "right"}, 22, 2),
      ]
    ], 1, 1)
  }
};

term.clear();
mount(App, { nCells: 5 });
