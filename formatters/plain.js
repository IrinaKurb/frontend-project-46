import _ from 'lodash';
import * as types from './typesOfObjects.js';

const valToStr = (elValue) => {
  if (!_.isObject(elValue) || Array.isArray(elValue)) {
    if (_.isString(elValue)) {
      return `'${elValue}'`;
    }
    return elValue;
  }
  return '[complex value]';
};

const plain = (tree) => {
  const iter = (element, elKey) => {
    const itemToPlain = element.flatMap((item) => {
      const { key, value, type } = item;
      const path = elKey.concat(key);
      const joinPath = path.join('.');
      switch (type) {
        case types.addVal:
          return `Property '${joinPath}' was added with value: ${valToStr(value)}`;
        case types.deletedVal:
          return `Property '${joinPath}' was removed`;
        case types.changedVal:
          return `Property '${joinPath}' was updated. From ${valToStr(value[0])} to ${valToStr(value[1])}`;
        case types.nested:
          return iter(value, path);
        case types.notChangedVal:
          return null;
        default:
          throw new Error(`Type ${type} is not defined`);
      }
    });
    const plainObj = _.remove(itemToPlain, null);
    return plainObj.join('\n');
  };
  return iter(tree, []);
};

export default plain;
