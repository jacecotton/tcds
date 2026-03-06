export class SelectionController {
  #host;
  items = [];

  constructor(host) {
    this.#host = host;
    host.addController?.(this);
  }

  get selected() {
    return this.items.find(item => item.selected) ?? null;
  }

  sync(items) {
    this.items = items;

    if (this.items.length === 0) return;

    const selectedItems = this.items.filter(item => item.selected);

    if (selectedItems.length === 0) {
      const fromAttr = this.items.find(item => item.hasAttribute("selected"));
      this.select(fromAttr ?? this.items[0]);
    } else if (selectedItems.length > 1) {
      this.select(selectedItems[selectedItems.length - 1]);
    }
  }

  select(item) {
    if (!item || !this.items.includes(item)) return;

    this.items.forEach((_item) => {
      _item.selected = _item === item;
    });

    this.#host.requestUpdate();
  }

  selectNext() {
    if (!this.selected) return;
    const index = this.items.indexOf(this.selected);
    this.select(this.items[(index + 1) % this.items.length]);
  }

  selectPrevious() {
    if (!this.selected) return;
    const index = this.items.indexOf(this.selected);
    this.select(this.items[(index - 1 + this.items.length) % this.items.length]);
  }

  selectFirst() {
    this.select(this.items[0]);
  }

  selectLast() {
    this.select(this.items[this.items.length - 1]);
  }
}
