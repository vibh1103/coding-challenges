module.exports = class CountingStrategy {
  count(data) {
    throw new Error("count method must be implemented");
  }
};
