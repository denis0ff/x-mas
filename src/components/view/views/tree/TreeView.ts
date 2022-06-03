import { IData, ITreeSettings } from '../../../util/Interfaces';

export class TreeView {
  favorites: IData[];
  treeCount: number;
  bgCount: number;
  constructor(input: IData[]) {
    this.favorites = input;
    this.bgCount = 8;
    this.treeCount = 4;
  }

  async drawPage(settings: ITreeSettings): Promise<void> {
    const treePageTemp = <HTMLTemplateElement>document.getElementById('treePageTemp');
    const treePageClone = <HTMLElement>treePageTemp.content.cloneNode(true);
    const main = <HTMLElement>document.querySelector('.main');
    main.innerHTML = '';
    main.appendChild(treePageClone);
    (<HTMLElement>document.querySelector('.toys-counter')).textContent = String(this.favorites.length);
    await this.drawSettings(settings);
    await this.drawFavorites();
    await this.drawWorkspace(settings);
  }

  async drawSettings(settings: ITreeSettings): Promise<void> {
    const treeContainer = <HTMLDivElement>document.querySelector('.tree-menu');
    const bgContainer = <HTMLDivElement>document.querySelector('.bg-menu');
    for (let i = 1; i <= this.treeCount; i++) {
      const treeItem = document.createElement('div');
      treeItem.className = 'tree-item item';
      if (i === +settings.treeNum) treeItem.classList.add('active');
      treeItem.setAttribute('data-tree', String(i));
      treeContainer.appendChild(treeItem);
    }
    for (let i = 1; i <= this.bgCount; i++) {
      const bgItem = document.createElement('div');
      bgItem.className = 'bg-item item';
      if (i === +settings.bgNum) bgItem.classList.add('active');
      bgItem.setAttribute('data-bg', String(i));
      bgContainer.appendChild(bgItem);
    }
  }

  async drawFavorites(): Promise<void> {
    const favoritesContainer = <HTMLDivElement>document.querySelector('.favorites-container');
    for (let i = 0; i < 20; i++) {
      const favoriteItem = document.createElement('div');
      favoriteItem.className = 'favorites-card item';
      favoriteItem.setAttribute('data-num', String(i));

      if (i < this.favorites.length) this.drawFavoritesItems(favoriteItem, i);
      favoritesContainer.appendChild(favoriteItem);
    }
  }

  drawFavoritesItems(parent: HTMLDivElement, i: number): void {
    const favoritesCount = this.favorites[i].count;
    const countElem = document.createElement('p');
    countElem.className = 'favorites-count';
    countElem.textContent = favoritesCount;
    parent.appendChild(countElem);

    for (let j = 0; j < +favoritesCount; j++) {
      const favoriteImg = document.createElement('img');
      favoriteImg.className = 'favorite-card-img';
      favoriteImg.id = `${i}-${j}`;
      favoriteImg.alt = 'toy';
      favoriteImg.draggable = true;
      favoriteImg.src = `./assets/toys/${this.favorites[i].num}.webp`;
      parent.appendChild(favoriteImg);
    }
  }

  async drawWorkspace(settings: ITreeSettings): Promise<void> {
    const workspace = <HTMLDivElement>document.querySelector('.tree-workspace');
    const wsTree = <HTMLImageElement>workspace.querySelector('.current-tree');
    const wsSnow = <HTMLDivElement>workspace.querySelector('.workspace-snow');
    settings.snow ? wsSnow.classList.add('fall') : wsSnow.classList.remove('fall');
    workspace.style.backgroundImage = `url(./assets/bg/${settings.bgNum}.webp)`;
    wsTree.src = `./assets/tree/${settings.treeNum}.webp`;
  }
}
