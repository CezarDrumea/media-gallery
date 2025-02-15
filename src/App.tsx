import MediaGrid from './layouts/MediaGrid';
import SideBar from './layouts/SideBar';
import TopBar from './layouts/TopBar';

function App() {
  return (
    <div className='grid grid-cols-[14.5rem_1fr] grid-rows-[4rem_1fr] h-screen'>
      <SideBar />
      <TopBar />
      <MediaGrid />
    </div>
  );
}

export default App;
