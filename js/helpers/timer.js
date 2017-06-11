export default (element, initialTime, handler) => {
  let time = 15;
  const timer = () => {
    element.textContent = --time;

    if (time === 0) {
      stopTimer();
      const event = new CustomEvent(`timeIsOver`);
      document.dispatchEvent(event);
      document.removeEventListener(`timeIsOver`, handler);
    }
  };

  const interval = setInterval(() => timer(), 1000);

  const stopTimer = () => {
    clearInterval(interval);
  };

  return stopTimer;
};
