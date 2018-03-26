


export default class SignIn {
  constructor() {
    this.state = {
      showing: false
    };
  }

  init() {
    document.getElementById('signIn').style.display = 'default';
  }

  valueValidator(value) {
    return value !== '';
  }

  testSubmit(value, resolve) {
    this.valueValidator(value) &&
      resolve(this.signInSumbit(value));
  }

  signInSumbit(value) {
    this.state.showing = false;
    document.getElementById('signIn').style.display = 'none';
    return value;
  }

  getName() {
    if(!this.state.showing) {
      this.init();
      this.state.showing = true;
      return new Promise(resolve => {
        const input = () => document.querySelector('#signInContents input');
        const button = () => document.querySelector('#signInContents button');

        const keyUpHandler = event => {
          event.preventDefault();
          if (event.which === 13) {
            this.testSubmit(input().value, resolve);
          }
        };
        const clickHandler = () => {
          this.testSubmit(input().value, resolve);
        };

        input().addEventListener('keyup', keyUpHandler);
        button().addEventListener('click', clickHandler);
      });
    } else {
      return new Promise(resolve => {
        resolve(false);
      });
    }
  }
}