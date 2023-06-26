// здесь функция genDiff

import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildTree from './buildTree.js';
import selectorOfFormat from '../formatters/index.js';

const getPathToWorkDir = () => process.cwd();
const getPathToData = (dataPath) => path.resolve(getPathToWorkDir(), dataPath);
const readData = (dataPath) => fs.readFileSync(dataPath, 'utf-8');
const getTypeOfData = (dataPath) => path.extname(dataPath).slice(1);

const genDiff = (path1, path2, format = 'stylish') => {
  const data1 = parse(readData(getPathToData(path1)), getTypeOfData(path1));
  const data2 = parse(readData(getPathToData(path2)), getTypeOfData(path2));
  const comparedData = buildTree(data1, data2);
  return selectorOfFormat(comparedData, format);
};

export default genDiff;
