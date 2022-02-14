export const shortenAddress = (walletAddress) => {
  return `${String(walletAddress).substring(0, 6)}`;
};

export const wei2Eth = (wei) => wei / 10 ** 18 + " ETH";
