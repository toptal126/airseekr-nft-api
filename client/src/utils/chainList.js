const chains = [
  { changeId: "0x1", name: "Mainnet", type: "mainnet", valid: true },
  { changeId: "0x3", name: "Ropsten", type: "testnet", valid: false },
  { changeId: "0x4", name: "Rinkeby", type: "testnet", valid: false },
  { changeId: "0x5", name: "Görli", type: "testnet", valid: false },
  { changeId: "0x42", name: "Kovan", type: "testnet", valid: false },
  { changeId: "0x137", name: "Polygon Mainnet", type: "mainnet", valid: false },
];

export const getChain = (chainId) => {
  const chain = chains.find((chain) => {
    return chain.changeId === chainId;
  });
  if (chain === undefined)
    return { chainId: chainId, name: "unknown", type: "testnet", valid: false };
  return chain;
};
