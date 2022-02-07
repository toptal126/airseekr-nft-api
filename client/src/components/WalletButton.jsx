const WalletButton = ({
  text,
  detail,
  icon,
  clickHandler,
  className,
  textClassName,
}) => {
  const _textClassName =
    textClassName != undefined
      ? textClassName
      : "hidden lg:block pt-0.5 pl-2 my-auto text-3xl";
  const _className =
    className != undefined
      ? className
      : "flex flex-col hover:opacity-80 duration-300 py-1 px-1 lg:py-2 lg:px-4 rounded bg-slate-200 dark:bg-gray-900 mr-4 lg:mr-2 w-96 rounded outline outline-gray-400 dark:outline-gray-800 outline-2 shadow-me";
  return (
    <button
      type="button"
      className={_className}
      onClick={() => clickHandler && clickHandler()}
    >
      <div className="flex">
        {icon}
        <span className={_textClassName}>{text}</span>
      </div>
      <p className="text-2xl opacity-80">{detail}</p>
    </button>
  );
};
export default WalletButton;
