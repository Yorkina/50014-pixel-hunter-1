export default (type, ammount) => {
  const extraTypes = {
    slow: `Штраф за медлительность`,
    fast: `Бонус за скорость`,
    heart: `Бонус за жизни`
  };

  return `<td class="result__extra">${(extraTypes[type] + `:`) || ``}</td>
  <td class="result__extra">${ammount}&nbsp;
    <span class="stats__result stats__result--${type}"></span></td>`;
};
