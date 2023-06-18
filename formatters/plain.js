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
  const iter = (items, elKey) => {
    const itemToPlain = items.map((element) => {
      const path = elKey.concat(element.key);
      const joinPath = path.join('.');
      switch (element.type) {
        case types.addVal:
          return `Property '${joinPath}' was added with value: ${valToStr(element.value)}`;
        case types.deletedVal:
          return `Property '${joinPath}' was removed`;
        case types.changedVal:
          return `Property '${joinPath}' was updated. From ${valToStr(element.value[0])} to ${valToStr(element.value[1])}`;
        case types.nested:
          return iter(element.children, path);
        case types.notChangedVal:
          return null;
        default:
          throw new Error(`Type ${element.type} is not defined`);
      }
    });
    const plainObj = _.remove(itemToPlain, null);
    return plainObj.join('\n');
  };
  return iter(tree, []);
};

export default plain;
