import { isPlainObject, clone } from '@ntks/toolbox';

import {
  DataValue,
  isDataValueValid,
  FilterDescriptor,
  SearchCondition,
  SearchEvents,
  SearchContextDescriptor,
  SearchContext as ISearchContext,
} from '../core';
import { ValueContext } from './value';

class SearchContext extends ValueContext<SearchCondition, SearchEvents> implements ISearchContext {
  private readonly filters: FilterDescriptor[];

  private readonly filterMap: { [key: string]: FilterDescriptor };

  private condition: SearchCondition;

  constructor({ filters, defaultValue }: SearchContextDescriptor) {
    super({ defaultValue });

    this.condition = defaultValue;
    this.filters = filters;
    this.filterMap = filters.reduce((prev, filter) => ({ ...prev, [filter.name]: filter }), {});

    super.on('change', value => (this.condition = value));
  }

  public setValue(value: SearchCondition): void {
    if (!isPlainObject(value)) {
      return;
    }

    super.setValue(value);
  }

  public getFilters(): FilterDescriptor[] {
    return clone(this.filters);
  }

  public getFilterValue<FV extends DataValue = DataValue>(name: string): FV | undefined {
    return this.condition[name];
  }

  public setFilterValue<FV>(name: string, value: FV): void {
    const filter = this.filterMap[name];

    if (filter === undefined || !isDataValueValid(filter.dataType!, value)) {
      return;
    }

    super.setValue({ ...this.condition, [name]: value });
    this.emit('filterChange', { name, value });
  }
}

export { SearchContext };
