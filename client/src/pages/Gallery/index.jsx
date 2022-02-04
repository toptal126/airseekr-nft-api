import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import GalleryButton from "../../components/GalleryButton";
import Filter from "./Components/Filter";
import NftCard from "../../components/NftCard";
import NftInfoModal from "../../components/NftInfoModal";

import { ReactComponent as MyItems } from "../../assets/icon/MyItems.svg";
import { ReactComponent as Shuffle } from "../../assets/icon/Shuffle.svg";
import { ReactComponent as FilterSvg } from "../../assets/icon/Filter.svg";

const Gallery = () => {
  const [items, setItems] = useState(Array.from(Array(20).keys()));
  const [hasMore, setHasMore] = useState(true);
  const [hidden, setHidden] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [curNft, setCurNft] = useState(0);

  useEffect(() => {
    setTimeout(() => setHidden(false), 1000);
  }, []);

  const fetchMoreData = () => {
    if (items.length >= 10000) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      const newArray = [];
      Array.from(Array(20).keys()).map((i) => newArray.push(i + items.length));
      setItems(items.concat(newArray));
    }, 500);
  };
  const shuffleItems = () => {
    setHidden(true);
    setTimeout(() => setHidden(false), 1000);
    setItems(items.sort(() => 0.5 - Math.random()));
  };
  return (
    <div className="container mx-auto flex">
      <NftInfoModal
        show={modalShow}
        setModalShow={setModalShow}
        nftId={curNft}
      />
      <Filter />
      <div className="lg:w-3/4 lg:px-8 w-full">
        <div className="top-24 mt-2 lg:top-0 lg:mt-0 lg:bg-transparent left-0 px-6 pt-26 lg:pt-0 duration-300 lg:px-0 fixed w-full lg:relative z-5 flex items-end justify-between h-14  lg:pb-4 pb-3 border-b border-opacity-10 border-white bg-black">
          <h1 className="lg:text-4xl text-lg uppercase font-extrabold tracking-tight">
            <span className="dark:goldentext bluetext">Items</span>
          </h1>
          <div className="flex items-center pb-0">
            <GalleryButton
              text="My Items"
              clickHandler={() => alert(1)}
              icon={<MyItems />}
            />
            <GalleryButton
              text="Shuffle"
              clickHandler={() => shuffleItems()}
              icon={<Shuffle />}
            />
            <GalleryButton
              text="Filter"
              className="lg:hidden flex hover:opacity-50 py-1 px-2 lg:py-2 lg:px-4 rounded bg-slate-200 dark:bg-gray-900"
              textClassName="uppercase pt-0.5 pl-2 "
              clickHandler={() => alert("Filter")}
              icon={<FilterSvg />}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid lg:grid-cols-4 2xl:grid-cols-5 grid-cols-2 lg:gap-x-6 gap-x-4 lg:gap-y-2 gap-y-1 lg:col-span-3 pt-2">
            {!hidden &&
              items.map((i, index) => (
                <NftCard
                  key={index}
                  nftId={i}
                  clickHandler={() => {
                    setModalShow(true);
                    setCurNft(i);
                  }}
                />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Gallery;
