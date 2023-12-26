"use client";
import Markdown from "markdown-to-jsx";
import { ConnectKitButton } from "connectkit";
import {
  sendTransaction,
  waitForTransaction,
} from "@wagmi/core";
import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { MessageType } from "../page";
import LoadingIndicator from "./LoadingIndicator";
import classnames from "classnames";
import { safeSignTypedData } from "../utils/web3Utils";

const ActionBody = (props: any) => {
  const { address, isConnected } = useAccount();
  const  chainId = useChainId();
  const [showAction, setShowAction] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const wakuInstance = props.wakuInstance;
  const actionObject = props?.actionObject;

  const handleAction = async () => {
    setIsLoading(true);

    if (actionObject.name === "get_user_address") {
      wakuInstance.sendActionResopnse({
        name: actionObject.response_event,
        output: address,
      });
    }

    if (actionObject.name === "get_swap_signature") {
      try {
        const signature = await safeSignTypedData(actionObject?.args?.typedData, chainId);
        wakuInstance.sendActionResopnse({
          name: actionObject.response_event,
          output: { signature },
        });
      } catch (error: any) {
        wakuInstance.sendActionResopnse({
          name: actionObject.response_event,
          output: { error: error.details },
        });
      }
    }

    if (actionObject.name === "get_approval_for_token") {
      try {
        const { hash } = await sendTransaction(actionObject?.args?.calldata);
        await waitForTransaction({ hash });
        wakuInstance.sendActionResopnse({
          name: actionObject.response_event,
          output: { success: true, message: "approval granted" },
        });
      } catch (error: any) {
        wakuInstance.sendActionResopnse({
          name: actionObject.response_event,
          output: { error: error.details },
        });
      }
    }

    props.setIsRespondingToPrompt(true);
    setShowAction(false);
  };

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

  switch (actionObject?.name) {
    case "get_user_address":
      return (
        <div>
          Before I can proceed, I need your address.
          <br />
          Since you have already connected your wallet, all you need to do is
          click on the button below
          <br />
          {showAction && (
            <button
              className={classnames(
                "p-3 mt-3 bg-blue-500 text-white rounded-md focus:outline-none w-56 flex justify-center",
                {
                  "bg-blue-300": isLoading,
                  "hover:bg-blue-600": !isLoading,
                }
              )}
              onClick={handleAction}
            >
              {isLoading ? (
                <LoadingIndicator whiteColor />
              ) : (
                <span>Send Wallet Address</span>
              )}
            </button>
          )}
        </div>
      );
    case "get_swap_signature":
      return (
        <div>
          In order to make this swap, I will need you to sign a transaction for
          me.
          <br />
          Click on the button below to open the transaction in your wallet.
          <br />
          {showAction && (
            <button
              className={classnames(
                "p-3 mt-3 bg-blue-500 text-white rounded-md focus:outline-none w-56 flex justify-center",
                {
                  "bg-blue-300": isLoading,
                  "hover:bg-blue-600": !isLoading,
                }
              )}
              onClick={handleAction}
            >
              {isLoading ? (
                <LoadingIndicator whiteColor />
              ) : (
                <span>Sign Transaction</span>
              )}
            </button>
          )}
        </div>
      );

    case "get_approval_for_token":
      return (
        <div>
          In order to execute this swap, you will need to grant me approval.
          <br />
          Click on the button below to open the approval transaction in the
          wallet.
          <br />
          You can verify the swap in the wallet as well
          <br />
          {showAction && (
            <button
              className={classnames(
                "p-3 mt-3 bg-blue-500 text-white rounded-md focus:outline-none w-56 flex justify-center",
                {
                  "bg-blue-300": isLoading,
                  "hover:bg-blue-600": !isLoading,
                }
              )}
              onClick={handleAction}
            >
              {isLoading ? (
                <LoadingIndicator whiteColor />
              ) : (
                <span>Grant approval</span>
              )}
            </button>
          )}
        </div>
      );

    default:
      return (
        <div> This looks like a weird transaction. Let me check on this!</div>
      );
  }
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
        className={`flex flex-col gap-3 max-w-full p-4 rounded-lg md:max-w-lg ${
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
