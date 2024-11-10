import { Box, Flex } from '@chakra-ui/react';
import { MiniDaoBoard } from '@/components/minidao/MiniDaoBoard.tsx';
import BalanceInsufficientAlert from '@/components/shared/BalanceInsufficientAlert.tsx';
import { BlockInfo } from '@/components/shared/BlockInfo.tsx';
import MainFooter from '@/components/shared/MainFooter';
import MainHeader from '@/components/shared/MainHeader';
import { Card } from "@/components/shared/Card.tsx";

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

function App() {
  return (
    <Flex direction='column' minHeight='100vh'>
      <MainHeader />
      <Box maxWidth='container.md' mx='auto' my={4} px={4} flex={1} w='full'>
        <BalanceInsufficientAlert />
        <BlockInfo />

        <Card props={{ mt: 4 }}>
          <MiniDaoBoard />
        </Card>
      </Box>
      <MainFooter />
    </Flex>
  );
}

export default App;
