import { FilterProp, IBooleanMap, IStringMap } from '../../../../util/Interfaces';

export class FilterByValue {
  transpliter: IStringMap;

  fragment: DocumentFragment;

  constructor() {
    this.fragment = document.createDocumentFragment();
    this.transpliter = {
      shape: 'Форма',
      size: 'Размер',
      color: 'Цвет',
      favorite: 'Любимые',
    };
  }

  draw(filterName: string, filterItems: FilterProp): void {
    const container = document.createElement('div');
    container.textContent = `${this.transpliter[filterName]}:`;
    container.classList.add(filterName);
    if (typeof filterItems === 'object') this.drawObjectItems(container, filterItems as IBooleanMap);
    if (typeof filterItems === 'boolean') this.drawBooleanItems(container, filterItems);
    this.fragment.append(container);
  }

  drawObjectItems(container: HTMLDivElement, filterItems: IBooleanMap): void {
    Object.keys(filterItems).forEach((key) => {
      const button = document.createElement('button');
      button.setAttribute('data-filter', key);
      container.append(button);
    });
  }

  drawBooleanItems(container: HTMLDivElement, filterItems: boolean): void {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'checkbox';
    checkbox.checked = filterItems;
    checkbox.classList.add('favorite-input');
    const label = document.createElement('label');
    label.htmlFor = 'checkbox';
    label.classList.add('favorite-input-label');
    container.append(checkbox, label);
  }
}
