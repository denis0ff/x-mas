import { Hello } from '../controllers/Hello';
import { Toys } from '../controllers/Toys';
import { Tree } from '../controllers/Tree';
import { Error } from '../controllers/Error404';
import { Utils } from '../util/Utils';
import { IData, IFilter } from '../util/Interfaces';

interface Controller {
  initialize(): void;
}

class App {
  async start(): Promise<void> {
    const parsedUrl = Utils.parseRequestURL();
    const data = await App.initialize();
    let controller: Controller;
    if (parsedUrl === 'toys') controller = new Toys(data);
    else if (parsedUrl === 'tree')
      controller = new Tree(data.savedPicks.length !== 0 ? data.savedPicks : data.inputData.slice(0, 19));
    else if (parsedUrl === 'hello') controller = new Hello();
    else controller = new Error();
    controller.initialize();
  }

  static async initialize(): Promise<{
    savedFilter: IFilter;
    savedPicks: IData[];
    basicFilter: IFilter;
    inputData: IData[];
  }> {
    const basicFilter = await Utils.getFilter();
    const inputData = await Utils.getData();
    const savedFilter = await this.getSaves(basicFilter);
    return { basicFilter, inputData, ...savedFilter };
  }

  static async getSaves(basicFilter: IFilter): Promise<{
    savedFilter: IFilter;
    savedPicks: IData[];
  }> {
    const filter = localStorage.getItem('filter');
    const picks = localStorage.getItem('picks');
    const savedFilter: IFilter = filter ? JSON.parse(filter) : { ...basicFilter };
    const savedPicks: IData[] = picks ? JSON.parse(picks) : [];
    (<HTMLElement>document.querySelector('.toys-counter')).textContent = String(savedPicks.length);
    return { savedFilter, savedPicks };
  }
}

export default App;
