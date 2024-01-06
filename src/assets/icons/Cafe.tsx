export const CafeIcon = ({ width = '12', height = '12', color = 'white' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="cafe" clipPath="url(#clip0_97_296)">
        <path
          id="Vector"
          d="M10 1.5H3C2.45 1.5 2 1.95 2 2.5V6.5C2 7.605 2.895 8.5 4 8.5H7C8.105 8.5 9 7.605 9 6.5V5H10C10.55 5 11 4.55 11 4V2.5C11 1.95 10.55 1.5 10 1.5ZM10 4H9V2.5H10V4ZM1.5 10.5H9.5C9.775 10.5 10 10.275 10 10C10 9.725 9.775 9.5 9.5 9.5H1.5C1.225 9.5 1 9.725 1 10C1 10.275 1.225 10.5 1.5 10.5Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_97_296">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
