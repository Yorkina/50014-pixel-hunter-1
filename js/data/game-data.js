export const questions = [
  {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 468,
          height: 458,
          type: `photo`
        }
      },
      {
        picture: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458,
          type: `paint`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 705,
          height: 455,
          type: `photo`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 304,
          height: 455,
          type: `paint`
        }
      },
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 304,
          height: 455,
          type: `paint`
        }
      },
      {
        picture: {
          src: `http://i.imgur.com/DKR1HtB.jpg`,
          width: 304,
          height: 455,
          type: `photo`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 705,
          height: 455,
          type: `photo`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 468,
          height: 458,
          type: `photo`
        }
      },
      {
        picture: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458,
          type: `paint`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 705,
          height: 455,
          type: `photo`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 705,
          height: 455,
          type: `photo`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 468,
          height: 458,
          type: `photo`
        }
      },
      {
        picture: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458,
          type: `paint`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 705,
          height: 455,
          type: `photo`
        }
      }
    ]
  }, {
    answers: [
      {
        picture: {
          src: `https://i.imgur.com/DiHM5Zb.jpg`,
          width: 468,
          height: 458,
          type: `photo`
        }
      },
      {
        picture: {
          src: `http://i.imgur.com/1KegWPz.jpg`,
          width: 468,
          height: 458,
          type: `paint`
        }
      }
    ]
  }
];

export const initialState = Object.freeze({
  time: 15,
  lives: 3,
  answers: new Array(questions.length).fill(`unknown`)
});

export const getBonusForTime = (time) => {
  if (time >= 20) {
    return `fast`;
  }

  if (time <= 10) {
    return `slow`;
  }

  return `correct`;
};

export const getOneAnswerResults = (answer, state, gameData) => {
  const types = gameData.answers.map((game) => game.picture.type);
  const isAnswerCorrect = types.join(``) === answer;

  const type = isAnswerCorrect ? getBonusForTime(state.time) : `wrong`;

  return pushCurrentAnswer(state, type);
};

export const getTwoAnswersResults = (answers, state, gameData) => {
  const types = gameData.answers.map((game) => game.picture.type);
  const isAnswerCorrect = types.join(``) === answers.join(``);

  const type = isAnswerCorrect ? getBonusForTime(state.time) : `wrong`;

  return pushCurrentAnswer(state, type);
};

export const getOneOfThreeResults = (number, state, gameData) => {
  const firstIndex = number === 0 ? 1 : 0;
  const secondIndex = number === firstIndex + 1 ? firstIndex + 2 : firstIndex + 1;
  const isAnswerCorrect =
      gameData.answers[number].picture.type !==
      gameData.answers[firstIndex].picture.type &&
      gameData.answers[number].picture.type !==
      gameData.answers[secondIndex].picture.type;

  const type = isAnswerCorrect ? getBonusForTime(state.time) : `wrong`;

  return pushCurrentAnswer(state, type);
};

export const pushCurrentAnswer = (state, type) => {
  const index = state.answers.indexOf(`unknown`);
  let newArray = Array.from(state.answers);
  newArray[index] = type;

  return newArray;
};

