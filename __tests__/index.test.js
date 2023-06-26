import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import selectorOfFormat from '../formatters/index.js';

const dataName = fileURLToPath(import.meta.url);
const dirName = dirname(dataName);
const getFixturePath = (data) => path.join(dirName, '..', '__fixtures__', data);

const readFile = (data) => readFileSync(getFixturePath(data), 'utf-8');

const filesForCheck = [
  ['file1.json', 'file2.json', 'expectedStylish.txt'],
  ['file1.yaml', 'file2.yml', 'expectedStylish.txt'],
  ['file1.json', 'file2.json', 'expectedPlain.txt', 'plain'],
  ['file1.yaml', 'file2.yml', 'expectedPlain.txt', 'plain'],
  ['file1.json', 'file2.json', 'expectedJSONStr.txt', 'json'],
  ['file1.yaml', 'file2.yml', 'expectedJSONStr.txt', 'json'],
];

test.each(filesForCheck)('when compare %s and %s, expect %s', (file1, file2, expectedResult, format = 'stylish') => {
  expect(genDiff(getFixturePath(file1), getFixturePath(file2), format))
    .toEqual(readFile(expectedResult));
});

test('check Unexpected Format1', () => {
  expect(() => genDiff(getFixturePath('errorFile.txt'), getFixturePath('file2.yml'))).toThrow(Error);
});

test('check Unexpected Format2', () => {
  expect(() => selectorOfFormat(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')), 'txt')).toThrow(Error);
});

test('check Unexpected Type of Element1', () => {
  expect(() => stylish([{ key: 'element', value: 'valueData2', type: 'errorType' }])).toThrow(Error);
});

test('check Unexpected Type of Element2', () => {
  expect(() => plain([{ key: 'element', value: 'valueData2', type: 'errorType' }])).toThrow(Error);
});
