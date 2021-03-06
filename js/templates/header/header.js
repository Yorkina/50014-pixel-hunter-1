export default (stats, state) => {
  const showStats = stats ? stats(state) : ``;

  return `<header class="header">
    <div class="header__back">
      <span class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.png" width="101" height="44">
      </span>
    </div>
    ${showStats}
  </header>`;
};
