import { DefaultState, Options } from "../models";

export function Select<T = DefaultState>(
  state?: T,
  options?: Options
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    let value: T = target[propertyKey];

    return Object.defineProperty(target, propertyKey, {
      set: (newValue: string) => {
        value = null as unknown as T;
      },
      get: (): T => value,
    });
  };
}
