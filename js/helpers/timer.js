export default (initialTime) => {
  let time = initialTime;
  const timer = () => {
    --time;

    if (time >= 0) {
      const event = new CustomEvent(`tictac`);
      document.dispatchEvent(event);
    }

    if (time < 0) {
      stopTimer();
    }
  };

  const interval = setInterval(() => timer(), 1000);

  const stopTimer = () => clearInterval(interval);

  return stopTimer;
};
