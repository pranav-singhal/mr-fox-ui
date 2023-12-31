"use client";
import Markdown from "markdown-to-jsx";
import { ConnectKitButton } from "connectkit";
import React from "react";
import { useAccount } from "wagmi";
import { MessageType } from "../page";
import LoadingIndicator from "./LoadingIndicator";
import MessageActions, { Actions } from "./MessageActions";

interface Action {
  name: Actions;
  response_event: string;
  args: any;
}

const ActionBody = (props: any) => {
  const { isConnected } = useAccount();
  const wakuInstance = props.wakuInstance;
  const actionObject: Action = props?.actionObject;

  if (!actionObject) {
    return null;
  }

  if (!isConnected) {
    return (
      <div>
        Before I can help you, you need to connect your wallet.
        <br />
        Rest assured! I will not ask you to sign anything dangerous
        <br />
        <div className="pt-2">
          <ConnectKitButton />
        </div>
      </div>
    );
  }

  const MessageAction = MessageActions[actionObject.name];

  if (!MessageAction) {
    return (
      <div> This looks like a weird transaction. Let me check on this!</div>
    );
  }

  return (
    <MessageAction
      websocketInstance={wakuInstance}
      response_event={actionObject.response_event}
      args={actionObject.args}
      onCompleted={() => props.setIsRespondingToPrompt(true)}
    />
  );
};

const Message = (props: any) => {
  const message: MessageType = props.message;
  const action: string = message?.action || "";
  const wakuInstance = props.wakuInstance;
  let actionObject: any = { name: "", args: {}, response_event: "" };

  if (action) {
    actionObject = JSON.parse(action);
  }

  const getPrompt = () => {
    if (action) {
      return (
        <ActionBody
          actionObject={actionObject}
          wakuInstance={wakuInstance}
          setIsRespondingToPrompt={props.setIsRespondingToPrompt}
        />
      );
    }

    return message.prompt && <Markdown>{message.prompt}</Markdown>;
  };

  return (
    <div className="flex justify-start items-center space-x-2 mx-2 my-3">
      <div
        className={`flex flex-col gap-3 max-w-full p-4 rounded-lg md:max-w-lg w-full  ${
          message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-300"
        }`}
      >
        <div className="flex gap-3 items-center">
          <img
            src={
              message.type === "user"
                ? "https://img.freepik.com/premium-vector/user-avatar-icon-flat-color-style_755164-946.jpg?w=2000"
                : "/mr-fox.jpeg"
            }
            alt="Avatar"
            className="w-6 h-6 rounded-full"
          />
          <span className="font-semibold">
            {message.type === "user" ? "You" : "Mr Fox"}
          </span>
        </div>
        <div>
          {props.loading ? (
            <div className="flex items-center gap-3">
              <span>Generating...</span>
              <LoadingIndicator />
            </div>
          ) : (
            getPrompt()
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
