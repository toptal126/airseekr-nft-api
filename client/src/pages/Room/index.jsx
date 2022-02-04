import { useEffect, useState } from "react";

import {
  connectWallet,
  getCurrentWalletConnected,
  requestSwitchNetwork,
} from "../../utils/walletconnect";

import { getChain } from "../../utils/chainList";

const Room = () => {
  const [value, setValue] = useState(0); // integer state
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
  }, []);

  const forceRender = () => {
    setValue((value) => value + 1); // update the state to force render
  };
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", () => {
        forceRender();
      });
      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      });
    }
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };
  return (
    <div className="container mx-auto flex flex-col pt-10">
      <div className="subheader my-10">
        <h1 className="block text-center">You Own Room</h1>
      </div>

      <button
        className={
          "relative mb-10 mx-auto py-2 px-10 text-2xl rounded-full text-white focus:ring-2 " +
          (walletAddress.length == 0 || !getChain(window.ethereum.chainId).valid
            ? "bg-red-500 focus:ring-red-500"
            : "bg-emerald-500 focus:ring-emerald-500")
        }
        onClick={connectWalletPressed}
      >
        {walletAddress.length > 0
          ? `Connected: 
            ${String(walletAddress).substring(0, 6)}...${String(
              walletAddress
            ).substring(38)} 
            (${getChain(window.ethereum.chainId).name})`
          : `Connect Wallet`}
        {!getChain(window.ethereum.chainId).valid &&
          walletAddress.length !== 0 && (
            <span
              className="absolute whitespace-nowrap -top-6 -right-10 flex items-center text-4xs tracking-wide w-auto left-1/2s transforms -translate-x-1/2s bg-white hover:bg-slate-300 shadow pt-0.5 px-2 rounded-sm text-red-500"
              onClick={() => requestSwitchNetwork("0x1")}
            >
              Switch to Mainnet
            </span>
          )}
      </button>
    </div>
  );
};

export default Room;
