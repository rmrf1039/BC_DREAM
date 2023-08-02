import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { localhost } from 'wagmi/chains'

const projectId = 'e689ac60de9fc41c00dff6bea079497e';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [localhost],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: `http://localhost:7545`,
        webSocket: `ws://localhost:7545`,
      }),
    }),
    w3mProvider({ projectId })
  ],
)

const config = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
})

const ethereumClient = new EthereumClient(config, chains)

const WagmiProvider = ({ children }) => {
  return (
    <>
      <WagmiConfig config={config}>
        {children}
      </WagmiConfig>
    </>
  );
}

export { WagmiProvider, projectId, ethereumClient }