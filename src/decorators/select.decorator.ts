import { DefaultState, Options } from "../models";

export const select = <T = DefaultState>(
  options?: Options
): PropertyDecorator => {
  return (target: any, propertyKey: string | symbol) => {
    let value: T = target[propertyKey];

    return Object.defineProperty(target, propertyKey, {
      set: (newValue: string) => {
        value = null as unknown as T;
      },
      get: (): T => value,
    });
  };
};
