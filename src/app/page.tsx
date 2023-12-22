"use client";
import { useEffect, useState, useRef } from "react";

import Message from "./components/Message";
import ProviderTree from "./components/ProviderTree";
import WebsocketService, {
  MESSAGE_RECEIVED,
} from "./services/WebsocketService";
import LoadingIndicator from "./components/LoadingIndicator";
import classnames from "classnames";

const INITIAL_MESSAGE = `Welcome to the world of **Web3** assistance! I'm **Mr. Fox**, here to help you with a variety of on-chain transactions. Here's a succinct introduction to what I can do for you:

- **Retrieve Token Information**: I can find details for cryptocurrencies, such as contract addresses.
- **Swap Tokens**: I'll assist in exchanging one token for another and provide swap quotes.
- **Check Balances**: I can verify your token balances on supported blockchains.
- **Wallet Address Retrieval**: If you need it, I can fetch your wallet address.
- **Token Approvals**: I can help obtain necessary permissions for your tokens.

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
  "Get my DAI Balance?",
  "Swap WMATIC to DAI",
  "What is my addresss?",
];
export default function Home() {
  const [messages, setMessages] = useState<Array<MessageType>>([]);
  const refValue = useRef(messages);
  const [isInitialising, setIsInitialising] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [isRespondingToPrompt, setIsRespondingToPrompt] =
    useState<boolean>(false);
  const [websocketInstance, setWebsocketInstance] =
    useState<WebsocketService>();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    init();
  }, []);

  const handleClick = async () => {
    if (inputMessage.length === 0) {
      return;
    }

    await handlePrompt(inputMessage);

    setInputMessage("");
  };

  const handlePrompt = async (prompt: string) => {
    if (isRespondingToPrompt || isInitialising) {
      return;
    }

    // only call if no prompt is queued
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
  };

  return (
    <ProviderTree>
      <div className="flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
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
          <div ref={messagesEndRef} />
        </div>
        <div className="flex flex-col p-4 bg-gray-200 gap-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {prompts.map((prompt) => {
              return (
                <button
                  className={classnames(
                    "p-1 lg:p-3 flex items-center justify-center border border-blue-300 bg-blue-200 rounded-md",
                    { "hover:bg-blue-300": !isRespondingToPrompt }
                  )}
                  key={prompt}
                  disabled={isInitialising || isRespondingToPrompt}
                  onClick={() => {
                    handlePrompt(prompt);
                  }}
                >
                  {prompt}
                </button>
              );
            })}
          </div>
          <div className="flex items-center justify-between">
            <input
              type="text"
              className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none"
              placeholder="What is on your mind today?"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(event) => {
                if (event.key !== "Enter") {
                  return;
                }

                handleClick();
              }}
            />
            <button
              className={classnames(
                "ml-4 px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none w-36 flex justify-center",
                {
                  "bg-blue-300": isRespondingToPrompt,
                  "hover:bg-blue-600": !isRespondingToPrompt,
                }
              )}
              onClick={handleClick}
              disabled={isInitialising || isRespondingToPrompt}
            >
              {isRespondingToPrompt ? (
                <LoadingIndicator whiteColor />
              ) : (
                <span>Ask Mr. Fox</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </ProviderTree>
  );
}
