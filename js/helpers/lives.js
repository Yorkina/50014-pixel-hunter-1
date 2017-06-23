export default (correct, lives) => {
  return correct ? lives : --lives;
};
