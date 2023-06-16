import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (file) => path.join(__dirname, '..', '__fixtures__', file);
const readFile = (file) => readFileSync(getFixturePath(file), 'utf-8');

test('genDiffJSONFile_stylishFormat', () => {
  const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('expectedStylish.txt');
  expect(current).toEqual(expected);
});

test('genDiffYmlFile__stylishFormat', () => {
  const current = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'));
  const expected = readFile('expectedStylish.txt');
  expect(current).toEqual(expected);
});

test('genDiffJSONFile_plainFormat', () => {
  const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expected = readFile('expectedPlain.txt');
  expect(current).toEqual(expected);
});

test('genDiffYmlFile_plainFormat', () => {
  const current = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'), 'plain');
  const expected = readFile('expectedPlain.txt');
  expect(current).toEqual(expected);
});

test('checkUnexpectedFormat', () => {
  expect(() => genDiff(getFixturePath('errorFile.txt'), getFixturePath('file2.yml'))).toThrow(Error);
});

test('checkUnexpectedTypeElement', () => {
  expect(() => stylish([{ key: 'element', value: 'valueData2', type: 'errorType' }])).toThrow(Error);
});

test('checkUnexpectedTypeElement', () => {
  expect(() => plain([{ key: 'element', value: 'valueData2', type: 'errorType' }])).toThrow(Error);
});