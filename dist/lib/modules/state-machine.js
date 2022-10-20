"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StateMachine = void 0;
class StateMachine {
    constructor(_state) {
        this._state = _state;
        this.state = JSON.stringify(process.env.STATE);
        this.initialState = {};
        if (!process.env.STATE && !this._state) {
            this.store = this.initialState;
        }
        else if (this._state) {
            this.store = this._state;
        }
    }
    get store() {
        return (JSON.parse(process.env.STATE || "{}") || this.state);
    }
    set store(state_) {
        this.state = state_;
        if (state_ === null || state_ === "null") {
            const _a = process.env, { STATE } = _a, ENV = __rest(_a, ["STATE"]);
            process.env = ENV;
            return;
        }
        process.env.STATE = JSON.stringify(this.state);
    }
    select(key) {
        if (!key) {
            console.warn("No key specified!");
            return null;
        }
        else if (!this.store || !this.store[key]) {
            console.warn("No value found!");
            return null;
        }
        return this.store[key];
    }
    patch(key, value) {
        if (!key || !value) {
            console.warn(`Invalid key or value specified:\nkey: ${key.toString()},\nvalue: ${value}`);
            return;
        }
        this.store = Object.assign(Object.assign({}, this.state), { [key]: value });
    }
    clean(key) {
        if (!this.store) {
            console.warn("No store present");
            return;
        }
        if (key &&
            Object.keys(this.store).includes(key) &&
            this.store[key]) {
            this.store = Object.entries(this.store)
                .filter(([_key, val]) => _key !== key)
                .reduce((acc, [key, val]) => (Object.assign(Object.assign({}, acc), { [key]: val })), {});
            console.log(`${key} has been removed from the store`);
            return;
        }
        this.store = null;
        console.log("The store has been removed");
    }
}
exports.StateMachine = StateMachine;
//# sourceMappingURL=state-machine.js.map