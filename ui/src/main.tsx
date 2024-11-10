import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from '@/App';
import { AppProvider } from '@/providers/AppProvider.tsx';
import { theme } from '@/theme';
import { deployments } from 'contracts/deployments';
import { NetworkId, TypinkProvider } from 'typink';
import { development } from 'typink/networks/development';
import { alephZeroTestnet, popTestnet } from 'typink/networks/testnet';

const DEFAULT_CALLER = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; // Alice
const SUPPORTED_NETWORK = [popTestnet];

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ChakraProvider theme={theme}>
    <TypinkProvider
      deployments={deployments}
      defaultCaller={DEFAULT_CALLER}
      defaultNetworkId={NetworkId.POP_TESTNET}
      supportedNetworks={SUPPORTED_NETWORK}>
      <AppProvider>
        <App />
        <ToastContainer
          position='top-right'
          closeOnClick
          pauseOnHover
          theme='light'
          autoClose={5_000}
          hideProgressBar
          limit={10}
        />
      </AppProvider>
    </TypinkProvider>
  </ChakraProvider>,
);
