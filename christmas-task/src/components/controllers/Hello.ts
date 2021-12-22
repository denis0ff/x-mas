export class Hello {
  async initialize() {
    const helloTempClone = (<HTMLTemplateElement>document.querySelector('#helloTemp')).content.cloneNode(true);
    const main = <HTMLElement>document.querySelector('.main');
    main.innerHTML = '';
    main.appendChild(helloTempClone);
  }
}
