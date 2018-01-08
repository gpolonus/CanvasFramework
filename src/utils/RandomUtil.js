
export default class RandomUtil {
  constructor() {}

  static random(num) {
    return Math.round(Math.random() * num);
  }
}