export default Object.freeze({
  results: [
    {
      answers: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      correct: true,
      points: 100,
      total: 900,
      additionals: [
        {
          extra: 1,
          type: `fast`,
          points: 50
        },
        {
          extra: 2,
          type: `heart`,
          points: 50
        },
        {
          extra: 2,
          type: `slow`,
          points: 50
        }
      ],
      final: 950
    },
    {
      answers: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      correct: false,
      additionals: []
    },
    {
      answers: [`wrong`, `slow`, `fast`, `correct`, `wrong`, `unknown`, `slow`, `unknown`, `fast`, `unknown`],
      correct: true,
      points: 100,
      total: 900,
      additionals: [
        {
          extra: 2,
          type: `heart`,
          points: 50
        }
      ],
      final: 1000
    }
  ]
});
