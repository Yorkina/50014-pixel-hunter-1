import assert from 'assert';
import {pushCurrentAnswer, getBonusForTime, getOneAnswerResults,
    getTwoAnswersResults, getOneOfThreeResults} from './game-data';

const mockDataOne = {
  answers: [
    {
      picture: {
        src: `https://i.imgur.com/DiHM5Zb.jpg`,
        width: 468,
        height: 458,
        type: `photo`
      }
    }
  ]
};

const mockDataTwo = {
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
};

const mockDataThree = {
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
};

describe(`getOneAnswerResults()`, () => {
  it(``, () => {
    assert.deepEqual(getOneAnswerResults(`photo`,
        {time: 20, answers: [`unknown`]}, mockDataOne), [`fast`]);
    assert.deepEqual(getOneAnswerResults(`photo`,
        {time: 10, answers: [`unknown`]}, mockDataOne), [`slow`]);
    assert.deepEqual(getOneAnswerResults(`paint`,
        {time: 0, answers: [`unknown`]}, mockDataOne), [`wrong`]);
    assert.deepEqual(getOneAnswerResults(`paint`,
        {time: 8, answers: [`unknown`]}, mockDataOne), [`wrong`]);
    assert.deepEqual(getOneAnswerResults(`photo`,
        {time: 15, answers: [`unknown`]}, mockDataOne), [`correct`]);
  });
});

describe(`getTwoAnswersResults()`, () => {
  it(``, () => {
    assert.deepEqual(getTwoAnswersResults([`photo`, `paint`],
        {time: 20, answers: [`unknown`]}, mockDataTwo), [`fast`]);
    assert.deepEqual(getTwoAnswersResults([`photo`, `paint`],
        {time: 10, answers: [`unknown`]}, mockDataTwo), [`slow`]);
    assert.deepEqual(getTwoAnswersResults([`paint`, `photo`],
        {time: 0, answers: [`unknown`]}, mockDataTwo), [`wrong`]);
    assert.deepEqual(getTwoAnswersResults([`paint`, `photo`],
        {time: 8, answers: [`unknown`]}, mockDataTwo), [`wrong`]);
    assert.deepEqual(getTwoAnswersResults([`photo`, `paint`],
        {time: 15, answers: [`unknown`]}, mockDataTwo), [`correct`]);
  });
});

describe(`getOneOfThreeResults()`, () => {
  it(``, () => {
    assert.deepEqual(getOneOfThreeResults(2,
        {time: 20, answers: [`unknown`]}, mockDataThree), [`fast`]);
    assert.deepEqual(getOneOfThreeResults(2,
        {time: 10, answers: [`unknown`]}, mockDataThree), [`slow`]);
    assert.deepEqual(getOneOfThreeResults(1,
        {time: 0, answers: [`unknown`]}, mockDataThree), [`wrong`]);
    assert.deepEqual(getOneOfThreeResults(0,
        {time: 8, answers: [`unknown`]}, mockDataThree), [`wrong`]);
    assert.deepEqual(getOneOfThreeResults(2,
        {time: 15, answers: [`unknown`]}, mockDataThree), [`correct`]);
  });
});

describe(`pushCurrentAnswer()`, () => {
  it(``, () => {
    assert.deepEqual(pushCurrentAnswer({time: 20, answers: [`unknown`]},
        `fast`), [`fast`]);
    assert.deepEqual(pushCurrentAnswer({time: 20, answers: [`fast`, `unknown`]},
        `fast`), [`fast`, `fast`]);
  });
});

describe(`getBonusForTime()`, () => {
  it(``, () => {
    assert.equal(getBonusForTime(20), `fast`);
    assert.equal(getBonusForTime(10), `slow`);
    assert.equal(getBonusForTime(15), `correct`);
  });
});

// getOneAnswerResults([`photo`], {time: 15, answers: []}, {}) === `fast`;

// TODO протестировать все варианты игры, написать классы для вью(без бизнес логики)
// например, если написать вызов методов из тество, то я не права( но вьюхи могут
// знать про данные, но управлять ими не могут)

