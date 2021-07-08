import { getComponentConfig, BaseHeadlessComponent } from '@petals/basic';

import { IBreadcrumbItemComponent } from '../typing';

class BreadcrumbItemHeadlessComponent extends BaseHeadlessComponent<IBreadcrumbItemComponent> {
  public getComponentName(): string {
    return getComponentConfig('breadcrumbItem', 'name') || 'BreadcrumbItem';
  }
}

export { BreadcrumbItemHeadlessComponent };
