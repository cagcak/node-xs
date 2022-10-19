const { select, store } = require("./lib");
const mStore = require("./lib/index.min.js");

store({ n: 1, m: "3" });

console.log(select("m"));
