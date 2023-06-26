import _ from 'lodash';

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
        case 'addVal':
          return `Property '${joinPath}' was added with value: ${valToStr(element.value)}`;
        case 'deletedVal':
          return `Property '${joinPath}' was removed`;
        case 'changedVal':
          return `Property '${joinPath}' was updated. From ${valToStr(element.value[0])} to ${valToStr(element.value[1])}`;
        case 'nested':
          return iter(element.children, path);
        case 'notChangedVal':
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
