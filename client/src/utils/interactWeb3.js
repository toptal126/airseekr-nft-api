import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import { ALCHEMY_WS_URL, contractAddress } from "../config/contants";

import contractABI from "../contract/azuki_ABI.json";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "2c5f30f7c7804ae1bd5b7440758e4a1c", // required
    },
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
});

let provider = undefined;
let web3 = undefined;
let accounts = [];
let chainId = undefined;
let contract = undefined;

export const connectWallet = async () => {
  try {
    if (provider !== undefined) return { address: accounts[0], chainId };
    provider = await web3Modal.connect();
    web3 = createAlchemyWeb3(ALCHEMY_WS_URL, { writeProvider: provider });
    accounts = await web3.eth.getAccounts();
    chainId = await web3.eth.getChainId();
    contract = new web3.eth.Contract(contractABI, contractAddress);
    return { address: accounts[0], chainId };
  } catch {
    return { address: "", chainId: undefined };
  }
};
export const getCurrentWalletConnected = async () => {
  if (provider === undefined) {
    if (web3Modal.cachedProvider.trim().length !== 0) {
      provider = await web3Modal.connect();
      web3 = createAlchemyWeb3(ALCHEMY_WS_URL, {
        writeProvider: provider,
      });
      accounts = await web3.eth.getAccounts();
      chainId = await web3.eth.getChainId();
      contract = new web3.eth.Contract(contractABI, contractAddress);
      return { address: accounts[0], chainId };
    } else {
      return { address: "", chainId: undefined };
    }
  } else return { address: accounts[0], chainId };
};
export const requestSwitchNetwork = async (chainId) => {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: chainId,
        },
      ],
    });
  } catch (error) {
    if (error.code === 4001) console.log(error.message);
  }
};

export const getMyTokens = async () => {
  if (provider === undefined) {
    if (web3Modal.cachedProvider.trim().length !== 0) {
      provider = await web3Modal.connect();
      web3 = createAlchemyWeb3(ALCHEMY_WS_URL, {
        writeProvider: provider,
      });
      accounts = await web3.eth.getAccounts();
      chainId = await web3.eth.getChainId();
      contract = new web3.eth.Contract(contractABI, contractAddress);
      const tokens = await contract.methods.tokensOfOwner(accounts[0]).call();
      return { tokens: tokens, status: true };
    } else {
      return { tokens: [], status: false, message: "Please connect wallet" };
    }
  } else {
    if (contract !== undefined)
      return {
        tokens: await contract.methods.tokensOfOwner(accounts[0]).call(),
        status: true,
      };
  }
  return { tokens: [], status: false, message: "Please connect wallet" };
};
