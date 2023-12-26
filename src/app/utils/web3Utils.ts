import {
    signTypedData,
    switchNetwork
  } from "@wagmi/core";
import { TypedDataDomain } from "viem";

  export const safeSignTypedData = async (typedData: any, currentChainId: number) => {
    const domain: TypedDataDomain = typedData?.domain;
    if (domain.chainId && domain.chainId !== currentChainId) {
        await switchNetwork({chainId: domain.chainId});
    }

    const signature = await signTypedData(typedData);
    return signature;
  }