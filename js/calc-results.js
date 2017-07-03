import statsData from './stats-data';

const getCalculatedResults = (answers, lives) => {
  statsData.push({'answers': answers, 'lives': lives});

  const costs = {
    CORRECT: 100,
    ADDITIONAL: 50
  };

  const getAdditionals = (numFast, numSlow, numLive) => {
    const additionals = [];

    if (numFast) {
      additionals.push({quantity: numFast, type: `fast`, points: costs.ADDITIONAL});
    }

    if (numSlow) {
      additionals.push({quantity: numSlow, type: `slow`, points: costs.ADDITIONAL});
    }

    if (numLive) {
      additionals.push({quantity: numLive, type: `heart`, points: costs.ADDITIONAL});
    }

    return additionals;
  };

  const calcResults = (types, notSpentLives) => {
    const statistics = {};

    const numFastBonus = types.filter((answer) => answer === `fast`).length;
    const numSlowBonus = types.filter((answer) => answer === `slow`).length;
    const wrongAnswers = types.filter((answer) => answer === `wrong`).length;
    const correctAnswers = types.filter((answer) => answer === `correct`).length;
    const numLiveBonus = notSpentLives || 0;

    statistics.correct = wrongAnswers > 2 ? false : true;
    statistics.points = statistics.correct ?
        (statistics.points = costs.CORRECT) : (statistics.points = 0);
    statistics.total = statistics.points ?
        (statistics.points * correctAnswers) : 0;

    if (statistics.correct) {
      statistics.additionals = getAdditionals(numFastBonus, numSlowBonus, numLiveBonus);
      statistics.final = statistics.total + (
          numFastBonus + numLiveBonus - numSlowBonus) * costs.ADDITIONAL;
    } else {
      statistics.final = statistics.total;
    }

    statistics.answers = types;

    return statistics;
  };

  const calculatedResults = statsData.map((result) => calcResults(result.answers, result.lives));
  return calculatedResults;
};

export default getCalculatedResults;
