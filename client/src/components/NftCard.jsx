import { useState } from "react";

const NftCard = ({ nftId, clickHandler }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <a
      className="group cursor-pointer fade-in text-sm lg:-20 duration-300"
      onClick={() => clickHandler()}
    >
      <div className="w-full fade-in lg:group-hover:scale-105 group-hover:shadow-me duration-300 rounded-xl aspect-square overflow-hidden bg-gray-100 shadow-me">
        {!imageFailed && (
          <img
            src={`https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${nftId}.png`}
            alt={`Image for ${nftId}`}
            className="duration-300 w-full h-full object-center object-cover"
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={() => setImageFailed(true)}
          ></img>
        )}
      </div>
      <p className="font-bolder mt-3 uppercase tracking-widest text-3xs text-center">
        Airseekr
      </p>
      <h3 className="bluetext dark:goldentext font-black pb-2 -mt-1 text-2xs text-center uppercase">
        No. {nftId}
      </h3>
    </a>
  );
};

export default NftCard;
