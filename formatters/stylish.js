import _ from 'lodash';

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

const stringify = (eachVal, depth) => {
  if (!_.isObject(eachVal)) {
    return eachVal;
  }
  const objectToString = Object.entries(eachVal)
    .map(([key, value]) => `${indentSimple(depth + 1)}${key}: ${stringify(value, depth + 1)}\n`);
  return `{\n${objectToString.join('')}${indentSimple(depth)}}`;
};

const resultStr = (dep, key, value, sign) => `${indentSpecial(dep)}${sign} ${key}: ${stringify(value, dep)}`;

const stylish = (data, depth = 1) => {
  const valToStr = data.map((element) => {
    switch (element.type) {
      case 'addVal':
        return resultStr(depth, element.key, element.value, '+');
      case 'deletedVal':
        return resultStr(depth, element.key, element.value, '-');
      case 'changedVal':
        return (`${resultStr(depth, element.key, element.value[0], '-')}\n${resultStr(depth, element.key, element.value[1], '+')}`);
      case 'notChangedVal':
        return resultStr(depth, element.key, element.value, ' ');
      case 'nested':
        return resultStr(depth, element.key, stylish(element.children, depth + 1), ' ');
      default:
        throw new Error(`Type ${element.type} is not defined`);
    }
  });
  const result = valToStr.join('\n');
  return `{\n${result}\n${indentSimple(depth - 1)}}`;
};

export default stylish;
