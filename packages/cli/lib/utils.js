module.exports.hide = value => {
  if (value) {
    return "•".repeat(value.length);
  }

  return value;
};
