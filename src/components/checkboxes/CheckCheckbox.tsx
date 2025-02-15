import CheckIcon from '../icons/CheckIcon';

const CheckCheckbox = ({
  className,
  checked = false,
  onCheck,
}: {
  className?: string;
  checked?: boolean;
  onCheck?: () => void;
}) => {
  return (
    <div
      onClick={onCheck}
      className={`${className} w-4 h-4 flex justify-center items-center rounded-sm cursor-pointer ${
        checked ? 'bg-primary-100' : 'border-1 border-secondary-20'
      }`}
    >
      {checked && <CheckIcon />}
    </div>
  );
};

export default CheckCheckbox;
