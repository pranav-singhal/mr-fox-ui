import React, { useState } from "react";
import classnames from "classnames";
import LoadingIndicator from "../LoadingIndicator";
import { useAccount } from "wagmi";
import WebsocketService from "@/app/services/WebsocketService";

const GetUserAddress: React.FC<{
  websocketInstance: WebsocketService;
  response_event: string;
  args: {
    whitelistCheck?: boolean;
  };
  onCompleted: () => void;
}> = (props) => {
  const { address } = useAccount();
  const [showAction, setShowAction] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAction = async (): Promise<void> => {
    setIsLoading(true);
    props.websocketInstance.sendActionResponse({
      name: props.response_event,
      output: address,
    });
    setShowAction(false);
    props.onCompleted();
  };

  return (
    <div>
      Before I can proceed, I need your address{" "}
      {props.args.whitelistCheck
        ? "to verify if you are whitelisted to use me"
        : ""}
      .
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
