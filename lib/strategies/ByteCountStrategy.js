const CountingStrategy = require("./CountingStrategy");

module.exports = class ByteCountStrategy extends CountingStrategy {
  count(data) {
    return Buffer.byteLength(data);
  }
};
