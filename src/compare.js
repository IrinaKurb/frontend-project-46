import _ from 'lodash';

const compare = (data1, data2) => {
  const keyData1 = Object.keys(data1);
  const keyData2 = Object.keys(data2);
  const commonKeys = _.union(keyData1, keyData2).sort();
  const indent = ' ';
  const constructor = commonKeys.reduce((acc, key) => {
    const valueData1 = data1[key];
    const valueData2 = data2[key];
    if (valueData1 === valueData2) {
      const str = [[key, valueData1, 'hasBoth']];
      return acc.concat(str);
    }
    if (valueData1 !== undefined && valueData2 !== undefined) {
      const str = [[key, valueData1, 'hasObj1'], [key, valueData2, 'hasObj2']];
      return acc.concat(str);
    }
    if (valueData1 === undefined) {
      const str = [[key, valueData2, 'hasObj2']];
      return acc.concat(str);
    }
    if (valueData2 === undefined) {
      const str = [[key, valueData1, 'hasObj1']];
      return acc.concat(str);
    }
    return constructor;
  }, []);

  const sortedConstructor = constructor.reduce((acc, element) => {
    if (element[2] === 'hasBoth') {
      return acc.concat(`${indent}   ${element[0]}: ${element[1]}`);
    }
    if (element[2] === 'hasObj1') {
      return acc.concat(`${indent} - ${element[0]}: ${element[1]}`);
    }
    if (element[2] === 'hasObj2') {
      return acc.concat(`${indent} + ${element[0]}: ${element[1]}`);
    }
    return sortedConstructor;
  }, []);
  return `{\n${sortedConstructor.join('\n')}\n}`;
};

export default compare;
