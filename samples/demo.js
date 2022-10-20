const nodeXs = require("../dist/node-xs");
// const bundle = require("./dist/node-xs.min.js");

const store = nodeXs.store({ no: 1, mark: "developer mark" });
const slice = store.select("no");

console.log({ slice });
