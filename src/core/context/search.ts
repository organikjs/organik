import { mixin, pick } from '@ntks/toolbox';

import {
  ModelDescriptor,
  FilterDescriptor,
  SearchDescriptor,
  SearchCondition,
  SearchContextDescriptor,
  SearchContext,
} from '../typing';
import { createCreator } from '../creator';
import { getDefaultValue } from '../input';
import { resolveFieldMap } from '../model';

const [getSearchContextCreator, setSearchContextCreator] = createCreator(
  (descriptor: SearchContextDescriptor) => ({} as SearchContext), // eslint-disable-line @typescript-eslint/no-unused-vars
);

function resolveFilters(filters: FilterDescriptor[], model?: ModelDescriptor): FilterDescriptor[] {
  if (!model) {
    return filters;
  }

  const fieldMap = resolveFieldMap(model.fields);

  return filters.map(filter =>
    fieldMap[filter.name]
      ? (mixin(
          true,
          {},
          pick(fieldMap[filter.name], ['name', 'dataType', 'label']),
          filter,
        ) as FilterDescriptor)
      : filter,
  );
}

function resolveCondition(filters: FilterDescriptor[]): SearchCondition {
  return filters.length > 0
    ? filters.reduce((prev, filter) => ({ ...prev, [filter.name]: getDefaultValue(filter) }), {})
    : {};
}

function createSearchContext(descriptor: SearchDescriptor, model?: ModelDescriptor): SearchContext {
  const mergedFilters = resolveFilters(descriptor.filters, model);

  return getSearchContextCreator()({
    filters: mergedFilters,
    defaultValue: resolveCondition(mergedFilters),
  });
}

export { setSearchContextCreator, createSearchContext };
