export default (timer) => {
  return Object.assign({}, timer, {time: timer.time - 1, answers: Array.from(timer.answers)});
};
