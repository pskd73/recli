const { useState, useEffect, mount } = require("./hooks");
const term = require("terminal-kit").terminal;

const OddEven = ({ number, x, y, w, h }) => {
  const isEven = number % 2 === 0;

  return {
    textbox: {
      logger: isEven ? term.bgGreen.white.bold : term.bgRed.white.bold,
      text: isEven ? "Even" : "Odd",
      x, y, w, h,
      align: "right",
    }
  };
};

const Counter = () => {
  const [count, setCount] = useState(0);
  const [windowPos, setWindowPos] = useState({w: term.width, h: term.height});

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count]);

  useEffect(() => {
    let timer = null;

    term.addListener("resize", (w, h) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        term.clear()
        setWindowPos({w, h});
      }, 1000);
    });
  }, []);

  const w = 10, h = 1;
  const x = (windowPos.w / 2) - w;
  const y = windowPos.h / 2;

  return ({
    textbox: {
      logger: term.white.bold.bgGray,
      text: `${count}`,
      x, y, w, h,
      align: "left",
    },
    children: [
      {
        component: OddEven,
        props: { number: count, x: x + w, y, w, h}
      }
    ]
  });
}

term.clear();
mount(Counter);
