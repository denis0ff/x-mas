import { FilterProp, IStringMap } from '../../../../util/Interfaces';

export class FilterBySort {
  transpliter: IStringMap;

  fragment: DocumentFragment;

  constructor() {
    this.fragment = document.createDocumentFragment();
    this.transpliter = {
      sortNameMax: 'По названию от «А» до «Я»',
      sortNameMin: 'По названию от «Я» до «А»',
      sortYearMax: 'По дате покупки по возрастанию',
      sortYearMin: 'По дате покупки по убыванию',
    };
  }

  draw(key: string, props: FilterProp): void {
    const container = document.createElement('select');
    container.classList.add(`${key}-select`);
    Object.entries(props).forEach(([propKey, propValue]) => this.drawSelectProps(container, propKey, propValue));

    this.fragment.append(
      container,
      this.drawSearchInput(),
      this.drawButton('resetFilters'),
      this.drawButton('resetSettings')
    );
  }

  drawSelectProps(container: HTMLSelectElement, key: string, value: boolean): void {
    const rangeContainer = document.createElement('option');
    rangeContainer.value = key;
    rangeContainer.textContent = this.transpliter[key];
    rangeContainer.selected = value;
    container.append(rangeContainer);
  }

  drawSearchInput(): HTMLElement {
    const input = document.createElement('input');
    input.type = 'search';
    input.autocomplete = 'off';
    input.autofocus = true;
    input.placeholder = 'Введите название игрушки..';
    input.classList.add('filter-search');
    return input;
  }

  drawButton(idBase: string): HTMLElement {
    const button = document.createElement('button');
    button.id = idBase + 'Button';
    button.classList.add('button-reset');
    button.textContent = idBase === 'resetFilters' ? 'Сброс фильтров' : 'Сброс настроек';
    return button;
  }
}
