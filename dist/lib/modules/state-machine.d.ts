import { DefaultState } from "../models";
export declare class StateMachine<T = DefaultState> {
    private _state?;
    private state;
    private initialState;
    constructor(_state?: T | undefined);
    private get store();
    private set store(value);
    select<K = T[keyof T]>(key: keyof T): K;
    patch<V = any>(key: keyof T, value: V): void;
    clean(key?: keyof T): void;
}
