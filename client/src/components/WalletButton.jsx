const WalletButton = ({
  text,
  detail,
  icon,
  clickHandler,
  className,
  textClassName,
}) => {
  const _textClassName =
    textClassName !== undefined
      ? textClassName
      : "hidden lg:block pt-0.5 my-auto text-3xl w-full text-center";
  const _className =
    className !== undefined
      ? className
      : "flex flex-col hover:opacity-80 duration-300 p-3 rounded bg-slate-200 dark:bg-gray-900 lg:w-96 rounded outline outline-gray-400 dark:outline-gray-800 outline-2 shadow-me fade-in";
  return (
    <button
      type="button"
      className={_className}
      onClick={() => clickHandler && clickHandler()}
    >
      <div className="flex flex-row w-full justify-center lg:justify-between">
        <div className="w-32 h-32">{icon}</div>
        <span className={_textClassName}>{text}</span>
      </div>
      <p className="text-2xl opacity-80">{detail}</p>
    </button>
  );
};
export default WalletButton;
