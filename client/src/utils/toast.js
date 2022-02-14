import toast from "react-hot-toast";

import { ReactComponent as BounceFail } from "../assets/icon/BounceFail.svg";

export const notify = (type, icon, title, text, position = false) =>
  toast.custom(
    (t) => (
      <div
        onClick={() => toast.dismiss(t.id)}
        className={`${
          t.visible ? "toast-enter" : "toast-leave"
        } toast-wrapper toast-${type}`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5 m-auto">{icon}</div>
            <div className="ml-3 flex-1">
              <p className="text-2xl toast-title">{title}</p>
              <p className="mt-1 text-xl">{text}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    position && { position: position }
  );

export const walletConnectNotify = () => {
  notify(
    "error",
    <BounceFail className="w-24 h-24" />,
    "Wallet Connet",
    "Please connect MetaMask or any other wallet"
  );
};

export const notifyEvent = (type, icon, title, text) => {
  notify(type, icon, title, text, "bottom-right");
};
