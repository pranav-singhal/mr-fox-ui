import EventEmitter from "events";

export const MESSAGE_RECEIVED = "message-received";

const WAKU_MESSAGE_SENDERS = {
  APP: "app",
  SERVER: "server",
};

const descryptMessage = (message) => {
  let decryptedMessage;
  try {
    decryptedMessage = JSON.parse(message);
  } catch (error) {
    console.log("Error while parsing the message", error);

    return null;
  }

  // IF sender of the message is server itself, we can simply ignore it.
  if (decryptedMessage.sender === WAKU_MESSAGE_SENDERS.APP) return null;

  return decryptedMessage;
};

export default class WebsocketService extends EventEmitter {
  ws = null;

  constructor() {
    super();

    this.ws = new WebSocket("wss://api.mrfox.xyz");
  }

  async startWatchingForNewMessages() {
    const self = this;

    this.ws.onmessage = (msg) => {
      const decryptedMessage = descryptMessage(msg.data);

      // IF message does not exist, we can just skip
      if (!decryptedMessage) {
        return;
      }

      console.log("Message Received using WebSockets");

      self.emit(MESSAGE_RECEIVED, decryptedMessage);
    };
  }

  async pushMessage(message) {
    const encryptedMessage = JSON.stringify({
      timestamp: Date.now(),
      sender: WAKU_MESSAGE_SENDERS.APP,
      prompt: message,
    });

    this.ws.send(encryptedMessage);

    console.log("Message Pushed via Websockets");
  }

  async sendActionResopnse(response) {
    const encryptedMessage = JSON.stringify({
      timestamp: Date.now(),
      sender: "app",
      response: JSON.stringify(response),
    });

    this.ws.send(encryptedMessage);

    console.log("Action Response Sent");
  }
}
