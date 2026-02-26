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

    if (!this.selected) {
      const selected = this.items.find(item => item.hasAttribute("selected"));
      this.select(selected ?? this.items[0]);
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
