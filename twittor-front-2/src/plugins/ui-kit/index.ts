import { App, Component } from 'vue';
import UiInput from './components/ui-input.vue';
import UiBtn from './components/ui-btn.vue';

// Global components. Should be loaded on module registration.
const globalComponents: Record<string, Component> = {
  'ui-input': UiInput,
  'ui-btn': UiBtn
};

/**
 * Plugin provides the common UI kit.
 */
const uiPlugin = (app: App): void => {
  Object
    .entries<Component>(globalComponents)
    .forEach(([name, c]) => {
      app.component(name, c)
    })
}

export default uiPlugin;
