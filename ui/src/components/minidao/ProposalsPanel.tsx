import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import { Proposal } from '@/components/minidao/Proposal.tsx';
import { useApp } from '@/providers/AppProvider.tsx';
import { txToaster } from '@/utils/txToaster.tsx';
import { useContractTx } from 'typink';
import { useWatchContractQuery } from 'typink/hooks/useContractQuery.ts';

export function ProposalsPanel() {
  const { miniDaoContract: contract } = useApp();
  const { superDaoContract: superContract } = useApp();

  const createCrossChainProposalTx = useContractTx(contract, 'createSuperdaoCrossChainProposal');
  const createContractCallProposalTx = useContractTx(contract, 'createContractCallProposal');
  const { data: proposals, isLoading } = useWatchContractQuery({
    contract: superContract,
    fn: 'superDaoQueryGetProposals',
  });

  const doCreateProposal = async () => {
    const toaster = txToaster('Signing transaction...');
    try {
      await createCrossChainProposalTx.signAndSend({
        args: [{ dest: '0x0000', msg: '0x00' }],
        callback: ({ status }) => {
          console.log(status);
          toaster.updateTxStatus(status);
        },
      });
    } catch (e: any) {
      console.error(e);
      toaster.onError(e);
    }
  };

  const doCreateContractCallProposal = async () => {
    const toaster = txToaster('Signing transaction...');
    try {
      await createContractCallProposalTx.signAndSend({
        args: [
          {
            callee: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
            selector: '0x00000000',
            input: '0x',
            transferredValue: 0n,
            refTimeLimit: 0n,
            allowReentry: false,
          },
        ],
        callback: ({ status }) => {
          console.log(status);
          toaster.updateTxStatus(status);
        },
      });
    } catch (e: any) {
      console.error(e);
      toaster.onError(e);
    }
  };

  return (
    <Box mt={4}>
      <Heading size='sm'>Proposals</Heading>
      <Flex gap={4}>
        <Button mt={4} size='sm' onClick={doCreateProposal} isLoading={createCrossChainProposalTx.inBestBlockProgress}>
          Create Cross Chain Proposal
        </Button>

        <Button
          mt={4}
          size='sm'
          onClick={doCreateContractCallProposal}
          isLoading={createContractCallProposalTx.inBestBlockProgress}>
          Create Contract Call Proposal
        </Button>
      </Flex>

      <Box mt={4}>
        {isLoading && <Spinner />}
        {proposals && proposals.length === 0 && <Text>No proposals</Text>}
        {proposals && (
          <Flex direction='column' gap={2}>
            {proposals.map(([index, p], idx) => (
              <Proposal proposal={p} index={index} key={idx} />
            ))}
          </Flex>
        )}
      </Box>
    </Box>
  );
}
