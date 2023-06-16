import stylish from './stylish.js';
import plain from './plain.js';

const selectFormat = (data, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(data);
  }
  return plain(data);
};

export default selectFormat;
