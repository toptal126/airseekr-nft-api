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
  theme: "dark",
});

let provider = undefined;
let web3 = undefined;
let accounts = [];
let chainId = undefined;
let contract = undefined;

export const subscribeEvent = async (eventHandler) => {
  const _web3 = await createAlchemyWeb3(ALCHEMY_WS_URL);
  const _contract = new _web3.eth.Contract(contractABI, contractAddress);
  _contract.events.allEvents({}, (error, event) => {
    eventHandler(event);
  });
};

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
  try {
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
  } catch (error) {
    console.log(error);
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
  let preSalePrice = undefined;
  let preSale = undefined;
  let publicSalePrice = undefined;
  let publicSale = undefined;
  let status = false;
  let message = "Please connect wallet";
  let saleStage = SALE_NONE;
  let price = 0;
  if (provider === undefined && web3Modal.cachedProvider.trim().length === 0) {
    web3 = createAlchemyWeb3(ALCHEMY_WS_URL);
    let _contract = new web3.eth.Contract(contractABI, contractAddress);
    isPaused = await _contract.methods.isPaused().call();
    preSalePrice = await _contract.methods.preSalePrice().call();
    preSale = await _contract.methods.preSale().call();
    publicSalePrice = await _contract.methods.publicSalePrice().call();
    publicSale = await _contract.methods.publicSale().call();
  }
  if (provider === undefined && web3Modal.cachedProvider.trim().length !== 0) {
    await initialize();
  }
  if (contract !== undefined) {
    isPaused = await contract.methods.isPaused().call();
    preSalePrice = await contract.methods.preSalePrice().call();
    preSale = await contract.methods.preSale().call();
    publicSalePrice = await contract.methods.publicSalePrice().call();
    publicSale = await contract.methods.publicSale().call();
    status = true;
  }
  if (isPaused === true) {
    saleStage = SALE_ENDED;
    price = 0;
    message = "The sale is finished!";
  } else {
    if (preSale === true) {
      saleStage = SALE_PRESALE;
      price = preSalePrice;
      message = "The presale is open now!";
    } else if (publicSale === true) {
      saleStage = SALE_PUBLICSALE;
      price = publicSalePrice;
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
  if (provider === undefined && web3Modal.cachedProvider.trim().length === 0) {
    web3 = createAlchemyWeb3(ALCHEMY_WS_URL);
    let _contract = new web3.eth.Contract(contractABI, contractAddress);
    totalSupply = parseInt(await _contract.methods.totalSupply().call());
    status = true;
    message = "";
    return { totalSupply, status, message };
  }
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
    isBlackList = await contract.methods.blacklistuser(accounts[0]).call();
    status = true;
    message = `The Address ${accounts[0]} already minted at preSale. You can buy at public sale or Opensea.io !`;
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
