import { createContext, useContext } from 'react';
import { Props } from '@/types.ts';
import { ContractId } from 'contracts/deployments.ts';
import { Challenge5ContractContractApi } from 'contracts/types/challenge5-contract';
import { SuperdaoContractApi } from 'contracts/types/superdao';
import { Contract } from 'dedot/contracts';
import { useContract } from 'typink';

interface AppContextProps {
  superDaoContract?: Contract<SuperdaoContractApi>;
  miniDaoContract?: Contract<Challenge5ContractContractApi>;
}

const AppContext = createContext<AppContextProps>(null as any);

export const useApp = () => {
  return useContext(AppContext);
};

export function AppProvider({ children }: Props) {
  const { contract: superDaoContract } = useContract<SuperdaoContractApi>(ContractId.SUPER_DAO);
  const { contract: miniDaoContract } = useContract<Challenge5ContractContractApi>(ContractId.MINI_DAO);

  return (
    <AppContext.Provider value={{ superDaoContract, miniDaoContract }}>
      {children}
    </AppContext.Provider>
  );
}
