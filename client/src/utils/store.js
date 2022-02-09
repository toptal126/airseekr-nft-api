import create from "zustand";

import {
  SALE_NONE,
  SALE_PRESALE,
  SALE_PUBLICSALE,
  SALE_ENDED,
} from "../config/contants";

export const useStore = create((set) => ({
  myTokens: [],
  clearMyTokens: () => set({ myTokens: [] }),
  items: [],
  setItems: (_items) => set({ items: _items }),
  web3Util: {
    address: "",
    chainId: undefined,
    status: false,
  },
  setWeb3Util: (_web3Util) => set({ web3Util: _web3Util }),

  saleStatus: {
    status: false,
    message: "",
    saleStage: SALE_NONE,
    price: 0,
  },
  setSaleStatus: (_saleStatus) => set({ saleStatus: _saleStatus }),
  mintQuantity: 1,
  setMintQuantity: (_mintQuantity) => set({ mintQuantity: _mintQuantity }),
}));
