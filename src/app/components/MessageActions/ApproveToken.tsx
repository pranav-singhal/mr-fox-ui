import React, { useState } from "react";
import classnames from "classnames";
import LoadingIndicator from "../LoadingIndicator";
import { useChainId } from "wagmi";
import {
  sendTransaction,
  waitForTransaction,
  switchNetwork,
  prepareSendTransaction,
} from "@wagmi/core";
import WebsocketService from "@/app/services/WebsocketService";

interface ApproveTokenArgs {
  calldata: object;
  chainId: number;
}

const ApproveToken: React.FC<{
  args: ApproveTokenArgs;
  websocketInstance: WebsocketService;
  response_event: string;
  onCompleted: () => void;
}> = (props) => {
  const [showAction, setShowAction] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chainId = useChainId();

  const handleAction = async (): Promise<void> => {
    setIsLoading(true);
    const requiredChainId = props?.args?.chainId;
    const transactionInformation = props?.args?.calldata;

    try {
      if (requiredChainId !== chainId) {
        await switchNetwork({ chainId: requiredChainId });
      }

      const transaction = await prepareSendTransaction(transactionInformation);
      const { hash } = await sendTransaction(transaction);
      await waitForTransaction({ hash });

      props.websocketInstance.sendActionResopnse({
        name: props.response_event,
        output: { success: true, message: "approval granted" },
      });
    } catch (error: any) {
      props.websocketInstance.sendActionResopnse({
        name: props.response_event,
        output: { error: error.details },
      });
    } finally {
      setShowAction(false);
      props.onCompleted();
    }
  };

  return (
    <div>
      In order to execute this swap, you will need to grant me approval.
      <br />
      Click on the button below to open the approval transaction in the wallet.
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
};

export default ApproveToken;
