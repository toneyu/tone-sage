import { Component, Setting } from 'types/models';

export const getSetting = (component: Component | Setting | undefined, type: number) =>
  component?.Settings?.find((setting) => setting.Type === type);
