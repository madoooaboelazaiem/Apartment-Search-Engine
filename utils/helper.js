const convertObjectIdToString = (objectId) => {
  return objectId.toString();
};
const removeUndefinedKeys = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
};
const checkIfKeyExists = ({ object, key }) => {
  return Object.prototype.hasOwnProperty.call(object, key);
};
module.exports = {
  convertObjectIdToString,
  removeUndefinedKeys,
  checkIfKeyExists,
};
