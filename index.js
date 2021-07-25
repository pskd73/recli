const { useState, useEffect, mount } = require("./hooks");
const { TextBox } = require("./textbox");
const term = require("terminal-kit").terminal;

const Time = () => {
  const [time, setTime] = useState(new Date().toISOString());

  useEffect(() => {
    setInterval(() => setTime(new Date().toISOString()), 1000);
  }, []);

  return ({
    render() {
      const t = TextBox({
        logger: term.yellow.bold.bgRed,
        text: time,
        x: 0,
        y: 0,
        w: 30,
        h: 1,
        align: "left",
      });
      t.render();
    }
  });
}

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => setCount(count + 1), 1000);
  }, [count])

  return ({
    render() {
      const t = TextBox({
        logger: term.white.bold.bgGray,
        text: `${count}`,
        x: 31,
        y: 0,
        w: 30,
        h: 1,
        align: "right",
      });
      t.render();
    }
  });
}

term.clear();
const time = mount(Time);
const counter = mount(Counter);
