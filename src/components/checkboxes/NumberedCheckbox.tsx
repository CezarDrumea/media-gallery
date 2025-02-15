const NumberedCheckbox = ({
  className,
  order = 0,
  onSelect,
}: {
  className?: string;
  order?: number;
  onSelect?: () => void;
}) => {
  const checked = order > 0;

  return (
    <div
      onClick={onSelect}
      className={`${className} min-w-5 p-[2px] h-5 flex justify-center items-center rounded-sm cursor-pointer  ${
        checked
          ? 'bg-primary-100 text-[0.625rem] text-neutral-100'
          : 'border-1 border-neutral-100'
      }`}
    >
      {checked && order}
    </div>
  );
};

export default NumberedCheckbox;
