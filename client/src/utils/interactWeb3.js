import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

import {
  ALCHEMY_WS_URL,
  contractAddress,
  SALE_NONE,
  SALE_PRESALE,
  SALE_PUBLICSALE,
  SALE_ENDED,
} from "../config/contants";

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

export const initialize = async () => {
  provider = await web3Modal.connect();
  web3 = createAlchemyWeb3(ALCHEMY_WS_URL, { writeProvider: provider });
  accounts = await web3.eth.getAccounts();
  chainId = await web3.eth.getChainId();
  contract = new web3.eth.Contract(contractABI, contractAddress);
};

export const connectWallet = async () => {
  try {
    if (provider !== undefined)
      return { address: accounts[0], chainId, status: true };
    await initialize();
    return { address: accounts[0], chainId, status: true };
  } catch {
    return { address: "", chainId: undefined, status: false };
  }
};
export const getCurrentWalletConnected = async () => {
  let address = "";
  let status = false;
  if (provider === undefined) {
    if (web3Modal.cachedProvider.trim().length !== 0) {
      await initialize();
      address = accounts[0];
      status = true;
    } else {
      address = "";
    }
  } else {
    address = accounts[0];
    status = true;
  }
  return { address, chainId, status };
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

export const getSaleStatus = async () => {
  let isPaused = undefined;
  let pre_price = undefined;
  let presale = undefined;
  let public_price = undefined;
  let publicsale = undefined;
  let status = false;
  let message = "Please connect wallet";
  let saleStage = SALE_NONE;
  let price = 0;
  if (provider === undefined && web3Modal.cachedProvider.trim().length !== 0) {
    await initialize();
  }
  if (contract !== undefined) {
    isPaused = await contract.methods.isPaused().call();
    pre_price = await contract.methods.pre_price().call();
    presale = await contract.methods.presale().call();
    public_price = await contract.methods.public_price().call();
    publicsale = await contract.methods.publicsale().call();
    status = true;
  }
  if (isPaused === true) {
    saleStage = SALE_ENDED;
    price = 0;
    message = "The sale is finished!";
  } else {
    if (presale === true) {
      saleStage = SALE_PRESALE;
      price = pre_price;
      message = "The presale is open now!";
    } else if (publicsale === true) {
      saleStage = SALE_PUBLICSALE;
      price = public_price;
      message = "The public sale is open now!";
    } else {
      saleStage = SALE_NONE;
      price = 0;
      message = "The sale is not open now!";
    }
  }
  return {
    status,
    message,
    saleStage,
    price,
  };
};

export const getMyTokens = async () => {
  let tokens = [];
  let status = false;
  let message = "Please connect wallet";
  if (provider === undefined && web3Modal.cachedProvider.trim().length !== 0) {
    await initialize();
  }
  if (contract !== undefined) {
    tokens = await contract.methods.tokensOfOwner(accounts[0]).call();
    status = true;
    message = "";
  }
  return { tokens, status, message };
};

export const getTotalSupply = async () => {
  let totalSupply = 0;
  let status = false;
  let message = "Please connect wallet";
  if (provider === undefined && web3Modal.cachedProvider.trim().length !== 0) {
    await initialize();
  }
  if (contract !== undefined) {
    totalSupply = parseInt(await contract.methods.totalSupply().call());
    status = true;
    message = "";
  }
  return { totalSupply, status, message };
};

export const checkIfBlackList = async () => {
  let isBlackList = false;
  let status = false;
  let message = "Please connect wallet";
  if (provider === undefined && web3Modal.cachedProvider.trim().length !== 0) {
    await initialize();
  }
  if (contract !== undefined) {
    isBlackList = await contract.methods.isBlackList(accounts[0]).call();
    status = true;
    message = `The Address ${accounts[0]} already minted at presale. You can buy at public sale or Opensea.io !`;
  }
  return { isBlackList, status, message };
};

export const requestMint = async (quantity, price) => {
  let data = undefined;
  let status = false;
  let message = "Please connect wallet";
  if (provider === undefined && web3Modal.cachedProvider.trim().length !== 0) {
    await initialize();
  }
  if (contract !== undefined) {
    try {
      data = await contract.methods
        .mint(accounts[0], quantity)
        .send({ from: accounts[0], value: price * quantity });
      status = true;
      message = "Successfully minted!";
      console.log(data);
    } catch (error) {
      status = false;
      message = "Something wrong!";
      if (error?.code === 4001) {
        message = error?.message;
      }
    }
  }
  return { data, status, message };
};
