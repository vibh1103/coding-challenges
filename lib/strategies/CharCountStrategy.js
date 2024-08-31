const CountingStrategy = require("./CountingStrategy");

module.exports = class CharCountStrategy extends CountingStrategy {
  count(data) {
    return data.length;
  }
};
