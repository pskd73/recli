const { Table, TableCell, useState, useEffect, mount } = require("./index");
const term = require("terminal-kit").terminal;

const getAge = (d) => {
  const diff = new Date().getTime() - d.getTime();
  return (diff / 31536000000).toFixed(10);
}

const OddEven = ({ number }) => {
  const isEven = number % 2 === 0;

  return {
    textbox: {
      logger: isEven ? term.bgGreen.white.bold : term.bgRed.white.bold,
      text: isEven ? "Even" : "Odd",
      align: "right",
    }
  };
};

const DOB = ({ date }) => {
  const [age, setAge] = useState(getAge(date));

  useEffect(() => {
    setInterval(() => setAge(getAge(date)), 10);
  }, []);

  return {
    textbox: {
      logger: term.bgBlack.bold.white,
      text: `${age}`,
      align: "center"
    }
  };
}

const Count = ({ count }) => {
  return ({
    textbox: {
      logger: term.white.bold.bgGray,
      text: `${count}`,
      align: "left",
    }
  });
}

const App = () => {
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

  return {
    children: Table([
      [
        TableCell(Count, {count}, 10, 1),
        TableCell(OddEven, {number: count}, 10, 1)
      ],
      [
        TableCell(DOB, {date: new Date(1993, 7, 23)}, 20, 1),
      ]
    ], x, y)
  }
}

term.clear();
mount(App);
