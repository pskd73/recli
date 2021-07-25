const {useState, useJsonState, useEffect, Table, TableCell, mount} = require("./index");
const WebSocketClient = require("websocket").client;
const term = require("terminal-kit").terminal;

const SOCKET_URL = "wss://socket.delta.exchange";

const useCryptoSocket = (symbols) => {
  const [data, rawData, setData] = useJsonState({});
  const [connected, setConnected] = useState(null);
  const [updates, setUpdates] = useState(0);
  const [lastRecvdTime, setLastRecvdTime] = useState(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    setUpdates(updates + 1);
    setLastRecvdTime(new Date().getTime());
  }, [rawData]);

  return [data, connected, updates, lastRecvdTime];
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
  return TableCell(
    TextCell, 
    {logger: term.bgBlack.white, text: name, align: align || "right"},
    20, 1
  );
}

const CryptoTableCell = (value, align) => {
  return TableCell(
    TextCell,
    {logger: term.bgGray.white, text: `${value}`, align: align || "right"},
    20, 1
  );
}

const Crypto = () => {
  const [data, connected, updates, lastRecvdTime] = useCryptoSocket(["BTCUSDT", "BTCUSD", "ETHUSDT", "ETHUSD", "TOMOBTC", "AAVEUSDT", "XMRUSDT"]);

  const rows = [
    [TableCell(TextCell, {logger: term.bgYellow.red.bold, text: `Delta.exchange - ${SOCKET_URL}`, align: "center"}, 80, 1)],
    [HeaderCell("Symbol", "left"), HeaderCell("Close"), HeaderCell("High"), HeaderCell("Low")]
  ];
  if (data) {
    Object.keys(data).forEach((symbol) => {
      const ticker = data[symbol];
      rows.push([
        CryptoTableCell(ticker.symbol, "left"), 
        CryptoTableCell(ticker.close), 
        CryptoTableCell(ticker.high), 
        CryptoTableCell(ticker.low)
      ]);
    });
  }
  rows.push([
    TableCell(
      TextCell,
      {
        logger: connected ? term.green.bold : term.yellow.bold, 
        text: `📡 ${connected ? 'Connected' : 'Not connected'} | ` +
          `📮 ${updates} | ` +
          `📩 ${lastRecvdTime ? new Date(lastRecvdTime).toUTCString() : null}`, 
        align: "center"
      },
      80, 1
    )
  ]);

  return {
    children: Table(rows, (term.width / 2) - 40, (term.height / 2) - (rows.length / 2))
  }
};

term.clear();
mount(Crypto);
