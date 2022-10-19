import { DefaultState } from "../models";

export class StateMachine<T = DefaultState> {
  private state = JSON.stringify(process.env.STATE) as unknown as T;
  private initialState = {} as T;

  constructor(private _state?: T) {
    if (!process.env.STATE && !this._state) {
      this.store = this.initialState;
    } else if (this._state) {
      this.store = this._state;
    }
  }

  private get store(): T {
    return (
      (JSON.parse((process.env.STATE as string) || "{}") as T) || this.state
    );
  }

  private set store(state_: T) {
    this.state = state_;

    if (state_ === null || (state_ as unknown) === "null") {
      const { STATE, ...ENV } = process.env;
      process.env = ENV;
      return;
    }

    process.env.STATE = JSON.stringify(this.state);
  }

  select<K = T[keyof T]>(key: keyof T): K {
    if (!key) {
      console.warn("No key specified!");
      return null as unknown as K;
    } else if (!this.store || !(this.store as any)[key]) {
      console.warn("No value found!");
      return null as unknown as K;
    }

    return (this.store as any)[key] as unknown as K;
  }

  patch<V = any>(key: keyof T, value: V) {
    if (!key || !value) {
      console.warn(
        `Invalid key or value specified:\nkey: ${key.toString()},\nvalue: ${value}`
      );
      return;
    }

    this.store = {
      ...this.state,
      [key]: value,
    };
  }

  clean(key?: keyof T) {
    if (!this.store) {
      console.warn("No store present");
      return;
    }

    if (
      key &&
      Object.keys(this.store).includes(key as string) &&
      this.store[key]
    ) {
      this.store = Object.entries(this.store)
        .filter(([_key, val]) => _key !== key)
        .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {} as T);

      console.log(`${key} has been removed from the store`);
      return;
    }

    this.store = null as unknown as T;
    console.log("The store has been removed");
  }
}
