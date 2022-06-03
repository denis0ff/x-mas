export class Hello {
  async initialize(pageLinksArray: NodeListOf<HTMLElement>): Promise<void> {
    pageLinksArray.forEach((page) =>
      page.classList.contains('header-logo') ? page.classList.add('active') : page.classList.remove('active')
    );
    const helloTempClone = (<HTMLTemplateElement>document.querySelector('#helloTemp')).content.cloneNode(true);
    const main = <HTMLElement>document.querySelector('.main');
    main.innerHTML = '';
    main.appendChild(helloTempClone);
  }
}
