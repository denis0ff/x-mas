import { TreeHooks } from '../hooks/TreeHooks';
import { IData, ITreeSettings } from '../util/Interfaces';
import { TreeView } from '../view/views/tree/TreeView';

export class Tree {
  picks: IData[];

  TreeView: TreeView;

  basicSettings: ITreeSettings;

  audio: HTMLAudioElement;

  constructor(input: IData[], audio: HTMLAudioElement) {
    this.picks = input;
    this.TreeView = new TreeView(input);
    this.basicSettings = {
      treeNum: '1',
      bgNum: '1',
      snow: false,
      music: false,
    };
    this.audio = audio;
  }

  async initialize(pageLinksArray: NodeListOf<HTMLElement>): Promise<void> {
    pageLinksArray.forEach((page) =>
      page.classList.contains('header-tree') ? page.classList.add('active') : page.classList.remove('active')
    );
    const savedSettings = localStorage.getItem('tree-settings');
    const currentSettings: ITreeSettings = savedSettings ? JSON.parse(savedSettings) : this.basicSettings;
    await this.TreeView.drawPage(currentSettings);
    new TreeHooks(this.basicSettings, currentSettings, this.audio).initialize();
  }
}
