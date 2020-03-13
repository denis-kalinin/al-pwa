
declare module 'al-design-system' {
  import Vue, { Component, PluginFunction, VueConstructor, DirectiveOptions } from 'vue';
  const alds: DesignSystem;
  interface DesignSystem {
    install: PluginFunction<Vue>
  }
  export default alds;
}