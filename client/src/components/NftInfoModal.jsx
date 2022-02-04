/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";

export default function NftInfoModal({ show, nftId, setModalShow }) {
  const cancelButtonRef = useRef(null);
  const [nftMetadata, setNftMetadata] = useState({});
  useEffect(() => {
    // console.log(nftId);
    setNftMetadata({});
    fetch(
      `https://ikzttp.mypinata.cloud/ipfs/QmQFkLSQysj94s5GvTHPyzTxrawwtjgiiYS2TBLgrvw8CW/${nftId}`
    )
      .then((response) => response.json())
      .then((data) => setNftMetadata(data));
  }, [nftId]);
  return (
    Object.keys(nftMetadata).length && (
      <Transition.Root show={show} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setModalShow}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-slate-200 dark:bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle lg:w-full w-11/12 max-w-6xl">
                <div className="gap-x-10 shadow-me rounded overflow-hidden grid md:grid-cols-12 grid-cols-1  mx-auto">
                  <div className="col-span-6 square">
                    <img
                      className="lg:w-full mx-auto square "
                      src={nftMetadata.image}
                    />
                  </div>
                  <div className="h-full col-span-6 md:pr-10 md:pl-0 px-6 md:py-0 py-6 flex-col w-full flex justify-center">
                    <div className="pb-3 border-opacity-10 flex flex space-between items-end border-opacity-10 w-full border-bb border-black">
                      <div>
                        <h1 className="uppercase text-2xs font-400 tracking-widest opacity-70">
                          Airseekr #{nftId}
                        </h1>
                      </div>
                      <a
                        target="_blank"
                        href={`https://opensea.io/assets/0xed5af388653567af2f388e6224dc7c4b3241c544/${nftId}`}
                        title="View on OpenSea"
                        className="ml-auto hover:opacity-80 duration-200"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className=" fill-current stroke-current h-6 w-6 mb-1 "
                          viewBox="0 0 40 40"
                        >
                          <path d="M20 1C9.508 1 1 9.508 1 20s8.508 19 19 19 19-8.508 19-19S30.496 1 20 1Zm-9.625 19.638.08-.129 4.943-7.733c.072-.11.243-.099.297.023.824 1.85 1.539 4.153 1.204 5.586-.14.589-.532 1.387-.973 2.124a3.808 3.808 0 0 1-.186.316.168.168 0 0 1-.14.072h-5.081a.168.168 0 0 1-.144-.259Zm22.028 2.66a.172.172 0 0 1-.102.16c-.384.163-1.695.768-2.239 1.524-1.39 1.934-2.45 4.7-4.826 4.7h-9.902c-3.512 0-6.354-2.853-6.354-6.376v-.114a.17.17 0 0 1 .171-.167h5.518c.11 0 .19.099.182.209-.042.357.027.726.198 1.06a1.94 1.94 0 0 0 1.74 1.08h2.732V23.24H16.82a.175.175 0 0 1-.14-.273 20.887 20.887 0 0 0 1.083-1.714c.247-.433.486-.897.68-1.36.038-.084.068-.171.103-.255.053-.148.106-.289.144-.426.038-.117.072-.239.103-.353.09-.395.129-.813.129-1.246 0-.171-.008-.35-.023-.517a6.939 6.939 0 0 0-.053-.559c-.015-.163-.046-.327-.076-.494a10.282 10.282 0 0 0-.156-.74l-.023-.096c-.045-.17-.087-.33-.14-.501a18.721 18.721 0 0 0-.521-1.54 8.252 8.252 0 0 0-.224-.562c-.114-.281-.232-.536-.338-.775a5.642 5.642 0 0 1-.149-.312c-.053-.114-.106-.228-.163-.338-.038-.083-.084-.163-.114-.24l-.334-.615c-.046-.083.03-.186.121-.16l2.09.567h.015l.274.08.304.083.11.03V9.688c0-.6.479-1.087 1.076-1.087.296 0 .566.122.756.32.194.197.315.467.315.767v1.843l.224.06c.016.008.035.016.05.027.053.038.133.099.232.175.08.06.163.137.262.217.201.163.444.372.707.611.068.061.136.122.201.187.338.315.718.684 1.083 1.094.103.118.201.232.304.357.099.126.209.247.3.369.126.163.255.334.373.513.053.083.117.17.167.254.152.225.281.456.406.688.054.107.107.224.152.338.141.312.251.627.32.947.022.068.038.14.045.209v.015c.023.091.03.19.038.292.03.323.015.65-.053.977a4.37 4.37 0 0 1-.114.407c-.05.133-.095.27-.156.402-.118.27-.254.544-.418.795-.053.095-.118.193-.178.288-.069.1-.141.194-.202.285a6.16 6.16 0 0 1-.273.35c-.084.114-.168.228-.263.33-.129.156-.254.3-.387.441-.076.092-.16.187-.247.27-.084.095-.171.179-.247.255-.133.133-.24.232-.33.319l-.217.194a.16.16 0 0 1-.114.045h-1.665v2.132h2.094c.467 0 .912-.163 1.273-.471.122-.106.657-.57 1.292-1.27a.15.15 0 0 1 .08-.049l5.78-1.672a.17.17 0 0 1 .216.164v1.223Z"></path>
                        </svg>
                      </a>
                    </div>
                    <ul className="pt-2 max-w-xl lg:grid-cols-2 gap-3 lg:grid hidden tracking-wider">
                      {nftMetadata.attributes.map((trait, index) => (
                        <li
                          key={index}
                          className="text-sm items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black"
                        >
                          <img
                            className="w-8 pr-2"
                            src={`https://azuki.com/filtericons/Black/${trait.trait_type}.png`}
                          />
                          <div>
                            <p className="flex items-center uppercase opacity-60 mr-auto inline-block">
                              <span className="pt-px">{trait.trait_type}:</span>
                            </p>
                            <p className="ml-auto text-sm font-600 uppercase">
                              {trait.value}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="overflow-hidden lg:hidden block">
                      <div>
                        <div
                          className="flex space-x-2 "
                          style={{ transform: "translate3d(50%, 0px, 0px)" }}
                        >
                          <div className="embla__slidegallery text-xs items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black">
                            <img
                              className="w-8 pr-2"
                              src="/filtericons/Black/Type.png"
                            />
                            <div>
                              <p className="flex items-center uppercase opacity-60  text-2xs tracking-wider mr-auto inline-block">
                                <span className="pt-px">Type:</span>
                              </p>
                              <p className="ml-auto text-xs font-600 uppercase">
                                Human
                              </p>
                            </div>
                          </div>
                          <div className="embla__slidegallery text-xs items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black">
                            <img
                              className="w-8 pr-2"
                              src="/filtericons/Black/Hair.png"
                            />
                            <div>
                              <p className="flex items-center uppercase opacity-60  text-2xs tracking-wider mr-auto inline-block">
                                <span className="pt-px">Hair:</span>
                              </p>
                              <p className="ml-auto text-xs font-600 uppercase">
                                Brown Ponytail
                              </p>
                            </div>
                          </div>
                          <div className="embla__slidegallery text-xs items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black">
                            <img
                              className="w-8 pr-2"
                              src="/filtericons/Black/Clothing.png"
                            />
                            <div>
                              <p className="flex items-center uppercase opacity-60  text-2xs tracking-wider mr-auto inline-block">
                                <span className="pt-px">Clothing:</span>
                              </p>
                              <p className="ml-auto text-xs font-600 uppercase">
                                Light Kimono
                              </p>
                            </div>
                          </div>
                          <div className="embla__slidegallery text-xs items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black">
                            <img
                              className="w-8 pr-2"
                              src="/filtericons/Black/Eyes.png"
                            />
                            <div>
                              <p className="flex items-center uppercase opacity-60  text-2xs tracking-wider mr-auto inline-block">
                                <span className="pt-px">Eyes:</span>
                              </p>
                              <p className="ml-auto text-xs font-600 uppercase">
                                Concerned
                              </p>
                            </div>
                          </div>
                          <div className="embla__slidegallery text-xs items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black">
                            <img
                              className="w-8 pr-2"
                              src="/filtericons/Black/Mouth.png"
                            />
                            <div>
                              <p className="flex items-center uppercase opacity-60  text-2xs tracking-wider mr-auto inline-block">
                                <span className="pt-px">Mouth:</span>
                              </p>
                              <p className="ml-auto text-xs font-600 uppercase">
                                Tongue Out
                              </p>
                            </div>
                          </div>
                          <div className="embla__slidegallery text-xs items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black">
                            <img
                              className="w-8 pr-2"
                              src="/filtericons/Black/Offhand.png"
                            />
                            <div>
                              <p className="flex items-center uppercase opacity-60  text-2xs tracking-wider mr-auto inline-block">
                                <span className="pt-px">Offhand:</span>
                              </p>
                              <p className="ml-auto text-xs font-600 uppercase">
                                Golden Bean
                              </p>
                            </div>
                          </div>
                          <div className="embla__slidegallery text-xs items-center py-2 px-3 flex rounded bg-white bg-opacity-10 w-full border-black">
                            <img
                              className="w-8 pr-2"
                              src="/filtericons/Black/Background.png"
                            />
                            <div>
                              <p className="flex items-center uppercase opacity-60  text-2xs tracking-wider mr-auto inline-block">
                                <span className="pt-px">Background:</span>
                              </p>
                              <p className="ml-auto text-xs font-600 uppercase">
                                Off White D
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:hidden flex mt-4 space-x-1 mx-auto">
                      <button
                        className="h-px w-4 bg-black opacity-100"
                        type="button"
                      ></button>
                      <button
                        className="h-px w-4 bg-black opacity-40"
                        type="button"
                      ></button>
                      <button
                        className="h-px w-4 bg-black opacity-40"
                        type="button"
                      ></button>
                      <button
                        className="h-px w-4 bg-black opacity-40"
                        type="button"
                      ></button>
                      <button
                        className="h-px w-4 bg-black opacity-40"
                        type="button"
                      ></button>
                      <button
                        className="h-px w-4 bg-black opacity-40"
                        type="button"
                      ></button>
                      <button
                        className="h-px w-4 bg-black opacity-40"
                        type="button"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    )
  );
}
