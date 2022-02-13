import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "../../utils/store";

import GalleryButton from "../../components/GalleryButton";
import Filter from "./Components/Filter";
import NftCard from "../../components/NftCard";
import NftInfoModal from "../../components/NftInfoModal";
import { notify, walletConnectNotify } from "../../utils/toast";

import { ReactComponent as MyItems } from "../../assets/icon/MyItems.svg";
import { ReactComponent as Shuffle } from "../../assets/icon/Shuffle.svg";
import { ReactComponent as FilterSvg } from "../../assets/icon/Filter.svg";
import { ReactComponent as LoadingBricks } from "../../assets/icon/LoadingBricks.svg";

import {
  getMyTokens,
  getCurrentWalletConnected,
  getTotalSupply,
} from "../../utils/interactWeb3";
const Gallery = () => {
  const web3Util = useStore((state) => state.web3Util);
  const setWeb3Util = useStore((state) => state.setWeb3Util);
  const galleryData = useStore((state) => state.galleryData);
  const setItems = useStore((state) => state.setItems);
  const setMyTokens = useStore((state) => state.setMyTokens);
  const setTotalSupply = useStore((state) => state.setTotalSupply);

  const [hasMore, setHasMore] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [curNft, setCurNft] = useState(0);

  const [curPage, setCurPage] = useState(true); // true => gallery, false => my items

  useEffect(() => {
    if (web3Util.status === false) {
      getCurrentWalletConnected().then((data) => {
        setWeb3Util(data);
      });
    }
    if (galleryData.items.length === 0) {
      getTotalSupply().then((data) => {
        setTotalSupply(data.totalSupply);
        setItems(
          Array.from(
            Array(data.totalSupply > 20 ? 20 : data.totalSupply).keys()
          )
        );
        setHasMore(true);
        setHidden(false);
      });
    } else {
      setHasMore(true);
      setHidden(false);
    }
  }, []);

  const fetchMoreData = () => {
    if (galleryData.items.length >= galleryData.totalSupply) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      const newArray = [];
      let _concatLength = galleryData.totalSupply - galleryData.items.length;
      _concatLength = _concatLength > 20 ? 20 : _concatLength;
      Array.from(Array(_concatLength).keys()).map((i) =>
        newArray.push(i + galleryData.items.length)
      );
      setItems(galleryData.items.concat(newArray));
    }, 500);
  };
  const shuffleItems = () => {
    setHidden(true);
    const _items = galleryData.items.sort(() => 0.5 - Math.random());
    setItems(_items);
    setTimeout(() => setHidden(false), 300);
    // setHidden(false);
  };
  const fetchMyToken = async () => {
    setHidden(true);
    setCurPage(false);
    if (galleryData.myTokens.length === 0) {
      let { tokens, status } = await getMyTokens();
      if (status === false) {
        setHidden(false);
        walletConnectNotify();
        return;
      }
      tokens = tokens.map(function (item) {
        return parseInt(item);
      });
      setMyTokens(tokens);
      setHasMore(false);
    }
    setTimeout(() => setHidden(false), 300);
  };
  return (
    <div className="container mx-auto flex">
      <NftInfoModal
        show={modalShow}
        setModalShow={setModalShow}
        nftId={curNft}
      />
      <Filter />
      <div className="lg:w-3/4 lg:px-8 w-full lg:pt-0 pt-16">
        <div className="top-[7.5rem] lg:top-0 lg:mt-0 left-0 px-6 duration-300 lg:px-0 fixed w-full lg:relative z-5 flex items-end justify-between h-14 lg:h-20  lg:pb-4 pb-3 border-b border-opacity-10 border-white backdrop-filter backdrop-blur-lg">
          <h1 className="lg:text-4xl text-lg uppercase font-extrabold tracking-tight">
            <span className="dark:goldentext bluetext">
              {`Items // ${
                curPage ? galleryData.totalSupply : galleryData.myTokens.length
              }`}
            </span>
          </h1>
          <div className="flex items-center pb-0">
            {curPage && (
              <GalleryButton
                text="My Items"
                clickHandler={fetchMyToken}
                icon={<MyItems />}
              />
            )}
            {!curPage && (
              <GalleryButton
                text="Return to All"
                clickHandler={() => setCurPage(true)}
                icon={<MyItems />}
              />
            )}
            {curPage && (
              <GalleryButton
                text="Shuffle"
                clickHandler={shuffleItems}
                icon={<Shuffle />}
              />
            )}
            <GalleryButton
              text="Filter"
              className="lg:hidden flex hover:opacity-50 py-1 px-2 lg:py-2 lg:px-4 rounded bg-slate-200 dark:bg-gray-900"
              textClassName="uppercase pt-0.5 pl-2 "
              clickHandler={fetchMyToken}
              icon={<FilterSvg />}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={galleryData.items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          // loader={<h4>Loading...</h4>}
        >
          <div className="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1 lg:col-span-3 p-2">
            {!hidden &&
              (curPage ? galleryData.items : galleryData.myTokens).map(
                (i, index) => (
                  <NftCard
                    key={index}
                    nftId={i}
                    clickHandler={() => {
                      setModalShow(true);
                      setCurNft(i);
                    }}
                  />
                )
              )}
            {hidden && <LoadingBricks className="m-auto col-span-full" />}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Gallery;
