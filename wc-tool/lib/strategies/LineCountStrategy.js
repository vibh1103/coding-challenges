const CountingStrategy = require("./CountingStrategy");

module.exports = class LineCountStrategy extends CountingStrategy {
  count(data) {
    return data.split("\n").length - 1;
  }
};
