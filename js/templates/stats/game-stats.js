import statsData from '../../stats-data';

export default () => {
  const extraTypes = {
    slow: `Штраф за медлительность`,
    fast: `Бонус за скорость`,
    heart: `Бонус за жизни`
  };

  const getAnswers = (answers) => {
    return answers.map((answer) => {
      return `<li class="stats__result stats__result--${answer}"></li>`;
    }).join(``);
  };

  const getExtra = (points) => {
    return points.map((point) => {
      return `<tr><td></td>
        <td class="result__extra">${(extraTypes[point.type] + `:`) || ``}</td>
        <td class="result__extra">${point.extra}&nbsp;<span class="stats__result stats__result--${point.type}"></span></td>
        <td class="result__points">×&nbsp;${point.points}</td>
        <td class="result__total">${(point.extra * point.points)}</td></tr>`;
    }).join(``);
  };

  const createResult = (results) => {
    return results.map((result, index) => {
      return `<table class="result__table">
          <tr>
            <td class="result__number">${index + 1}.</td>
            <td colspan="2">
              <ul class="stats">
                ${getAnswers(result.answers)}
              </ul>
            </td>
            <td class="result__points">×&nbsp;${result.points || 0}</td>
            <td class="result__total">${result.total || 0}</td>
          </tr>
            ${result.correct ? getExtra(result.additionals) : ``}
            <td colspan="5" class="result__total result__total--final">${result.final || `fail`}</td>
          </tr>
        </table>`;
    }).join(``);
  };

  return createResult(statsData.results);
};

