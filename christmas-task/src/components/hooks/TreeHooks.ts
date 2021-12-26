import { ITreeSettings } from '../util/Interfaces';

export class TreeHooks {
  audio: HTMLAudioElement;

  snowKiller: NodeJS.Timeout | null;

  settings: ITreeSettings;

  basicSettings: ITreeSettings;

  garlandColor: string;

  constructor(basicSettings: ITreeSettings, currentSettings: ITreeSettings) {
    this.settings = currentSettings;
    this.basicSettings = basicSettings;
    this.garlandColor = 'multi';
    this.audio = new Audio('./../assets/audio/audio.mp3');
    this.audio.loop = true;
    this.snowKiller = null;
  }

  initialize(): void {
    if (this.settings.music) window.addEventListener('click', () => this.playMusic(true), { once: true });
    this.showSnow(true);
    this.listen();
  }

  listen(): void {
    window.addEventListener('beforeunload', () => this.saveSettings());
    window.addEventListener('hashchange', () => this.saveSettings());
    document.ondragover = (e) => e.preventDefault();
    document.ondrop = (e) => this.drop(e);
    document.querySelectorAll('.favorites-card').forEach((card) => {
      card.addEventListener('mousedown', (e) => this.drag(e));
    });
    (<HTMLDivElement>document.querySelector('.tree-menu')).addEventListener('click', (e) => this.changeTree(e));
    (<HTMLDivElement>document.querySelector('.bg-menu')).addEventListener('click', (e) => this.changeBg(e));
    (<HTMLDivElement>document.querySelector('.garland-btns')).addEventListener('click', (e) => this.changeGarland(e));
    (<HTMLDivElement>document.querySelector('.sound-snow-menu')).addEventListener('click', (e) =>
      this.soundSnowResetPick(e)
    );
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
      this.settings.treeNum = <string>target.getAttribute('data-tree');
      const currentTree = <HTMLImageElement>document.querySelector('.current-tree');
      currentTree.src = `./assets/tree/${this.settings.treeNum}.webp`;
    }
  }

  changeBg(e: Event): void {
    const target = <HTMLImageElement>e.target;
    if (target.classList.contains('bg-item')) {
      this.settings.bgNum = <string>target.getAttribute('data-bg');
      const currentBg = <HTMLImageElement>document.querySelector('.tree-workspace');
      currentBg.style.backgroundImage = `url(./assets/bg/${this.settings.bgNum}.webp)`;
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
    for (let i = 0; i < 10; i++) {
      const lightrope = document.createElement('ul');
      lightrope.className = 'lightrope';
      for (let j = 0; j < i + 3; j++) {
        const light = document.createElement('li');
        light.className = 'light ' + this.garlandColor;
        light.style.transform = `rotate(${60 + j * 5}deg) translate(${60 + i * 10}px) rotate(-${60 + j * 5}deg)`;

        lightrope.appendChild(light);
      }
      wsGarland.appendChild(lightrope);
    }
  }

  soundSnowResetPick(e: Event): void {
    const target = <HTMLButtonElement>e.target;
    if (target.classList.contains('sound')) this.playMusic();
    if (target.classList.contains('snow')) this.showSnow();
    if (target.classList.contains('button-reset')) this.resetSettings();
  }

  playMusic(isPlay?: boolean): void {
    if (isPlay) this.settings.music = true;
    else this.settings.music = !this.settings.music;
    if (this.settings.music) this.audio.play();
    else this.audio.pause();
  }

  showSnow(isStart?: boolean): void {
    const snowContainer = <HTMLDivElement>document.querySelector('.workspace-snow');
    if (!isStart) {
      snowContainer.classList.toggle('fall');
      this.settings.snow = !this.settings.snow;
    }
    if (snowContainer.classList.contains('fall'))
      this.snowKiller = setInterval(() => this.drawSnowFlakes(snowContainer), 50);
    else clearInterval(<NodeJS.Timeout>this.snowKiller);
  }

  drawSnowFlakes(container: HTMLDivElement): void {
    const snowflake = document.createElement('i');
    const size = Math.random() * 2 + 1 + '%';

    snowflake.className = 'snowflake';
    snowflake.style.left = Math.random() * container.offsetWidth + 'px';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = String(Math.random());
    snowflake.style.width = size;
    snowflake.style.height = size;

    container.appendChild(snowflake);

    setTimeout(() => {
      snowflake.remove();
    }, 5000);
  }

  saveSettings(): void {
    localStorage.setItem('tree-settings', JSON.stringify(this.settings));
  }

  resetSettings(): void {
    console.log(this.settings);

    this.settings = JSON.parse(JSON.stringify(this.basicSettings));
    console.log(this.settings);
    this.audio.pause();
    clearInterval(<NodeJS.Timeout>this.snowKiller);
    (<HTMLImageElement>document.querySelector('.current-tree')).src = `./assets/tree/${this.settings.treeNum}.webp`;
    (<HTMLImageElement>(
      document.querySelector('.tree-workspace')
    )).style.backgroundImage = `url(./assets/bg/${this.settings.bgNum}.webp)`;
  }
}
