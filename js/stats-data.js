const costs = {
  CORRECT: 100,
  ADDITIONAL: 50
};

const results = [
  {
    answers: [
      `wrong`, `heart`, `fast`, `correct`, `wrong`, `unknown`, `slow`,
      `unknown`, `fast`, `unknown`]
  },
  {
    answers: [
      `wrong`, `wrong`, `fast`, `correct`, `wrong`, `unknown`, `slow`,
      `unknown`, `fast`, `unknown`]
  },
  {
    answers: [
      `wrong`, `heart`, `fast`, `correct`, `wrong`, `heart`, `slow`,
      `correct`, `fast`, `unknown`],
  }
];

const getAdditionals = (fast, slow, heart) => {
  const additionals = [];

  if (fast) {
    additionals.push({extra: fast, type: `fast`, points: costs.ADDITIONAL});
  }

  if (slow) {
    additionals.push({extra: slow, type: `slow`, points: costs.ADDITIONAL});
  }

  if (heart) {
    additionals.push({extra: heart, type: `heart`, points: costs.ADDITIONAL});
  }

  return additionals;
};

const calcResults = (result) => {
  const statistics = {};

  const fastBonus = result.filter((answer) => answer === `fast`).length;
  const slowBonus = result.filter((answer) => answer === `slow`).length;
  const liveBonus = result.filter((answer) => answer === `heart`).length;
  const wrongAnswers = result.filter((answer) => answer === `wrong`).length;
  const correctAnswers = result.filter((answer) => answer === `correct`).length;

  statistics.correct = wrongAnswers > 2 ? false : true;
  statistics.points = statistics.correct ?
      (statistics.points = costs.CORRECT) : (statistics.points = 0);
  statistics.total = statistics.points ?
      (statistics.points * correctAnswers) : 0;

  if (statistics.correct) {
    statistics.additionals = getAdditionals(fastBonus, slowBonus, liveBonus);
    statistics.final = statistics.total + (
        fastBonus + liveBonus - slowBonus) * costs.ADDITIONAL;
  } else {
    statistics.final = statistics.total;
  }

  statistics.answers = result;

  return statistics;
};

const calculatedResults = results.map((result) => calcResults(result.answers));

export default calculatedResults;
