"use client";
import { useEffect, useState, useRef } from "react";

import Message from "./components/Message";
import ProviderTree from "./components/ProviderTree";
import WebsocketService, {
  MESSAGE_RECEIVED,
} from "./services/WebsocketService";
import LoadingIndicator from "./components/LoadingIndicator";
import classnames from "classnames";

const INITIAL_MESSAGE = `Hi! I'm **Mr. Fox**, here to help you with a variety of on-chain transactions.

Whenever you're ready, just let me know how I can assist you!

Or, you can start by selecting from one of the prompts below.
`;

// These are special actions whose response from LLM is delayed.
// When they are returned, the thread run is not yet completed.
// So we do not need to set the loading false for them.
// a follow up message will be returned which will set the loading indicator to false for these events
const NON_INTENT_ACTIONS = ['get_chart_data'];

export type MessageType = {
  id: number;
  type: string; // user | agent
  createdAt: number; // timestamp
  prompt?: string;

  // sample action: "{"name":"get_user_address","args":{},"response_event":"user_address_found"}"
  action?: any;
};

const prompts = [
  "What can you do?",
  "How much USDT do I have?",
  "I want to swap my USDT for LINK",
  "What is the value of my MATIC in USDT?",
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
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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

      if (!(event?.action && NON_INTENT_ACTIONS.includes(JSON.parse(event?.action)?.name))) {
        setIsRespondingToPrompt(false);
      }
      
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
        <div className="flex px-6 py-4 bg-blue-600 text-white items-center gap-8">
          <img
            src="/mr-fox.jpeg"
            alt="Mr. Fox"
            className="w-20 h-20 rounded-full"
          />
          <div className="flex font-brand flex-col gap-2">
            <div className="text-3xl font-semibold">Mr. Fox</div>
            <div className="text-md md:text-lg">
              Last web3 assistant you will ever need
            </div>
          </div>
        </div>
        <div
          className={classnames("overflow-y-auto bg-gray-100 p-4", {
            "flex-1": messages.length > 1,
          })}
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
          <div ref={messagesEndRef} />
        </div>
        {messages.length <= 1 && (
          <div className="flex flex-col flex-1 bg-gray-100 justify-center items-center gap-4">
            {messages.length === 1 && prompts.map((prompt) => {
              return (
                <button
                  className={classnames(
                    "p-3 flex items-center justify-center border border-blue-300 bg-blue-200 rounded-md w-3/4 lg:w-1/2",
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
        )}
        <div className="flex flex-col p-4 bg-gray-200 gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <input
              type="text"
              className="w-full flex-1 p-2 rounded-md border border-gray-300 focus:outline-none"
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
                "px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none w-full sm:w-36 flex justify-center",
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
