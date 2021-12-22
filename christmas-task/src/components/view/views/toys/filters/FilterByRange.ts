import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { IStringMap, IRangeProp, IFilter, INumberMap } from '../../../../util/Interfaces';

export class FilterByRange {
  transpliter: IStringMap;

  fragment: DocumentFragment;

  readonly basicFilter: IFilter;

  constructor(basicFilter: IFilter) {
    this.basicFilter = basicFilter;
    this.fragment = document.createDocumentFragment();
    this.transpliter = {
      year: 'Год приобретения',
      count: 'Количество экземпляров',
    };
  }

  draw(key: string, props: IRangeProp): void {
    const fieldContainer = document.createElement('div');
    fieldContainer.textContent = `${this.transpliter[key]}:`;
    fieldContainer.classList.add(key);
    this.drawRangeProps(fieldContainer, props, key);
    this.fragment.appendChild(fieldContainer);
  }

  drawRangeProps(container: HTMLDivElement, props: IRangeProp, key: string): void {
    const rangeContainer = document.createElement('div');
    rangeContainer.id = `${key}Slider`;
    rangeContainer.classList.add('filter-range');
    noUiSlider.create(rangeContainer, {
      start: [props.from, props.to],
      step: 1,
      connect: true,
      range: {
        min: (<INumberMap>this.basicFilter[key]).from,
        max: (<INumberMap>this.basicFilter[key]).to,
      },
    });
    const output1 = document.createElement('output');
    const output2 = document.createElement('output');
    output1.classList.add('slider-output');
    output2.classList.add('slider-output');
    output1.textContent = String(props.from);
    output2.textContent = String(props.to);
    const wrapper = document.createElement('div');
    wrapper.classList.add('filter-wrapper');
    wrapper.append(output1, rangeContainer, output2);
    container.append(wrapper);
  }
}
