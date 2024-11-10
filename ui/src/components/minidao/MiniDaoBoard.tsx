import { Box, Heading, Text } from "@chakra-ui/react";
import { useApp } from "@/providers/AppProvider.tsx";
import { useContractQuery, useTypink } from "typink";
import PendingText from "@/components/shared/PendingText.tsx";
import { VoterInfo } from "@/components/minidao/VoterInfo.tsx";
import { ProposalsPanel } from "@/components/minidao/ProposalsPanel.tsx";

export function MiniDaoBoard() {
  const { selectedAccount } = useTypink()
  const {  miniDaoContract: contract } = useApp();
  const { data: name, isLoading } = useContractQuery({
    contract,
    fn: 'getName'
  })


  return (
    <Box>
      <Heading size='md'><PendingText isLoading={isLoading}><b>{name}</b></PendingText></Heading>

      <Heading size='sm' mt={2}>Voter Info</Heading>
      {selectedAccount
        ? <VoterInfo address={selectedAccount.address} />
        : (<Text>Connect to your wallet to show voter info!</Text>)}

      <ProposalsPanel />

    </Box>
  )
}