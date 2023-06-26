import _ from 'lodash';

const buildTree = (data1, data2) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const allKeys = _.union(keysData1, keysData2);
  const sortedKeys = _.sortBy(allKeys);

  const findDiff = sortedKeys.map((eachKey) => {
    const valueData1 = data1[eachKey];
    const valueData2 = data2[eachKey];

    if (_.isObject(valueData1) && _.isObject(valueData2)) {
      return { key: eachKey, children: buildTree(valueData1, valueData2), type: 'nested' };
    }
    if (Object.hasOwn(data1, eachKey) && Object.hasOwn(data2, eachKey)
      && !_.isEqual(valueData1, valueData2)) {
      return { key: eachKey, value: [valueData1, valueData2], type: 'changedVal' };
    }
    if (Object.hasOwn(data1, eachKey) && !Object.hasOwn(data2, eachKey)) {
      return { key: eachKey, value: valueData1, type: 'deletedVal' };
    }
    if (!Object.hasOwn(data1, eachKey) && Object.hasOwn(data2, eachKey)) {
      return { key: eachKey, value: valueData2, type: 'addVal' };
    }
    return { key: eachKey, value: valueData1, type: 'notChangedVal' };
  });
  return findDiff;
};

export default buildTree;
