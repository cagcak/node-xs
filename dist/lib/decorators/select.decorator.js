"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Select = void 0;
function Select(state, options) {
    return function (target, propertyKey) {
        let value = target[propertyKey];
        return Object.defineProperty(target, propertyKey, {
            set: (newValue) => {
                value = null;
            },
            get: () => value,
        });
    };
}
exports.Select = Select;
//# sourceMappingURL=select.decorator.js.map