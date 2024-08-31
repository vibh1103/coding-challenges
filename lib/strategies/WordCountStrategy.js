const CountingStrategy = require("./CountingStrategy");

module.exports = class WordCountStrategy extends CountingStrategy {
  count(data) {
    return data.split(/\s+/).filter(Boolean).length;
  }
};
