// здесь функция genDiff

import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import compare from './compare.js';

const getPathFile = (filePath) => path.resolve(filePath);
const getTypeOfFile = (filePath) => path.extname(filePath).slice(1);
const getDataFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

const genDiff = (path1, path2) => {
  const pathFile1 = getPathFile(path1);
  const pathFile2 = getPathFile(path2);
  const getDataFile1 = getDataFile(pathFile1);
  const getDataFile2 = getDataFile(pathFile2);
  const parsedFile1 = parse(getDataFile1, getTypeOfFile(path1));
  const parsedFile2 = parse(getDataFile2, getTypeOfFile(path2));
  const result = compare(parsedFile1, parsedFile2);
  console.log(result);
  return result;
};

export default genDiff;
