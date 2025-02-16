import { createPortal } from 'react-dom';

interface ViewModalPropsInterface {
  onClose: (e: React.MouseEvent) => void;
  src: string;
  description: string;
}

const ViewModal = ({ onClose, src, description }: ViewModalPropsInterface) => {
  const portalElement = document.getElementById('modal');

  if (!portalElement) return null;

  return createPortal(
    <div className='inset-0 z-1' onClick={onClose}>
      <div className='absolute inset-0 bg-secondary-transparent-60 grid place-content-center'>
        <img src={src} alt={description} />
      </div>
    </div>,
    portalElement
  );
};

export default ViewModal;
