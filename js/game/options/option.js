export default (answers, labels) => {

  const getLabels = (index) =>
    `<label class="game__answer game__answer--photo">
         <input name="question${index}" type="radio" value="photo">
         <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
         <input name="question${index}" type="radio" value="paint">
         <span>Рисунок</span>
       </label>`;

  const createOptions = (params) =>
    params.map((param, index) =>
      `<div class="game__option" data-value=${param.picture.type}>
        <img src=${param.picture.src}
          alt="Option ${index}" width=${param.picture.width} height=${param.picture.height}>
          ${labels ? getLabels(index) : ``}
      </div>`
    ).join(``);

  return createOptions(answers);
};
