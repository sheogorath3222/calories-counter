export default class Result {
  constructor(element) {
    this.counter = element;

    this.root = element.querySelector(`.counter__result`);
    this.caloriesNormOutput = this.root.querySelector(`#calories-norm`);
    this.caloriesMinOutput = this.root.querySelector(`#calories-minimal`);
    this.caloriesMaxOutput = this.root.querySelector(`#calories-maximal`);
  }

  show(calories) {
    this.caloriesNormOutput.textContent = calories.norm;
    this.caloriesMinOutput.textContent = calories.min;
    this.caloriesMaxOutput.textContent = calories.max;
    this.root.classList.remove(`counter__result--hidden`);
  }
  hide() {
    this.caloriesNormOutput.textContent = 0;
    this.caloriesMinOutput.textContent = 0;
    this.caloriesMaxOutput.textContent = 0;

    this.root.classList.add(`counter__result--hidden`);
    this.counter.scrollIntoView({block: `start`, behavior: `smooth`});
  }
}
