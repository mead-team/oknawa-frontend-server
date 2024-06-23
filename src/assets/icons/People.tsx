export const PeopleIcon = ({
  width = '54',
  height = '54',
  color = '#18C964',
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
        d="M26.9733 0.333008C12.2533 0.333008 0.306641 12.2797 0.306641 26.9997C0.306641 41.7197 12.2533 53.6663 26.9733 53.6663C41.6933 53.6663 53.64 41.7197 53.64 26.9997C53.64 12.2797 41.6933 0.333008 26.9733 0.333008ZM36.6 17.2397C39.4533 17.2397 41.7466 19.533 41.7466 22.3863C41.7466 25.2397 39.4533 27.533 36.6 27.533C33.7466 27.533 31.4533 25.2397 31.4533 22.3863C31.4266 19.533 33.7466 17.2397 36.6 17.2397ZM20.6 13.0263C24.0666 13.0263 26.8933 15.853 26.8933 19.3197C26.8933 22.7863 24.0666 25.613 20.6 25.613C17.1333 25.613 14.3066 22.7863 14.3066 19.3197C14.3066 15.8263 17.1066 13.0263 20.6 13.0263ZM20.6 37.373V47.373C14.2 45.373 9.13331 40.4397 6.89331 34.1463C9.69331 31.1597 16.68 29.6397 20.6 29.6397C22.0133 29.6397 23.8 29.853 25.6666 30.2263C21.2933 32.5463 20.6 35.613 20.6 37.373ZM26.9733 48.333C26.2533 48.333 25.56 48.3063 24.8666 48.2263V37.373C24.8666 33.5863 32.7066 31.693 36.6 31.693C39.4533 31.693 44.3866 32.733 46.84 34.7597C43.72 42.6797 36.0133 48.333 26.9733 48.333Z"
        fill={color}
      />
    </svg>
  );
};
