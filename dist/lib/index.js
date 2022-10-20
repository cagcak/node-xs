"use strict";
const decorators_1 = require("./decorators");
const modules_1 = require("./modules");
module.exports = {
    Store: (state) => new modules_1.StateMachine(state),
    Select: decorators_1.Select,
};
//# sourceMappingURL=index.js.map