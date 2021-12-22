export class TreeHooks {
  garlandColor: string;
  constructor() {
    this.garlandColor = 'multi';
  }

  initialize(): void {
    this.listen();
  }

  listen(): void {
    document.ondragover = (e) => e.preventDefault();
    document.ondrop = (e) => this.drop(e);
    document.querySelectorAll('.favorites-card').forEach((card) => {
      card.addEventListener('mousedown', (e) => this.drag(e));
    });
    (<HTMLDivElement>document.querySelector('.tree-menu')).addEventListener('click', (e) => this.changeTree(e));
    (<HTMLDivElement>document.querySelector('.bg-menu')).addEventListener('click', (e) => this.changeBg(e));
    (<HTMLDivElement>document.querySelector('.garland-btns')).addEventListener('click', (e) => this.changeGarland(e));
  }

  drag(e: Event): void {
    const target = <HTMLElement>e.target;
    if (target.classList.contains('favorite-card-img')) {
      target.ondragover = (e) => e.preventDefault();
      target.ondragstart = (e) => (<DataTransfer>e.dataTransfer).setData('id', (<HTMLElement>e.target).id);
    }
  }

  drop(e: DragEvent): void {
    const target = <HTMLElement>e.target;
    const toyId = (<DataTransfer>e.dataTransfer).getData('id');
    const toy = <HTMLImageElement>document.getElementById(toyId);
    const nativeSocket = <HTMLDivElement>document.querySelector(`[data-num="${toyId.match(/[0-9]+/)}"]`);
    const toyCount = <HTMLElement>nativeSocket?.querySelector('.favorites-count');

    if (target.id === 'map-area') {
      const workspace = <ParentNode>document.querySelector('.tree-workspace');
      const dragX = e.offsetX;
      const dragY = e.offsetY;
      const shiftX = toy.getBoundingClientRect().width / 2;
      const shiftY = toy.getBoundingClientRect().height / 2;
      const wsWidth = (<HTMLDivElement>workspace).getBoundingClientRect().width;
      const wsHeigth = (<HTMLDivElement>workspace).getBoundingClientRect().height;

      toy.style.left = ((dragX - shiftX) / wsWidth) * 100 + '%';
      toy.style.top = ((dragY - shiftY) / wsHeigth) * 100 + '%';

      workspace.append(toy);
    } else {
      toy.style.left = 'initial';
      toy.style.top = 'initial';
      nativeSocket?.append(toy);
    }
    toyCount.textContent = String(nativeSocket.querySelectorAll('.favorite-card-img').length || '');
  }

  changeTree(e: Event): void {
    const target = <HTMLImageElement>e.target;
    if (target.classList.contains('tree-item')) {
      const newTreeNum = target.getAttribute('data-tree');
      const currentTree = <HTMLImageElement>document.querySelector('.current-tree');
      currentTree.src = `./assets/tree/${newTreeNum}.webp`;
    }
  }

  changeBg(e: Event): void {
    const target = <HTMLImageElement>e.target;
    if (target.classList.contains('bg-item')) {
      const newBgNum = target.getAttribute('data-bg');
      const currentBg = <HTMLImageElement>document.querySelector('.tree-workspace');
      currentBg.style.backgroundImage = `url(./assets/bg/${newBgNum}.webp)`;
    }
  }

  changeGarland(e: Event): void {
    const wsGarland = <HTMLDivElement>document.querySelector('.workspace-garland');
    const target = <HTMLElement>e.target;
    const input = <HTMLInputElement>(<HTMLElement>e.currentTarget).querySelector('.input-switch');

    if (target.classList.contains('color-btn')) {
      this.garlandColor = <string>target.getAttribute('data-color');
      this.drawGarland(wsGarland);
      input.checked = true;
    } else if (target.classList.contains('input-switch'))
      input.checked ? this.drawGarland(wsGarland) : (wsGarland.innerHTML = '');
  }

  drawGarland(wsGarland: HTMLDivElement): void {
    wsGarland.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const lightrope = document.createElement('ul');
      lightrope.className = 'lightrope';
      for (let j = 0; j < 4 + i; j++) {
        const light = document.createElement('li');
        light.className = this.garlandColor;
        lightrope.appendChild(light);
      }
      wsGarland.appendChild(lightrope);
    }
  }
}
