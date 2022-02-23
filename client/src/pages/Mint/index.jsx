import { useEffect, useState } from "react";
import { notify, walletConnectNotify } from "../../utils/toast";
import {
  getCurrentWalletConnected,
  getSaleStatus,
  requestMint,
  checkIfBlackList,
} from "../../utils/interactWeb3";

import { useStore } from "../../utils/store";

import {
  //   SALE_NONE,
  SALE_PRESALE,
  SALE_PUBLICSALE,
  //   SALE_ENDED,
  MAXIMUM_PRESALE_MINTABLE,
  MAXIMUM_PUBLICSALE_MINTABLE,
} from "../../config/contants";

import { ReactComponent as LoadingGear } from "../../assets/icon/LoadingGear.svg";
import { ReactComponent as LoadingDNA } from "../../assets/icon/LoadingDNA.svg";
import { ReactComponent as BounceCheck } from "../../assets/icon/BounceCheck.svg";
import { ReactComponent as BounceFail } from "../../assets/icon/BounceFail.svg";
import { ReactComponent as BounceInfo } from "../../assets/icon/BounceInfo.svg";
import { ReactComponent as BounceFactory } from "../../assets/icon/BounceFactory.svg";

const Mint = () => {
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);
  const saleStatus = useStore((state) => state.saleStatus);
  const setSaleStatus = useStore((state) => state.setSaleStatus);
  const web3Util = useStore((state) => state.web3Util);
  const setWeb3Util = useStore((state) => state.setWeb3Util);
  const mintQuantity = useStore((state) => state.mintQuantity);
  const setMintQuantity = useStore((state) => state.setMintQuantity);
  const setMyTokens = useStore((state) => state.setMyTokens);
  const setItems = useStore((state) => state.setItems);

  useEffect(() => {
    if (web3Util.status === false) {
      getCurrentWalletConnected().then((data) => {
        setWeb3Util(data);
      });
    }
    if (saleStatus.status === false) {
      getSaleStatus().then((data) => {
        setSaleStatus(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const notifyMintResponse = (response) => {
    notify(
      response.status ? "success" : "error",
      response.status ? (
        <BounceCheck className="w-16 h-16" />
      ) : (
        <BounceFail className="w-16 h-16" />
      ),
      response.status ? "Great!" : "Something Wrong!",
      response.message
    );
    if (response.status) setMyTokens([]) && setItems([]);
  };

  const onMintPressed = async () => {
    if (web3Util.status === true) {
      setTxLoading(true);
      if (saleStatus.saleStage === SALE_PRESALE) {
        const data = await checkIfBlackList();
        if (data.status === false) {
          // provider error
          walletConnectNotify();
        } else if (data.isBlackList === false) {
          const response = await requestMint(mintQuantity, saleStatus.price);
          notifyMintResponse(response);
        } else {
          notify(
            "info",
            <BounceInfo className="w-16 h-16" />,
            "😢 You can't mint more!",
            "You have already bought items. Don't worry you can mint more at public sale!"
          );
        }
      } else if (saleStatus.saleStage === SALE_PUBLICSALE) {
        const response = await requestMint(mintQuantity, saleStatus.price);
        notifyMintResponse(response);
      } else {
        notify(
          "info",
          <BounceInfo className="w-16 h-16" />,
          "😢 Sale is not open!",
          "Don't worry, You can mint more at public sale!"
        );
      }
      setTxLoading(false);
    } else {
      walletConnectNotify();
    }
  };

  const setQuantity = (_mintQuantity) => {
    if (_mintQuantity < 1) _mintQuantity = 1;
    if (saleStatus.saleStage === SALE_PRESALE)
      _mintQuantity =
        _mintQuantity > MAXIMUM_PRESALE_MINTABLE
          ? MAXIMUM_PRESALE_MINTABLE
          : _mintQuantity;
    if (saleStatus.saleStage === SALE_PUBLICSALE)
      _mintQuantity =
        _mintQuantity > MAXIMUM_PUBLICSALE_MINTABLE
          ? MAXIMUM_PUBLICSALE_MINTABLE
          : _mintQuantity;
    setMintQuantity(_mintQuantity);
  };

  const wei2Eth = (wei) => wei / 10 ** 18 + " ETH";

  return (
    <div className="container mx-auto flex flex-col fade-in">
      <div className="w-full flex flex-col-reverse md:flex-row">
        <div className="w-full">
          <div className="px-5 h-full flex flex-col content-center">
            {!loading && (
              <div className="m-auto">
                <h1>{saleStatus.message}</h1>
                <p className="text-2xl pt-5">
                  Price {wei2Eth(saleStatus.price)}
                </p>
                {txLoading && <LoadingDNA className="w-64 h-64 m-auto" />}
                {!txLoading && (
                  <div className="flex mt-5 gap-x-10">
                    <button
                      className="round-button bg-emerald-700 focus:ring-emerald-500 my-auto"
                      onClick={onMintPressed}
                    >
                      Mint
                    </button>
                    <div className="flex gap-x-2">
                      <button
                        className="counter-button"
                        onClick={() => setQuantity(mintQuantity - 1)}
                      >
                        ➖
                      </button>
                      <button className="counter-button text-2xl">
                        {mintQuantity}
                      </button>
                      <button
                        className="counter-button"
                        onClick={() => setQuantity(mintQuantity + 1)}
                      >
                        ➕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            {loading && <LoadingGear className="w-64 h-64 m-auto" />}
          </div>
        </div>
        <div className="w-full">
          <div className="p-0 lg:p-5">
            <BounceFactory className="m-auto h-96 w-96" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
