export default class View {
  constructor() {
    this.some = '';
    this.el = null;
    this.mainEl = null;
  }

  render() {
    this.el = document.createElement('h1');
    this.el.textContent = 'gem-puzzle file inited';
    this.mainEl = document.getElementById('main');
    // console.log(this.mainEl);
    this.mainEl.appendChild(this.el);
  }
}