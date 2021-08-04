import { ComponentDescriptor, ActionDescriptor } from 'organik';
import { PluginObject, PluginFunction } from 'vue';

import { ThemeOptions } from '../common/types/theme';
import { ComponentCtor } from './component';
import { RouterCreator, RouteConfig } from './router';
import { StoreCreator, StoreModule } from './store';
import { ModuleDescriptor } from './module';

type RuntimePlugin<T extends any = never> = PluginObject<T> | PluginFunction<T>;

type Provider = { [key: string]: any };

type AppCreators = {
  router?: RouterCreator;
  store?: StoreCreator;
};

type MountEl = Element | string;

interface AppDescriptor {
  plugins?: RuntimePlugin[];
  creators?: AppCreators;
  components?: ComponentDescriptor[]; // includes controls and widgets
  metadata?: {
    actions?: ActionDescriptor[];
    modules?: ModuleDescriptor[];
  };
  theme?: ThemeOptions;
  root?: ComponentCtor;
  el?: MountEl;
  routes: RouteConfig[];
  provider?: Provider | (() => Provider);
  storeModules?: StoreModule[];
}

interface AppInstance {
  mount(el?: MountEl): void;
}

export { AppCreators, AppDescriptor, AppInstance };
