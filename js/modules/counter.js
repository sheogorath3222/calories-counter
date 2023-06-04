import Result from './result.js';

const CaloriesFormulaFactor = {
  WEIGHT: 10,
  HEIGHT: 6.25,
  AGE: 5,
};

const CaloriesFormulaConstant = {
  MALE: 5,
  FEMALE: -161
};

const PhysicalActivityRatio = {
  MIN: 1.2,
  LOW: 1.375,
  MEDIUM: 1.55,
  HIGH: 1.725,
  MAX: 1.9,
};

const CaloriesMinMaxRatio = {
  MIN: 0.85,
  MAX: 1.15
};

export default class Counter {
  constructor(element) {
    this.root = element;
    this.form = this.root.querySelector(`.counter__form`);
    this.elements = this.form.elements;
    this.parameters = this.elements.parameters.elements;
    this.submit = this.elements.submit;
    this.reset = this.elements.reset;
    this.gender = this.elements.gender;
    this.age = this.elements.age;
    this.weight = this.elements.weight;
    this.height = this.elements.height;
    this.activity = this.elements.activity;
    this.result = new Result(this.root);
    this._onFormInput = this._onFormInput.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
  }

  _onFormInput() {
    this.submit.disabled = !this.form.checkValidity();
  }
  _onFormSubmit(evt) {
    evt.preventDefault();

    const caloriesData = {
      norm: this.getCaloriesNorm(),
      min: this.getCaloriesMin(),
      max: this.getCaloriesMax()
    };

    this.result.show(caloriesData);
  }

  init() {
    this.form.addEventListener(`input`, this._onFormInput, true);
    this.form.addEventListener(`submit`, this._onFormSubmit);
  }

  getCaloriesNorm() {
    const age = CaloriesFormulaFactor.AGE * this.age.value;
    const weight = CaloriesFormulaFactor.WEIGHT * this.weight.value;
    const height = CaloriesFormulaFactor.HEIGHT * this.height.value;
    const gender = CaloriesFormulaConstant[this.gender.value.toUpperCase()];
    const activity = PhysicalActivityRatio[this.activity.value.toUpperCase()];

    return Math.round((weight + height - age + gender) * activity);
  }

  getCaloriesMin() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MIN);
  }

  getCaloriesMax() {
    return Math.round(this.getCaloriesNorm() * CaloriesMinMaxRatio.MAX);
  }
}
