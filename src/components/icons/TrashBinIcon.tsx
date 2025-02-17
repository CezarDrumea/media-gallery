const TrashBinIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      fill='currentcolor'
      width='16'
      height='16'
      viewBox='0 0 32 32'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <g strokeLinecap='round' strokeLinejoin='round'></g>
      <g>
        <g>
          <rect height='12' width='2' x='15' y='12'></rect>
          <rect height='12' width='2' x='19' y='12'></rect>
          <rect height='12' width='2' x='11' y='12'></rect>
          <path d='M20,6V5a3,3,0,0,0-3-3H15a3,3,0,0,0-3,3V6H4V8H6V27a3,3,0,0,0,3,3H23a3,3,0,0,0,3-3V8h2V6ZM14,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H14ZM24,27a1,1,0,0,1-1,1H9a1,1,0,0,1-1-1V8H24Z'></path>
        </g>
      </g>
    </svg>
  );
};

export default TrashBinIcon;
