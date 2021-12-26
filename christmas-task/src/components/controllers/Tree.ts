import { TreeHooks } from '../hooks/TreeHooks';
import { IData, ITreeSettings } from '../util/Interfaces';
import { TreeView } from '../view/views/tree/TreeView';

export class Tree {
  picks: IData[];

  TreeView: TreeView;

  basicSettings: ITreeSettings;

  constructor(input: IData[]) {
    this.picks = input;
    this.TreeView = new TreeView(input);
    this.basicSettings = {
      treeNum: '1',
      bgNum: '1',
      snow: false,
      music: false,
    };
  }

  async initialize(): Promise<void> {
    const savedSettings = localStorage.getItem('tree-settings');
    const currentSettings: ITreeSettings = savedSettings ? JSON.parse(savedSettings) : this.basicSettings;
    await this.TreeView.drawPage(currentSettings);
    new TreeHooks(this.basicSettings, currentSettings).initialize();
  }
}
