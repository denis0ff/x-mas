export class TreeHooks {
  initialize(): void {
    this.listen();
  }

  listen(): void {
    document.ondragover = (e) => e.preventDefault();
    document.ondrop = (e) => this.drop(e);
    document.querySelectorAll('.favorites-card').forEach((card) => {
      card.addEventListener('mousedown', (e) => this.drag(e));
    });
    document.querySelector('.tree-menu')?.addEventListener('click', (e) => this.changeTree(e));
    document.querySelector('.bg-menu')?.addEventListener('click', (e) => this.changeBg(e));
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
    const nativeSocket = document.querySelector(`[data-num="${toyId.match(/[0-9]+/)}"]`);
    const toyCount = <HTMLElement>nativeSocket?.querySelector('.favorites-count');

    if (target.id === 'map-area') {
      const workspace = <ParentNode>document.querySelector('.tree-workspace');
      const dragX = e.offsetX;
      const dragY = e.offsetY;

      toy.style.left = `${dragX}px`;
      toy.style.top = `${dragY}px`;

      workspace.append(toy);
    } else { 
      toy.style.left = 'initial';
      toy.style.top = 'initial';
      nativeSocket?.append(toy);
    }
    toyCount.textContent = String(nativeSocket?.querySelectorAll('.favorite-card-img').length || '');
  }

  changeTree(e:Event): void {
    const target = <HTMLImageElement>e.target
    if (target.classList.contains('tree-item')) {
      const newTreeNum = target.getAttribute('data-tree');
      const currentTree = <HTMLImageElement>document.querySelector('.current-tree');
      currentTree.src = `./assets/tree/${newTreeNum}.webp`;
    }
  }

  changeBg(e:Event): void {
    const target = <HTMLImageElement>e.target
    if (target.classList.contains('bg-item')) {
      const newBgNum = target.getAttribute('data-bg');
      const currentBg = <HTMLImageElement>document.querySelector('.tree-workspace');
      currentBg.style.backgroundImage = `url(./assets/bg/${newBgNum}.webp)`;
    }
  }
}
