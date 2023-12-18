"use client";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

import { Input, Space } from "antd";
import styles from "./page.module.css";
import { Card, List } from "../../node_modules/antd/es/index";
import Message from "./components/Message.tsx";
import ProviderTree from "./components/ProviderTree.tsx";
import WebsocketService, { MESSAGE_RECEIVED } from "./services/WebsocketService";

const { Search } = Input;

const INITIAL_MESSAGE = `Welcome to the world of **Web3** assistance! I'm **Mr. Fox**, here to help you with a variety of on-chain transactions. Here's a succinct introduction to what I can do for you:

- **Retrieve Token Information**: I can find details for cryptocurrencies, such as contract addresses.
- **Swap Tokens**: I'll assist in exchanging one token for another and provide swap quotes.
- **Check Balances**: I can verify your token balances on supported blockchains.
- **Wallet Address Retrieval**: If you need it, I can fetch your wallet address.
- **Token Approvals**: I can help obtain necessary permissions for your tokens.

Here are some sample prompts to get us started:

- "Get me the contract address for **DAI on Ethereum**."
- "I want to **swap 50 LINK for ETH**."
- "Can you **check my WMATIC balance on Polygon**?"
- "What's **my wallet address**?"
- "I need to **approve a token for swapping**."

Whenever you're ready, just let me know how I can assist you!`;

export type MessageType = {
  id: number;
  type: string; // user | agent
  createdAt: number; // timestamp
  prompt?: string;

  // sample action: "{"name":"get_user_address","args":{},"response_event":"user_address_found"}"
  action?: any;
};

const prompts = [
  "Who are you?",
  "How much DAI do I have?",
  "Swap WMATIC to WMATIC",
  "What is my addresss",
];
export default function Home() {
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const refValue = useRef(messages);
  const [isInitialising, setIsInitialising] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [isRespondingToPrompt, setIsRespondingToPrompt] =
    useState<boolean>(false);
  const [websocketInstance, setWebsocketInstance] = useState<WebsocketService>();

  const init = async () => {

    // create waku-service instance
    let websocketService: WebsocketService = new WebsocketService();
    
    await websocketService.startWatchingForNewMessages();

    setWebsocketInstance(websocketService);

    websocketService.on(MESSAGE_RECEIVED, (event) => {
      setIsRespondingToPrompt(false);
      console.log("message from server: ", event, messages);

      setMessages([
        ...refValue.current,
        {
          type: "system",
          id: Date.now(),
          createdAt: Date.now(),
          prompt: event?.prompt,
          action: event?.action,
        },
      ]);
      refValue.current = [
        ...refValue.current,
        {
          type: "system",
          id: Date.now(),
          createdAt: Date.now(),
          prompt: event?.prompt,
          action: event?.action,
        },
      ];
    });
    setIsInitialising(false);

    setMessages([
      {
        type: "system",
        id: Date.now(),
        createdAt: Date.now(),
        prompt: INITIAL_MESSAGE,
      },
    ]);

    refValue.current = [
      {
        type: "system",
        id: Date.now(),
        createdAt: Date.now(),
        prompt: INITIAL_MESSAGE,
      },
    ];
  };
  useEffect(() => {
    console.log("i was called");
    init();

    return () => {
      // websocketInstance?.sendActionResopnse({ name: "delete-thread", output: "" });
    };
  }, []);

  const handleClick = async () => {
    if (inputMessage.length === 0) {
      return;
    }

    await handlePrompt(inputMessage);

    setInputMessage("");
  };

  const handlePrompt = async (prompt: string) => {
    // only call if no prompt is queued
    if (!isRespondingToPrompt) {
      setIsRespondingToPrompt(true);

      refValue.current = [
        ...messages,
        { id: Date.now(), type: "user", createdAt: Date.now(), prompt },
      ];
      setMessages([
        ...messages,
        { id: Date.now(), type: "user", createdAt: Date.now(), prompt },
      ]);
      await websocketInstance?.pushMessage(prompt);
    }
  };

  return (
    <ProviderTree>
      <main className={styles.main}>
        <div className={styles.chat}>
          <List
            style={{
              height: "80vh",
              overflow: "scroll",
              padding: "32px",
              borderBottom: "solid 0.5px rgb(37 35 35 / 42%)",
            }}
          >
            {messages.map((_message: MessageType) => {
              return (
                <Message
                  wakuInstance={websocketInstance}
                  message={_message}
                  key={_message.id}
                  setIsRespondingToPrompt={setIsRespondingToPrompt}
                />
              );
            })}
            {isRespondingToPrompt && (
              <Message
                wakuInstance={websocketInstance}
                loading
                message={{ type: "fox" }}
              />
            )}
          </List>
        </div>

        <footer
          style={{
            width: "100%",
            position: "absolute",
            bottom: "12px",
            padding: "24px",
          }}
        >
          <List
            grid={{
              gutter: 16,
              xs: 4,
              sm: 4,
              md: 4,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            dataSource={prompts}
            renderItem={(prompt: string) => (
              <List.Item>
                <Card
                  onClick={() => handlePrompt(prompt)}
                  style={Object.assign(
                    {},
                    {
                      cursor: "pointer",
                      border: "solid 0.5px rgb(37 35 35 / 42%)",
                    },
                    (isInitialising || isRespondingToPrompt) && {
                      color: "rgba(0, 0, 0, 0.25)",
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    }
                  )}
                >
                  {prompt}
                </Card>
              </List.Item>
            )}
          />
          <Space.Compact style={{ width: "100%" }}>
            <Search
              placeholder="What is on your mind today?"
              enterButton="Ask Mr. Fox"
              size="large"
              disabled={isInitialising || isRespondingToPrompt}
              value={inputMessage}
              loading={isRespondingToPrompt}
              onChange={(e) => setInputMessage(e.target.value)}
              onSearch={handleClick}
            />
          </Space.Compact>
        </footer>
      </main>
    </ProviderTree>
  );
}
