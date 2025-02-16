import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { selectSearchedMedia } from '../app/selectors';
import EmptyFolderIcon from '../components/icons/EmptyFolderIcon';
import MediaCard from '../components/MediaCard';
import ViewModal from '../components/ViewModal';

const MediaGrid = () => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [openModalProps, setOpenModalProps] = useState({
    src: '',
    description: '',
  });
  const handleOpenViewModal =
    (src: string, description: string) => (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsViewModalOpen(true);
      setOpenModalProps({ src, description });
    };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setOpenModalProps({ src: '', description: '' });
  };

  const files = useAppSelector(selectSearchedMedia);
  const isEmpty = files.length === 0;

  return (
    <main
      className={`overflow-auto m-2 col-start-2 row-start-2 grid ${
        isEmpty
          ? 'place-content-center border-1 border-dashed border-secondary-20 bg-neutral-80 rounded-xl'
          : 'gap-4 grid-cols-[repeat(auto-fill,185px)] grid-rows-[repeat(auto-fill,213px)]'
      }`}
    >
      {isEmpty ? (
        <div className='flex flex-col items-center'>
          <EmptyFolderIcon className='mb-6' />
          <p className='text-3xl font-medium text-secondary-100 mb-2'>
            This folder is empty
          </p>
          <p className='text-secondary-80'>Add images, videos and GIFs.</p>
        </div>
      ) : (
        <>
          {files.map((file) => (
            <MediaCard
              {...file}
              key={file.id}
              onOpenModal={handleOpenViewModal}
            />
          ))}
        </>
      )}
      {isViewModalOpen && (
        <ViewModal
          onClose={handleCloseViewModal}
          src={openModalProps.src}
          description={openModalProps.description}
        />
      )}
    </main>
  );
};

export default MediaGrid;
