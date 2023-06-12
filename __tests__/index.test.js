import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (file) => path.join(__dirname, '..', '__fixtures__', file);
const readFile = (file) => readFileSync(getFixturePath(file), 'utf-8');

test('genDiffJSONFile', () => {
  const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('expectedFile.txt');
  expect(current).toEqual(expected);
});

test('genDiffYmlFile', () => {
  const current = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yml'));
  const expected = readFile('expectedFile.txt');
  expect(current).toEqual(expected);
});

test('checkUnexpectedFormat', () => {
  expect(() => genDiff(getFixturePath('errorFile.txt'), getFixturePath('file2.yml'))).toThrow(Error);
});

test('checkUnexpectedTypeElement', () => {
  expect(() => stylish([{ key: 'element', value: 'valueData2', type: 'errorType' }])).toThrow(Error);
});
