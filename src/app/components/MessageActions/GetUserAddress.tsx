import React, { useState } from "react";
import classnames from "classnames";
import LoadingIndicator from "../LoadingIndicator";
import { useAccount, useChainId } from "wagmi";
import {
  sendTransaction,
  waitForTransaction,
  switchNetwork,
  prepareSendTransaction,
} from "@wagmi/core";
import WebsocketService from "@/app/services/WebsocketService";

const GetUserAddress: React.FC<{
  websocketInstance: WebsocketService;
  response_event: string;
}> = (props) => {
    const { address} = useAccount();
  const [showAction, setShowAction] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAction = async (): Promise<void> => {
    setIsLoading(true);
    props.websocketInstance.sendActionResopnse({
      name: props.response_event,
      output: address,
    });
    setShowAction(false);
  };

  return (
    <div>
      Before I can proceed, I need your address.
      <br />
      Since you have already connected your wallet, all you need to do is click
      on the button below
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
};

export default GetUserAddress;
