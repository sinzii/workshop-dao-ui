import { NetworkId } from 'typink';
import miniDaoMetadata from './artifacts/minidao/challenge_5_contract.json';
import superDaoMetadata from './artifacts/superdao/superdao.json';

export enum ContractId {
  SUPER_DAO = 'SUPER_DAO',
  MINI_DAO = 'MINI_DAO',
}

export const deployments = [
  {
    id: ContractId.SUPER_DAO,
    metadata: superDaoMetadata as any,
    network: NetworkId.POP_TESTNET,
    address: '1obPzzASRmFF5Em4Mg8V7KnkzfQtRsQ5pKJFqzCtya555FZ',
  },
  {
    id: ContractId.MINI_DAO,
    metadata: miniDaoMetadata as any,
    network: NetworkId.POP_TESTNET,
    address: '15oAF1DGrnnqTbaCf1WGU1KHw6KnATFFaYiPHgx6gfR37tMB',
  },
];
