import _ from 'lodash';
import stylish from './stylish.js';

const [changedVal, notChangedVal, addVal, deletedVal, nested] = ['changedVal', 'notChangedVal', 'addVal', 'deleted', 'nested'];

const compare = (data1, data2, format = stylish) => {
  const keysData1 = Object.keys(data1);
  const keysData2 = Object.keys(data2);
  const allKeys = _.union(keysData1, keysData2).sort();

  const compareFiles = allKeys.reduce((acc, element) => {
    const valueData1 = data1[element];
    const valueData2 = data2[element];

    if (_.isObject(valueData1) && _.isObject(valueData2)) {
      return acc.concat({ key: element, value: compare(valueData1, valueData2), type: nested });
    }
    if (Object.hasOwn(data2, element) && Object.hasOwn(data1, element)) {
      if (valueData1 === valueData2) {
        return acc.concat({ key: element, value: valueData1, type: notChangedVal });
      }
      return acc.concat({ key: element, value: [valueData1, valueData2], type: changedVal });
    }
    if (Object.hasOwn(data1, element) && !Object.hasOwn(data2, element)) {
      return acc.concat({ key: element, value: valueData1, type: deletedVal });
    }
    if (!Object.hasOwn(data1, element) && Object.hasOwn(data2, element)) {
      return acc.concat({ key: element, value: valueData2, type: addVal });
    }
    return format(acc);
  }, []);
  return compareFiles;
};

export default compare;
