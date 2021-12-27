export class Error {
  async initialize(pageLinksArray: NodeListOf<HTMLElement>): Promise<void> {
    pageLinksArray.forEach((page) => page.classList.remove('active'));
    const main = <HTMLElement>document.querySelector('.main');
    main.innerHTML = '<h3 class="error404">Ошибка 404! Проверьте правильность пути в адресной строке.</h3>';
  }
}
