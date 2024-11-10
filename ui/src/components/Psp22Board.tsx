import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Divider, Heading } from '@chakra-ui/react';
import { useMemo } from 'react';
import WalletSelection from '@/components/dialog/WalletSelection.tsx';
import PendingText from '@/components/shared/PendingText.tsx';
import { useApp } from '@/providers/AppProvider.tsx';
import { formatBalance } from '@/utils/string.ts';
import { txToaster } from '@/utils/txToaster.tsx';
import { NetworkId, useContractQuery, useContractTx, useTypink } from 'typink';

export default function Psp22Board() {
  const { psp22Contract: contract } = useApp();
  const { defaultCaller, selectedAccount, networkId } = useTypink();
  const mintable = useMemo(() => networkId === NetworkId.ALEPHZERO_TESTNET, [networkId]);
  const mintTx = useContractTx(contract, 'psp22MintableMint');

  const { data: tokenName, isLoading: loadingTokenName } = useContractQuery({
    contract,
    fn: 'psp22MetadataTokenName',
  });

  const { data: tokenSymbol, isLoading: loadingTokenSymbol } = useContractQuery({
    contract,
    fn: 'psp22MetadataTokenSymbol',
  });

  const { data: tokenDecimal, isLoading: loadingTokenDecimal } = useContractQuery({
    contract,
    fn: 'psp22MetadataTokenDecimals',
  });

  const {
    data: totalSupply,
    isLoading: loadingTotalSupply,
    refresh: refreshTotalSupply,
  } = useContractQuery({
    contract,
    fn: 'psp22TotalSupply',
  });

  const {
    data: myBalance,
    isLoading: loadingBalance,
    refresh: refreshMyBalance,
  } = useContractQuery({
    contract,
    fn: 'psp22BalanceOf',
    args: [selectedAccount?.address || defaultCaller],
  });

  const mintNewToken = async () => {
    if (!tokenDecimal) return;

    const toaster = txToaster('Signing transaction...');
    try {
      await mintTx.signAndSend({
        args: [BigInt(100 * Math.pow(10, tokenDecimal))],
        callback: ({ status }) => {
          console.log(status);
          toaster.updateTxStatus(status);
        },
      });
    } catch (e: any) {
      console.error(e);
      toaster.onError(e);
    } finally {
      refreshMyBalance();
      refreshTotalSupply();
    }
  };

  return (
    <Box>
      <Heading size='md'>PSP22 Contract</Heading>
      <Box mt={4}>
        <Box mb={2}>
          Token Name:{' '}
          <PendingText fontWeight='600' isLoading={loadingTokenName}>
            {tokenName}
          </PendingText>
        </Box>
        <Box mb={2}>
          Token Symbol:{' '}
          <PendingText fontWeight='600' isLoading={loadingTokenSymbol}>
            {tokenSymbol}
          </PendingText>
        </Box>
        <Box mb={2}>
          Token Decimal:{' '}
          <PendingText fontWeight='600' isLoading={loadingTokenDecimal}>
            {tokenDecimal}
          </PendingText>
        </Box>
        <Box mb={2}>
          Total Supply:{' '}
          <PendingText fontWeight='600' isLoading={loadingTotalSupply}>
            {formatBalance(totalSupply, tokenDecimal)} {tokenSymbol}
          </PendingText>
        </Box>
        <Divider my={4} />
        <Box>
          My Balance:{' '}
          {selectedAccount ? (
            <PendingText fontWeight='600' isLoading={loadingBalance}>
              {formatBalance(myBalance, tokenDecimal)} {tokenSymbol}
            </PendingText>
          ) : (
            <WalletSelection buttonProps={{ size: 'xs' }} />
          )}
        </Box>
        {selectedAccount && (
          <Box mt={4}>
            <Button size='sm' onClick={mintNewToken} isLoading={mintTx.isInProgress} isDisabled={!mintable}>
              Mint 100 {tokenSymbol}
            </Button>
            {!mintable && (
              <Alert status='info' my={4}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Minting is currently not available on POP Network contract</AlertTitle>
                  <AlertDescription>Please use Aleph Zero Testnet contract for minting tokens</AlertDescription>
                </Box>
              </Alert>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
