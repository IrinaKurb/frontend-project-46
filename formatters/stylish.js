import _ from 'lodash';
import * as types from './typesOfObjects.js';

const indentSpecial = (depth) => {
  const replacer = ' ';
  const spaceToEachDepth = 4;
  const shiftTotheLeft = 2;
  const indent = replacer.repeat(depth * spaceToEachDepth - shiftTotheLeft);
  return indent;
};

const indentSimple = (depth) => {
  const replacer = ' ';
  const spaceToEachDepth = 4;
  const indent = replacer.repeat(depth * spaceToEachDepth);
  return indent;
};

const stringify = (val, dep) => {
  const iter = (item, depth) => {
    if (!_.isObject(item)) {
      return item;
    }
    const entries = Object.entries(item);
    const objectToString = entries.map((eachVal) => {
      const [key, value] = eachVal;
      return `${indentSimple(depth + 1)}${key}: ${iter(value, depth + 1)}\n`;
    });
    const joinResult = objectToString.join('');
    return `{\n${joinResult}${indentSimple(depth)}}`;
  };
  return iter(val, dep);
};

const resultStr = (dep, key, value, sign) => `${indentSpecial(dep)}${sign} ${key}: ${stringify(value, dep)}`;

const stylish = (tree) => {
  const iter = (data, depth) => {
    const valToStr = data.map((element) => {
      switch (element.type) {
        case types.addVal:
          return resultStr(depth, element.key, element.value, '+');
        case types.deletedVal:
          return resultStr(depth, element.key, element.value, '-');
        case types.changedVal:
          return (`${resultStr(depth, element.key, element.value[0], '-')}\n${resultStr(depth, element.key, element.value[1], '+')}`);
        case types.notChangedVal:
          return resultStr(depth, element.key, element.value, ' ');
        case types.nested:
          return resultStr(depth, element.key, iter(element.children, depth + 1), ' ');
        default:
          throw new Error(`Type ${element.type} is not defined`);
      }
    });
    const result = valToStr.join('\n');
    return `{\n${result}\n${indentSimple(depth - 1)}}`;
  };
  return iter(tree, 1);
};

export default stylish;
