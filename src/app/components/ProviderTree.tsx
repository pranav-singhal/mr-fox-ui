
import { ConnectKitProvider, ConnectKitButton, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig, useWalletClient } from "wagmi";


const config = createConfig(
    getDefaultConfig({
      // Required API Keys
      infuraId: "3e3bc546283842be8c2f1a9bcb2e1885",
      walletConnectProjectId: "c9ce743ec1ae0a3a3c13ecf30b36b59c",
  
      // Required
      appName: "ethIndia2023",
  
      // Optional
      appDescription: "Mr fox is a helpful ai assistant",
      appUrl: "https://family.co", // your app's url
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  );

const ProviderTree = ({children}) => {

    return (
        <WagmiConfig config={config}>
    <ConnectKitProvider>
        {children}
    </ConnectKitProvider>
    </WagmiConfig>
    )
}

export default ProviderTree;