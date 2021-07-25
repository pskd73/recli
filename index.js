const { useState, mount } = require("./hooks");
const { TextBox } = require("./textbox");
const term = require("terminal-kit").terminal;

const Time = () => {
  const [time, setTime] = useState("");

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
    },
    time(t) {
      setTime(t);
    }
  });
}

const Counter = () => {
  const [count, setCount] = useState(0);

  return ({
    render() {
      const t = TextBox({
        logger: term.yellow.bold.bgGray,
        text: `${count}`,
        x: 31,
        y: 0,
        w: 30,
        h: 1,
        align: "right",
      });
      t.render();
    },
    count(c) {
      setCount(c);
    }
  });
}

term.clear();
const time = mount(Time);
const counter = mount(Counter);

let c = 0;

setInterval(() => {
  c++;
  time.time(new Date().toISOString());
  counter.count(c);
}, 1000);
