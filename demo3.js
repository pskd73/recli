const { terminal } = require("terminal-kit");
const {useState, useEffect, mount} = require("./index");

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);

  return {
    textbox: {
      text: `Count: ${count}`,
      logger: terminal.bgBlack.white,
      align: "left"
    }
  }
};

terminal.clear();
mount(App, {x: 1, y: 1, w: 10, h: 1});
