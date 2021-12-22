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

  async initialize(): Promise<void> {
    await this.toysView.drawPage();
    new ToysHooks(this.data).initialize();
  }
}
