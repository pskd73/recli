const { terminal } = require("terminal-kit");
const {useState, useEffect, mount} = require("./index");

const App = () => {
  const [count, setCount] = useState(0);
  const [oddEven, setOddEven] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);


  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);

  useEffect(() => {
    setOddEven(count % 2 === 0);
    setUpdatedAt(new Date().toTimeString());
  }, [count]);

  return {
    textbox: {
      text: `Count: ${count} | OddEven: ${oddEven} | UpdatedAt: ${updatedAt}`,
      logger: terminal.bgBlack.white,
      align: "center"
    },
  }
};

terminal.clear();
mount(App, {
  x: (terminal.width / 2) - 35, 
  y: (terminal.height / 2) , 
  w: 70, h: 1
});
