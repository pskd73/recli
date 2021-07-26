const term = require("terminal-kit").terminal;

const Box = (x, y, w, h) => {
  let prevY = y;

  return {
    printLn(text, logger) {
      if (prevY - y < h) {
        const logger_ = logger || term;
        term.moveTo(x, prevY);
        logger_(text);
        prevY++;
      }
    }
  }
};

const YesOrNo = ({text, onYes, onNo, logger, x, y, w, h}) => {
  return {
    render() {
      const box = Box(x, y, w, h);
      box.printLn(text, logger);
      term.yesOrNo({yes: [ "y" , "ENTER" ] , no: [ "n" ]} , (error , result) => {
        if (result) {
          onYes();
        } else {
          onNo();
        }
      });
    }
  }
};

const InputTextField = ({text, logger, history, autoComplete, onSubmit, x, y, w, h}) => {
  return {
    render() {
      const box = Box(x, y, w, h);
      box.printLn(text, logger);

      term.inputField(
        {history, autoComplete, autoCompleteMenu: !!autoComplete} ,
        (error, input) => {
          onSubmit(error, input);
          process.exit() ;
        }
      );
    }
  }
};

module.exports = {
  YesOrNo,
  InputTextField,
};
