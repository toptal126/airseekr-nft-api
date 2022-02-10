import create from "zustand";

import { SALE_NONE } from "../config/contants";

export const useStore = create((set) => ({
  galleryData: {
    totalSupply: 0,
    items: [],
    myTokens: [],
  },
  setMyTokens: (_myTokens) =>
    set((state) => ({
      ...state,
      galleryData: { ...state.galleryData, myTokens: _myTokens },
    })),
  setItems: (_items) =>
    set((state) => ({
      ...state,
      galleryData: { ...state.galleryData, items: _items },
    })),
  setTotalSupply: (_totalSupply) =>
    set((state) => ({
      ...state,
      galleryData: { ...state.galleryData, totalSupply: _totalSupply },
    })),
  setGalleryData: (_galleryData) => set({ galleryData: _galleryData }),
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
