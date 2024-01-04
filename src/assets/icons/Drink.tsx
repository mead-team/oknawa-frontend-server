export const DrinkIcon = ({ color = 'white', width = '12', height = '12' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="drink" clipPath="url(#clip0_97_301)">
        <path
          id="Vector"
          d="M10.5 2.225C10.5 1.825 10.175 1.5 9.775 1.5H2.225C1.825 1.5 1.5 1.825 1.5 2.225C1.5 2.4 1.565 2.575 1.685 2.705L5.5 7V9.5H3.5C3.225 9.5 3 9.725 3 10C3 10.275 3.225 10.5 3.5 10.5H8.5C8.775 10.5 9 10.275 9 10C9 9.725 8.775 9.5 8.5 9.5H6.5V7L10.315 2.705C10.435 2.575 10.5 2.4 10.5 2.225ZM3.715 3.5L2.83 2.5H9.175L8.285 3.5H3.715Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_97_301">
          <rect width="12" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
