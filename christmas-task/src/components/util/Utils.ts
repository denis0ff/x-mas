import { IData, IFilter } from './Interfaces';

export class Utils {
  static parseRequestURL(): string {
    return window.location.hash.slice(2).toLowerCase() || 'hello';
  }

  static async getData(): Promise<IData[]> {
    const input = await fetch('./components/json/data.json');
    const data: IData[] = await (input.json() as Promise<IData[]>);
    return data;
  }

  static async getFilter(): Promise<IFilter> {
    const input = await fetch('./components/json/filters.json');
    const data: IFilter = await (input.json() as Promise<IFilter>);
    return data;
  }

  static sortNameMax(a: HTMLElement, b: HTMLElement): number {
    const aValue = <string>a.querySelector('.card-title')?.textContent;
    const bValue = <string>b.querySelector('.card-title')?.textContent;
    if (aValue > bValue) return 1;
    if (aValue < bValue) return -1;
    return 0;
  }

  static sortYearMax(a: HTMLElement, b: HTMLElement): number {
    const aValue = +(<string>a.querySelector('.year > span')?.textContent);
    const bValue = +(<string>b.querySelector('.year > span')?.textContent);
    if (aValue > bValue) return 1;
    if (aValue < bValue) return -1;
    return 0;
  }

  static sortNameMin(a: HTMLElement, b: HTMLElement): number {
    const aValue = <string>a.querySelector('.card-title')?.textContent;
    const bValue = <string>b.querySelector('.card-title')?.textContent;
    if (aValue < bValue) return 1;
    if (aValue > bValue) return -1;
    return 0;
  }

  static sortYearMin(a: HTMLElement, b: HTMLElement): number {
    const aValue = +(<string>a.querySelector('.year > span')?.textContent);
    const bValue = +(<string>b.querySelector('.year > span')?.textContent);
    if (aValue < bValue) return 1;
    if (aValue > bValue) return -1;
    return 0;
  }
}
