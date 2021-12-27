import { IInput } from '../util/Interfaces';
import { ToysView } from '../view/views/toys/ToysView';
import { ToysHooks } from '../hooks/ToysHooks';

export class Toys {
  data: IInput;

  toysView: ToysView;

  constructor(input: IInput) {
    this.data = input;
    this.toysView = new ToysView(this.data);
  }

  async initialize(pageLinksArray: NodeListOf<HTMLElement>): Promise<void> {
    pageLinksArray.forEach((page) =>
      page.classList.contains('header-toys') ? page.classList.add('active') : page.classList.remove('active')
    );
    await this.toysView.drawPage();
    new ToysHooks(this.data).initialize();
  }
}
