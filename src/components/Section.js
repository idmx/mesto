export default class Section {
  constructor({ items, rendered }, containerSelector) {
    this._items = items;
    this._rendered = rendered;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._items.forEach(item => {
      this._rendered(item);
    });
  }
}