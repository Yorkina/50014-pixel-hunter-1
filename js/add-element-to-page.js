export default (view) => {
  const container = document.querySelector(`.central`);
  container.innerHTML = ``;
  container.appendChild(view.element);
};
