const VideoIcon = ({
  className,
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) => {
  return (
    <svg
      width={filled ? '17' : '16'}
      height={filled ? '17' : '16'}
      viewBox={`0 0 ${filled ? '17 17' : '16 16'}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d={`${
          filled
            ? 'M4.89148 2.50975C4.1415 2.08119 3.20833 2.62272 3.20833 3.48652L3.20833 13.7633C3.20833 14.6271 4.1415 15.1687 4.89148 14.7401L13.8837 9.60171C14.6395 9.16983 14.6395 8.08004 13.8837 7.64816L4.89148 2.50975Z'
            : 'M2.875 2.86159C2.875 1.99778 3.80817 1.45625 4.55816 1.88481L13.5504 7.02322C14.3062 7.4551 14.3062 8.54489 13.5504 8.97677L4.55816 14.1152C3.80817 14.5437 2.875 14.0022 2.875 13.1384V2.86159ZM4.125 3.07698V12.923L12.7403 8L4.125 3.07698Z'
        }`}
        fill='currentcolor'
      />
    </svg>
  );
};

export default VideoIcon;
