import { ComponentType } from 'react';
import CheckCheckbox from './checkboxes/CheckCheckbox';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { toggleExtensionFilter } from '../app/slices/mediaSlice';
import { selectExtensionFilters } from '../app/selectors';
import { ExtensionsType } from '../types/file';

interface FilterPropsInterface {
  name: string;
  extension: ExtensionsType;
  quantity: number;
  Icon: ComponentType<{ className?: string }>;
}

const Filter = ({ name, quantity, extension, Icon }: FilterPropsInterface) => {
  const dispatch = useAppDispatch();

  const isChecked = useAppSelector(selectExtensionFilters)[extension];

  const handleIsChecked = () => dispatch(toggleExtensionFilter(extension));

  return (
    <div
      onClick={handleIsChecked}
      className='h-8 flex items-center pr-2 pl-2 text-sm hover:bg-secondary-transparent-5 transition duration-200 rounded-md cursor-pointer'
    >
      <Icon className='text-secondary-80 mr-2' />
      <span className='text-secondary-100 mr-2'>{name}</span>
      <span className='text-secondary-40'>{quantity}</span>
      <CheckCheckbox className='ml-auto' checked={isChecked} />
    </div>
  );
};

export default Filter;
