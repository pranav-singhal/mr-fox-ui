import {
  Protocols,
  createDecoder,
  createEncoder,
  createLightNode,
  waitForRemotePeer,
} from "@waku/sdk";
import protobuf from "protobufjs";
import EventEmitter from "events";
import _ from 'lodash'; 

let node;


export type ActionResponeType = {
  name: string,
  output: string
}
// Create a message structure using Protobuf
const ChatMessage = new protobuf.Type("ChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("sender", 2, "string"))
  .add(new protobuf.Field("prompt", 3, "string"))
  .add(new protobuf.Field("action", 4, "string"))
  .add(new protobuf.Field("response", 5, "string"))

  // Action will be in the following format:
  // {
  //   name: 'get_user_address',
  //   args: {},
  //   response_event: 'user_address_found' // to be sent 
  // }

  // Reponse will be in the following format:
  // {
  //   name: 'user_address_found',
  //   output: JSON.stringify({address: '0xabcd...'})
  // }

const WAKU_MESSAGE_SENDERS = {
  APP: "app",
  SERVER: "server",
};

export const waitForNodeInitialisation = async () => {
  node = await createLightNode({ defaultBootstrap: true });
  await node.start();

  // Wait for peer connections with specific protocols
  await waitForRemotePeer(node, [
    Protocols.LightPush,
    Protocols.Filter
  ]);

  console.log("Node Acquired Successfully");
};

export const MESSAGE_RECEIVED = "message-received";

const descryptMessage = (message, shouldRemoveServerMessages = true) => {
  // Check if there is a payload on the message
  if (!message.payload) return null;

  // Render the messageObj as desired in your application
  const decryptedMessage = ChatMessage.decode(message.payload);

  // IF sender of the message is server itself, we can simply ignore it.
  if (shouldRemoveServerMessages && decryptedMessage.sender === WAKU_MESSAGE_SENDERS.APP) return null;

  return decryptedMessage;
};
export default class WakuService extends EventEmitter {
  contentTopic = null;
  encoder = null;
  decoder = null;

  constructor(_contentTopic) {
    super();
    this.contentTopic = _contentTopic;
    this.decoder = createDecoder(this.contentTopic);
    this.encoder = createEncoder({ contentTopic: this.contentTopic });
  }

  async startWatchingForNewMessages() {
    // Create a filter subscription
    const subscription = await node?.filter?.createSubscription();
    const self = this;

    console.log("Now watching for new messages on:", this.contentTopic);

    // Subscribe to content topics and process new messages
    await subscription.subscribe([this.decoder], (msg) => {
      const decryptedMessage = descryptMessage(msg);

      // IF message does not exist, we can just skip the next step
      if (!decryptedMessage) {
        return;
      }

      console.log("Received new valid message on:", this.contentTopic);

      self.emit(MESSAGE_RECEIVED, decryptedMessage);
    });
  }

  async pushMessage(message) {
    // Create a new message object
    const protoMessage = ChatMessage.create({
      timestamp: Date.now(),
      sender: WAKU_MESSAGE_SENDERS.APP,
      prompt: message,
    });

    // Serialise the message using Protobuf
    const serialisedMessage = ChatMessage.encode(protoMessage).finish();

    // Send the message using Light Push
    await node.lightPush.send(this.encoder, {
      payload: serialisedMessage,
    });

    console.log("Message Pushed via Waku to content topic:", this.contentTopic);
  }

  async pushAction(action) {
    const protoMessage = ChatMessage.create({
      timestamp: Date.now(),
      sender: WAKU_MESSAGE_SENDERS.APP,
      action: JSON.stringify(action),
    });

    // Serialise the message using Protobuf
    const serialisedMessage = ChatMessage.encode(protoMessage).finish();

    // Send the message using Light Push
    await node.lightPush.send(this.encoder, {
      payload: serialisedMessage,
    });

    console.log("Action Pushed via Waku to content topic:", this.contentTopic);
  }

  async sendActionResopnse(response: ActionResponeType): Promise<void> {
      const protoMessage = ChatMessage.create({
      timestamp: Date.now(),
      sender: "app",
      response: JSON.stringify(response),
    });
    // Serialise the message using Protobuf
    const serialisedMessage = ChatMessage.encode(protoMessage).finish();

    // Send the message using Light Push
    await node.lightPush.send(this.encoder, {
      payload: serialisedMessage,
    });

    console.log("Message Sent");
  }
}

// window.sendAddress = async (address) => {
//   // Create a new message object
//   const protoMessage = ChatMessage.create({
//     timestamp: Date.now(),
//     sender: "app",
//     response: JSON.stringify({
//       name: "user_address_found",
//       output: { address: "0x122A832758d0F72BE72025b6694A11643052bE34" },
//     }),
//   });

//   // Serialise the message using Protobuf
//   const serialisedMessage = ChatMessage.encode(protoMessage).finish();

//   // Send the message using Light Push
//   await node.lightPush.send(encoder, {
//     payload: serialisedMessage,
//   });

//   console.log("Message Sent");
// };
