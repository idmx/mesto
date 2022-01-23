export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems(items, userInfoId) {
    this.clear()
    items.reverse().forEach(item => {
      this._renderer(item, userInfoId);
    });
  }
}