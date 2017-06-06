export default (answers) => {

  const createLabel = (param, index) => {
    return param.labels.map((label) => {
      return `<label class="game__answer game__answer--${label.type}">
         <input name="question${index}" type="radio" value=${label.type}>
         <span>${label.text}</span>
       </label>`;
    }).join(``);
  };

  const label = (params) => {
    return params.map((param, index) => {
      return `<div class="game__option">
        <img src=${param.picture.src}
          alt="Option ${index}" width=${param.picture.width} height=${param.picture.height}>
        ${createLabel(param, index)}
      </div>`;
    }).join(``);
  };

  return label(answers);
};
