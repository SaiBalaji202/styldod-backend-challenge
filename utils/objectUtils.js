const cleanObject = (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== null && v !== undefined)
  );

const isEmptyObject = (obj) => JSON.stringify(obj) === JSON.stringify({});

module.exports = {
  cleanObject,
  isEmptyObject,
};
