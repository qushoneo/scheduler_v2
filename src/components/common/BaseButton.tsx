interface BaseButtonProps extends React.HTMLProps<HTMLButtonElement> {
  text: string;
}

export const BaseButton = ({
  className = "",
  text,
  onClick,
}: BaseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "h-9 w-32 bg-sky-100 hover:bg-sky-200 rounded duration-300 " + className
      }
    >
      {text}
    </button>
  );
};
