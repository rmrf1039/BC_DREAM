import { EthereumClient, w3mConnectors } from '@web3modal/ethereum'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { sepolia } from 'wagmi/chains'

const projectId = 'e689ac60de9fc41c00dff6bea079497e';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ sepolia ],
  [infuraProvider({
    apiKey: '4645cea3156340028cc4f51b73bbef5a'
  }),
  publicProvider()
])

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