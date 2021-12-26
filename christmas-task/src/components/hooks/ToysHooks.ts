import { API } from 'nouislider';
import { IFilter, IData, IBooleanMap, INumberMap, IInput, ParamsAreSortFunctions } from '../util/Interfaces';
import { Utils } from '../util/Utils';

interface TargetElement extends HTMLElement {
  noUiSlider?: API;
}

export class ToysHooks {
  readonly basicFilter: IFilter;

  savedFilter: IFilter;

  readonly data: IData[];

  picks: IData[];

  cardArray: NodeListOf<HTMLElement>;

  resetFilter: IFilter;

  search: string;

  needSave: boolean;

  constructor(input: IInput) {
    this.basicFilter = input.basicFilter;
    this.savedFilter = input.savedFilter;
    this.resetFilter = JSON.parse(JSON.stringify(this.savedFilter));
    this.data = input.inputData;
    this.picks = input.savedPicks;
    this.cardArray = document.querySelectorAll('.card');
    this.search = '';
    this.needSave = true;
  }

  initialize(): void {
    this.resetFilters();
    this.sortCards();
    this.listen();
  }

  listen(): void {
    window.addEventListener('beforeunload', () => this.saveSettings());
    window.addEventListener('hashchange', () => this.saveSettings());
    const filterByValueContainer = document.querySelector(`.filter-by_value`);
    filterByValueContainer
      ?.querySelectorAll('button')
      .forEach((button) => button.addEventListener('click', (e: Event) => this.filterByButtons(e)));
    filterByValueContainer
      ?.querySelector('.favorite-input')
      ?.addEventListener('change', (e: Event) => this.filterByCheckbox(e, 'favorite'));

    document.querySelectorAll('.filter-range').forEach((filter) => {
      (<API>(<TargetElement>filter).noUiSlider).on('change', (...props) => this.filterBySliders(...props));
    });
    document.querySelector('.filter-search')?.addEventListener('input', (e: Event) => this.filterBySearch(e));
    document.getElementById('resetFiltersButton')?.addEventListener('click', () => this.resetFilters());
    document.getElementById('resetSettingsButton')?.addEventListener('click', () => this.resetSettings());
    this.cardArray.forEach((card, index) => card?.addEventListener('click', (e: Event) => this.cardPick(e, index)));
    document.querySelector('.sort-select')?.addEventListener('change', (e: Event) => this.sortCards(e));
  }

  filterByButtons(e: Event): void {
    const target = <HTMLElement>e.target;
    const parentName = (<HTMLElement>target.parentElement).className;
    if (target.getAttribute('data-filter')) {
      const attribute = <string>target.getAttribute('data-filter');
      const toggleBoolean = !(<IBooleanMap>this.savedFilter[parentName])[attribute];
      target.classList.toggle('active');
      (<IBooleanMap>this.savedFilter[parentName])[attribute] = toggleBoolean;
    }
    this.filterCards();
  }

  filterByCheckbox(e: Event, filter: string): void {
    this.savedFilter[filter] = !this.savedFilter[filter];
    this.filterCards();
  }

  filterBySliders(...props: (number | boolean | API | (string | number)[] | number[])[]): void {
    const target = (<API>props[5]).target;
    const filterName = target.id.replace(/Slider/, '');
    const value1 = Math.floor((<number[]>props[0])[0]);
    const value2 = Math.floor((<number[]>props[0])[1]);
    if (
      (<INumberMap>this.savedFilter[filterName]).from !== value1 ||
      (<INumberMap>this.savedFilter[filterName]).to !== value2
    ) {
      (<INumberMap>this.savedFilter[filterName]).from = value1;
      (<INumberMap>this.savedFilter[filterName]).to = value2;
      if (target.previousElementSibling) target.previousElementSibling.textContent = String(value1);
      if (target.nextElementSibling) target.nextElementSibling.textContent = String(value2);
      this.filterCards();
    }
  }

  filterBySearch(e: Event): void {
    const value = (<HTMLInputElement>e.target).value;
    this.search = value.toLowerCase();
    this.filterCards();
  }

  filter(): void {
    let isFound = false;
    const isPickedAll: IBooleanMap = {
      shape: false,
      color: false,
      size: false,
    };
    Object.keys(isPickedAll).forEach(
      (key) =>
        (isPickedAll[key] = Object.values(this.savedFilter[key]).reduce(
          (sum: boolean, item: boolean) => sum && !item,
          true
        ))
    );
    this.data.forEach((cardData, index) => {
      let isFiltered = this.savedFilter.favorite ? this.savedFilter.favorite === cardData.favorite : true;

      isFiltered =
        isFiltered && +cardData.count >= this.savedFilter.count.from && +cardData.count <= this.savedFilter.count.to;
      isFiltered =
        isFiltered && +cardData.year >= this.savedFilter.year.from && +cardData.year <= this.savedFilter.year.to;

      Object.keys(isPickedAll).forEach((key) => {
        const choisen = (<IBooleanMap>this.savedFilter[key])[cardData[key] as string];
        isFiltered = isFiltered && (choisen || isPickedAll[key]);
      });

      isFiltered = isFiltered && cardData.name.toLowerCase().includes(this.search);
      if (isFiltered) isFound = true;
      this.displayCard(isFiltered, index);
    });

    this.displayNothingFound(isFound);
  }

  async filterCards(): Promise<void> {
    const cards = document.querySelector('.cards');
    cards?.classList.add('hide');
    setTimeout(() => {
      this.filter();
      cards?.classList.remove('hide');
    }, 1000);
  }

  displayCard(isFiltered: boolean, cardNum: number): void {
    const card = this.cardArray[cardNum];
    if (isFiltered) {
      if (card.classList.contains('hide')) card.classList.remove('hide');
    } else card.classList.add('hide');
  }

  displayNothingFound(isFound: boolean): void {
    const nothingFound = document.querySelector('.nothing-found');
    !isFound ? nothingFound?.classList.remove('hide') : nothingFound?.classList.add('hide');
  }

  cardPick(e: Event, cardNum: number): void {
    const target = <HTMLElement>e.currentTarget;
    const card = this.data[cardNum];
    const counter = <HTMLElement>document.querySelector('.toys-counter');
    const index = this.picks.findIndex((pick) => pick.num === card.num);

    if (index !== -1) {
      this.picks.splice(index, 1);
      target.classList.toggle('active');
      counter.classList.remove('full');
    } else if (this.picks.length < 20) {
      this.picks.push(card);
      target.classList.toggle('active');
    } else counter.classList.add('full');

    counter.textContent = String(this.picks.length);
  }

  sortCards(e?: Event): void {
    const cardArray: Array<HTMLElement> = Array.prototype.slice.call(this.cardArray, 0);
    const cardsContainer = <ParentNode>document.querySelector('.cards');
    const sorters: ParamsAreSortFunctions = {
      sortNameMax: Utils.sortNameMax,
      sortNameMin: Utils.sortNameMin,
      sortYearMax: Utils.sortYearMax,
      sortYearMin: Utils.sortYearMin,
    };

    const targetValue = e ? (<HTMLSelectElement>e?.target).value : null;
    let sortBy = '';
    Object.entries(this.savedFilter.sort).forEach(([key, value]) => {
      if (value) sortBy = key;
      this.savedFilter.sort[key] = false;
    });
    if (targetValue) sortBy = targetValue;
    this.savedFilter.sort[sortBy] = true;
    cardArray.sort((a, b) => sorters[sortBy](a, b));

    const cards = document.querySelector('.cards');
    cards?.classList.add('hide');
    setTimeout(() => {
      cardsContainer.append(...cardArray);
      cards?.classList.remove('hide');
    }, 1000);
  }

  saveSettings(): void {
    localStorage.setItem('filter', JSON.stringify(this.savedFilter));
    localStorage.setItem('picks', JSON.stringify(this.picks));
  }

  resetSettings(): void {
    localStorage.clear();
    this.resetFilter = JSON.parse(JSON.stringify(this.basicFilter));
    this.resetFilters();
    this.cardArray.forEach((card) => card.classList.remove('active'));
    this.picks.length = 0;
    (<HTMLElement>document.querySelector('.toys-counter')).textContent = String(this.picks.length);
  }

  resetFilters(): void {
    this.savedFilter = JSON.parse(JSON.stringify(this.resetFilter));

    document
      .querySelector(`.filter-by_value`)
      ?.querySelectorAll('button')
      .forEach((button) => {
        const filterGroup = <string>button.parentElement?.className;
        const filter = <string>button.getAttribute('data-filter');
        if ((<IBooleanMap>this.savedFilter[filterGroup])[filter]) button.classList.add('active');
        else button.classList.remove('active');
      });

    (<HTMLInputElement>document.querySelector('.favorite-input')).checked = this.savedFilter.favorite;

    const yearSlider = document.getElementById('yearSlider');
    (<API>(<TargetElement>yearSlider).noUiSlider).set([this.savedFilter.year.from, this.savedFilter.year.to]);
    (<HTMLElement>(<HTMLElement>yearSlider).previousSibling).textContent = String(this.savedFilter.year.from);
    (<HTMLElement>(<HTMLElement>yearSlider).nextSibling).textContent = String(this.savedFilter.year.to);

    const countSlider = document.getElementById('countSlider');
    (<API>(<TargetElement>countSlider).noUiSlider).set([this.savedFilter.count.from, this.savedFilter.count.to]);
    (<HTMLElement>(<HTMLElement>countSlider).previousSibling).textContent = String(this.savedFilter.count.from);
    (<HTMLElement>(<HTMLElement>countSlider).nextSibling).textContent = String(this.savedFilter.count.to);

    (<HTMLInputElement>document.querySelector('.filter-search')).value = '';
    this.search = '';
    this.filterCards();
  }
}
