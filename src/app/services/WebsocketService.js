import EventEmitter from "events";
import { STORAGE_KEYS, deleteItem, setItem } from "./StorageService";

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

    this.ws.onclose = (event) => {
      console.log("ws close event", event);
    };
  }

  async waitForConnected() {
    if (!this.ws) {
      throw "Websocket instance not found.";
    }

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.ws.readyState !== WebSocket.OPEN) {
          return;
        }

        clearInterval(interval);
        resolve();
      }, 100);
    });

    // Adding an additional sleep time of half a second, so the server
    // can warm up correctly.
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  handleInternalMessage(message) {
    let action;
    try {
      action = JSON.parse(message?.action);
    } catch (error) {
      console.log(
        "Error while parsing non-ui action",
        JSON.stringify(message, null, 4)
      );

      return;
    }

    switch (action.name) {
      case "store-blacklisted":
        const isWhitelisted = action?.args?.isWhitelisted;
        if (isWhitelisted) {
          deleteItem(STORAGE_KEYS.IS_BLACKLISTED_STORAGE);
        } else {
          setItem(STORAGE_KEYS.IS_BLACKLISTED_STORAGE, { blacklisted: true });
        }

        return;

      default:
        return;
    }
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

      if (decryptedMessage?.nonUI) {
        this.handleInternalMessage(decryptedMessage);

        return;
      }

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

  async sendActionResponse(response) {
    const encryptedMessage = JSON.stringify({
      timestamp: Date.now(),
      sender: "app",
      response: JSON.stringify(response),
    });

    this.ws.send(encryptedMessage);

    console.log("Action Response Sent");
  }

  async pushNonPrompts(action) {
    const encryptedMessage = JSON.stringify({
      timestamp: Date.now(),
      sender: "app",
      action: JSON.stringify(action),
      nonPrompt: true,
    });

    this.ws.send(encryptedMessage);

    console.log("Action Response Sent");
  }
}
