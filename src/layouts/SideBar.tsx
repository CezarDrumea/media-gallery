import Filters from '../components/Filters';
import Folders from '../components/Folders';
import LogoTitle from '../components/LogoTitle';

const SideBar = () => {
  return (
    <aside className='p-4 pr-2 flex flex-col gap-8 row-span-2'>
      <LogoTitle />
      <Folders />
      <Filters />
    </aside>
  );
};

export default SideBar;
