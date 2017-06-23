export default (timer) => {
  return Object.assign({}, timer, {time: timer.time - 1});
};
