import React, { useState } from "react";
import classnames from "classnames";
import LoadingIndicator from "../LoadingIndicator";
import { useChainId } from "wagmi";
import {
  sendTransaction,
  waitForTransaction,
  switchNetwork,
  prepareSendTransaction,
  PrepareSendTransactionArgs,
} from "@wagmi/core";
import WebsocketService from "@/app/services/WebsocketService";
import { parseEther } from "viem";

interface SendTokenArgs {
  transaction: PrepareSendTransactionArgs;
  chainId: number;
}

const SendToken: React.FC<{
  args: SendTokenArgs;
  websocketInstance: WebsocketService;
  response_event: string;
  onCompleted: () => void;
}> = (props) => {
  const [showAction, setShowAction] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chainId = useChainId();

  const handleAction = async (): Promise<void> => {
    setIsLoading(true);
    const requiredChainId = props.args.chainId;
    const transactionInformation = props.args.transaction;

    // Since message is received from backend in a stringified format,
    // and js does not know how to stringify a BigInt, hence the parseEther
    // is happening here instead of backend.
    if (transactionInformation.value) {
      transactionInformation.value = parseEther(
        transactionInformation.value.toString()
      );
    }

    try {
      if (requiredChainId !== chainId) {
        await switchNetwork({ chainId: requiredChainId });
      }

      const transaction = await prepareSendTransaction(transactionInformation);

      const { hash } = await sendTransaction(transaction);
      await waitForTransaction({ hash });
      props.websocketInstance.sendActionResponse({
        name: props.response_event,
        output: {
          success: true,
          message: "transaction completed, and funds transferred",
        },
      });
    } catch (error: any) {
      console.log(error);
      props.websocketInstance.sendActionResponse({
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
      In order to initiate transfer of funds to the provided address, you need
      to sign a transaction.
      <br />
      Click on the button below to open you wallet.
      <br />
      You can verify the tranfer address, and amount in your wallet as well.
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
            <span>Initiate Transfer</span>
          )}
        </button>
      )}
    </div>
  );
};

export default SendToken;
