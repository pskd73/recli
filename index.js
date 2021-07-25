const { useState, useEffect, mount } = require("./hooks");
const term = require("terminal-kit").terminal;

const Time = () => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    setInterval(() => setTime(new Date().toISOString()), 1000);
  }, []);

  return ({
    textbox: {
      logger: term.yellow.bold.bgRed,
      text: time,
      x: 0,
      y: 0,
      w: 30,
      h: 1,
      align: "left",
    }
  });
}

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count])

  return ({
    textbox: {
      logger: term.white.bold.bgGray,
      text: `${count}`,
      x: 31,
      y: 0,
      w: 30,
      h: 1,
      align: "right",
    }
  });
}

term.clear();
const time = mount(Time);
const counter = mount(Counter);
