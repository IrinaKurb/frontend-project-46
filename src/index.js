// здесь функция genDiff

import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import selectorOfFormat from '../formatters/index.js';

const parsedData = (pathToData) => {
  const fullPathToData = path.resolve(process.cwd(), pathToData);
  const readedData = fs.readFileSync(fullPathToData, 'utf-8');
  const typeOfData = path.extname(pathToData).slice(1);
  return parse(readedData, typeOfData);
};

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = parsedData(path1);
  const data2 = parsedData(path2);
  const comparedData = buildTree(data1, data2);
  return selectorOfFormat(comparedData, format);
};

export default genDiff;
