import { IData } from '../util/Interfaces';
import { TreeView } from '../view/views/tree/TreeView';

export class Tree {
  picks: IData[];
  TreeView: TreeView;
  constructor(input: IData[]) {
    this.picks = input;
    this.TreeView = new TreeView(input);
  }

  async initialize(): Promise<void> {
    await this.TreeView.drawPage();
  }
}
