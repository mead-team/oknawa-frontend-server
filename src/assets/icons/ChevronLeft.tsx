interface ChevronLeftProps {
  size?: 'm' | 'l';
}

export const ChevronLeft = ({ size = 'm' }: ChevronLeftProps) => {
  const dimensions =
    size === 'l' ? { width: 40, height: 40 } : { width: 24, height: 24 };

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_406_3811)">
        <path
          d="M14.691 4.79376C14.2805 4.40208 13.6185 4.40208 13.208 4.79376L6.24508 11.4365C5.91831 11.7482 5.91831 12.2518 6.24508 12.5635L13.208 19.2062C13.6185 19.5979 14.2805 19.5979 14.691 19.2062C15.1016 18.8145 15.1016 18.1831 14.691 17.7914L8.62469 11.996L14.6994 6.20064C15.1016 5.81695 15.1016 5.17746 14.691 4.79376Z"
          fill="#777780"
        />
      </g>
      <defs>
        <clipPath id="clip0_406_3811">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
