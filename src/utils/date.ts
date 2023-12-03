export const convertToKoreanTime = (date: number) => {
  const minutes = Math.floor(date / 60);

  return `${minutes}분`;
};
