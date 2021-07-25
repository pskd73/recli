const {useState, useEffect, Table, mount} = require("./index");
const WebSocketClient = require("websocket").client;
const term = require("terminal-kit").terminal;

const SOCKET_URL = "wss://socket.delta.exchange";

const useCryptoSocket = (symbols) => {
  const [data, setData] = useState({});
  const [connected, setConnected] = useState(null);

  useEffect(() => {
    if (!connected) {
      const client = new WebSocketClient();
      client.on("connect", (connection) => {
        setConnected(true);
        const tickers = {};
        connection.on("message", (message) => {
          const res = JSON.parse(message.utf8Data);
          if (res.type === "v2/ticker") {
            tickers[res.symbol] = res;
            setData(tickers);
          }
        });
        connection.sendUTF(JSON.stringify({
          type: "subscribe",
          payload: {
            channels: [
              {
                name: "v2/ticker",
                symbols
              }
            ]
          }
        }));
      });
      client.connect(SOCKET_URL);
    }
  }, []);

  return [data, connected];
};

const TextCell = ({ logger, text, align }) => {
  return {
    textbox: {
      logger,
      text,
      align
    }
  };
};

const HeaderCell = (name, align) => {
  return {component: TextCell, props: {logger: term.bgBlack.white, text: name, align: align || "right"}, w: 20, h: 1}
}

const TableCell = (value, align) => {
  return {component: TextCell, props: {logger: term.bgGray.white, text: `${value}`, align: align || "right"}, w: 20, h: 1}
}

const Crypto = () => {
  const [data, connected] = useCryptoSocket(["BTCUSDT", "BTCUSD", "ETHUSDT", "ETHUSD", "TOMOBTC", "AAVEUSDT", "XMRUSDT"]);

  const rows = [
    [
      {
        component: TextCell, 
        props: {
          logger: term.bgYellow.red.bold, 
          text: `Delta.exchange - ${SOCKET_URL}`, 
          align: "center"
        },
        w: 80,
        h: 1,
      }
    ],
    [HeaderCell("Symbol", "left"), HeaderCell("Close"), HeaderCell("High"), HeaderCell("Low")]
  ];
  if (data) {
    Object.keys(data).forEach((symbol) => {
      const ticker = data[symbol];
      rows.push([TableCell(ticker.symbol, "left"), TableCell(ticker.close), TableCell(ticker.high), TableCell(ticker.low)]);
    });
  }
  rows.push([
    {
      component: TextCell, 
      props: {
        logger: connected ? term.green.bold : term.yellow.bold, 
        text: `Socket status: ${connected ? 'Connected' : 'Not connected'}`, 
        align: "right"
      },
      w: 80,
      h: 1,
    }
  ]);

  return {
    children: Table(rows, (term.width / 2) - 40, (term.height / 2) - (rows.length / 2))
  }
};

term.clear();
mount(Crypto);
