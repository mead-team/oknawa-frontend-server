export const PlusIcon = ({
  color = '#18C964',
  width = '54',
  height = '54',
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 54 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.9997 0.333008C12.2797 0.333008 0.333008 12.2797 0.333008 26.9997C0.333008 41.7197 12.2797 53.6663 26.9997 53.6663C41.7197 53.6663 53.6663 41.7197 53.6663 26.9997C53.6663 12.2797 41.7197 0.333008 26.9997 0.333008ZM40.333 29.6663H29.6663V40.333H24.333V29.6663H13.6663V24.333H24.333V13.6663H29.6663V24.333H40.333V29.6663Z"
        fill={color}
      />
    </svg>
  );
};
