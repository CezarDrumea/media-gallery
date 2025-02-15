const CubicCheckbox = ({
  className,
  checked = false,
  onToggleSelectAll,
}: {
  className?: string;
  checked?: boolean;
  onToggleSelectAll?: () => void;
}) => {
  return (
    <div
      onClick={onToggleSelectAll}
      className={`${className} w-4 h-4 flex justify-center items-center rounded-sm cursor-pointer border-1 border-secondary-20`}
    >
      {checked && <div className='w-2 h-2 bg-primary-100' />}
    </div>
  );
};

export default CubicCheckbox;
