import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (file) => path.join(__dirname, '..', '__fixtures__', file);

test('genDiff', () => {
  const current = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFileSync(getFixturePath('expectedFile.txt'), 'utf-8');
  expect(current).toEqual(expected);
});
