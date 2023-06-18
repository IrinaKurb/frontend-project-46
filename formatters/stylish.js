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

const stylish = (tree) => {
  const iter = (data, depth) => {
    const valToStr = data.map((element) => {
      switch (element.type) {
        case types.addVal:
          return (`${indentSpecial(depth)}+ ${element.key}: ${stringify(element.value, depth)}`);
        case types.deletedVal:
          return (`${indentSpecial(depth)}- ${element.key}: ${stringify(element.value, depth)}`);
        case types.changedVal:
          return ([`${indentSpecial(depth)}${[`- ${element.key}: ${stringify(element.value[0], depth)}`]}\n${[`${indentSpecial(depth)}+ ${element.key}: ${stringify(element.value[1], depth)}`]}`]);
        case types.notChangedVal:
          return (`${indentSpecial(depth)}  ${element.key}: ${stringify(element.value, depth)}`);
        case types.nested:
          return (`${indentSpecial(depth)}  ${element.key}: ${iter(element.children, depth + 1)}`);
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
