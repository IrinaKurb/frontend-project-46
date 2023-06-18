import _ from 'lodash';
import * as types from '../formatters/typesOfObjects.js';

const compare = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const allKeys = _.union(keysData1, keysData2);
  const sortedKeys = _.sortBy(allKeys);

  const compareFiles = sortedKeys.reduce((acc, eachKey) => {
    const valueData1 = data1[eachKey];
    const valueData2 = data2[eachKey];

    if (_.isObject(valueData1) && _.isObject(valueData2)) {
      return acc
        .concat({ key: eachKey, children: compare(valueData1, valueData2), type: types.nested });
    }
    if (Object.hasOwn(data2, eachKey) && Object.hasOwn(data1, eachKey)) {
      if (valueData1 === valueData2) {
        return acc.concat({ key: eachKey, value: valueData1, type: types.notChangedVal });
      }
      return acc
        .concat({ key: eachKey, value: [valueData1, valueData2], type: types.changedVal });
    }
    if (Object.hasOwn(data1, eachKey) && !Object.hasOwn(data2, eachKey)) {
      return acc
        .concat({ key: eachKey, value: valueData1, type: types.deletedVal });
    }
    if (!Object.hasOwn(data1, eachKey) && Object.hasOwn(data2, eachKey)) {
      return acc.concat({ key: eachKey, value: valueData2, type: types.addVal });
    }
    return acc;
  }, []);
  return compareFiles;
};

export default compare;
