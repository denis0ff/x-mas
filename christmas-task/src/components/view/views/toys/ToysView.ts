import { FilterProp, IData, IFilter, IInput, IRangeProp } from '../../../util/Interfaces';
import { FilterByRange } from './filters/FilterByRange';
import { FilterByValue } from './filters/FilterByValue';
import { FilterBySort } from './filters/FilterBySort';

export class ToysView {
  readonly basicFilter: IFilter;

  savedFilter: IFilter;

  readonly data: IData[];

  picks: IData[];

  constructor(input: IInput) {
    this.basicFilter = input.basicFilter;
    this.savedFilter = input.savedFilter;
    this.data = input.inputData;
    this.picks = input.savedPicks;
  }

  async drawPage(): Promise<void> {
    const toysPageTemp = <HTMLTemplateElement>document.querySelector('#toysPageTemp');
    const toysPageClone = <HTMLElement>toysPageTemp.content.cloneNode(true);
    const main = <HTMLElement>document.querySelector('.main');
    main.innerHTML = '';
    main.appendChild(toysPageClone);
    await this.drawFilters();
    await this.drawToys();
  }

  async drawFilters(): Promise<void> {
    const filterByValue = new FilterByValue();
    const filterByRange = new FilterByRange(this.basicFilter);
    const filterBySort = new FilterBySort();
    Object.entries(this.savedFilter).forEach(([key, value]: [string, FilterProp]) => {
      if (key === 'sort') filterBySort.draw(key, value);
      else if (Object.prototype.hasOwnProperty.call(value, 'from') && Object.prototype.hasOwnProperty.call(value, 'to'))
        filterByRange.draw(key, <IRangeProp>value);
      else filterByValue.draw(key, value);
    });
    document.querySelector('.filter-by_value')?.append(filterByValue.fragment);
    document.querySelector('.filter-by_range')?.append(filterByRange.fragment);
    document.querySelector('.filter-by_sort')?.append(filterBySort.fragment);
  }

  async drawToys(): Promise<void> {
    const fragment = document.createDocumentFragment();
    const toysTemp = <HTMLTemplateElement>document.querySelector('#toysCardTemp');
    this.data.forEach((item) => {
      const cardClone = <HTMLDivElement>toysTemp.content.cloneNode(true);

      const card = <HTMLDivElement>cardClone.querySelector('.card');

      card.dataset.num = item.num;
      if (this.picks.find((pick) => pick.num === item.num)) card.classList.add('active');
      (<HTMLImageElement>cardClone.querySelector('.card-image')).src = `./assets/toys/${item.num}.webp`;

      (<HTMLElement>cardClone.querySelector('.card-title')).textContent = item.name;
      (<HTMLElement>cardClone.querySelector('.count')).innerHTML += ` <span>${item.count}</span>`;
      (<HTMLElement>cardClone.querySelector('.year')).innerHTML += ` <span>${item.year}</span>`;
      (<HTMLElement>cardClone.querySelector('.shape')).innerHTML += ` <span>${item.shape}</span>`;
      (<HTMLElement>cardClone.querySelector('.color')).innerHTML += ` <span>${item.color}</span>`;
      (<HTMLElement>cardClone.querySelector('.size')).innerHTML += ` <span>${item.size}</span>`;
      (<HTMLElement>cardClone.querySelector('.favorite')).innerHTML += ` <span>${item.favorite ? 'да' : 'нет'}</span>`;

      fragment.append(cardClone);
    });

    (<HTMLElement>document.querySelector('.toys-counter')).textContent = String(this.picks.length);
    document.querySelector('.cards')?.append(fragment);
  }
}
