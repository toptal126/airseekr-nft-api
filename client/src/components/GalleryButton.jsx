const GalleryButton = ({
  text,
  icon,
  clickHandler,
  className,
  textClassName,
}) => {
  const _textClassName =
    textClassName != undefined
      ? textClassName
      : "hidden lg:block uppercase pt-0.5 pl-2";
  const _className =
    className != undefined
      ? className
      : "flex hover:opacity-60 duration-300 py-1 px-1 lg:py-2 lg:px-4 rounded bg-slate-200 dark:bg-gray-900 mr-4 lg:mr-2";
  return (
    <button type="button" className={_className} onClick={() => clickHandler()}>
      {icon}
      <span className={_textClassName}>{text}</span>
    </button>
  );
};
export default GalleryButton;
