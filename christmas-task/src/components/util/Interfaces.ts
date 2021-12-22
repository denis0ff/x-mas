interface IData extends IDataIterators {
  color: string;
  count: string;
  favorite: boolean;
  name: string;
  num: string;
  shape: string;
  size: string;
  year: string;
}

interface IDataIterators {
  [x: string]: string | boolean;
}

interface IFilterIterators {
  [x: string]: boolean | IBooleanMap | IRangeProp | string;
}

interface IFilter extends IFilterIterators {
  shape: IBooleanMap;
  color: IBooleanMap;
  size: IBooleanMap;
  year: IRangeProp;
  count: IRangeProp;
  favorite: boolean;
  sort: IBooleanMap;
}

interface IBooleanMap {
  [x: string]: boolean;
}

interface IStringMap {
  [x: string]: string;
}

interface INumberMap {
  [x: string]: number;
}

interface IRangeProp extends INumberMap {
  from: number;
  to: number;
}

type FilterProp = string[] | boolean | number | INumberMap | IBooleanMap | string | IRangeProp;

interface IInput {
  readonly basicFilter: IFilter;
  savedFilter: IFilter;
  readonly inputData: IData[];
  savedPicks: IData[];
}

type SortFunction = (a: HTMLElement, b: HTMLElement) => number;

interface ParamsAreSortFunctions {
  [x: string]: SortFunction;
}

export {
  IData,
  IFilter,
  IStringMap,
  FilterProp,
  IBooleanMap,
  IRangeProp,
  INumberMap,
  IDataIterators,
  IInput,
  ParamsAreSortFunctions,
};
