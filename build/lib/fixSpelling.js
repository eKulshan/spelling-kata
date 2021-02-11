Object.defineProperty(exports, '__esModule', { value: true });
const yandex_speller_1 = require('yandex-speller');

const fixTypos = (text, checkResult) => {
  const words = text.split(' ');
  // @ts-ignore
  checkResult.forEach(({ s: suggestion, word }) => {
    const index = words.indexOf(word);
    words.splice(index, 1, suggestion[0]);
  });
  return words.join(' ');
};
exports.default = async (text) => {
  const promise = new Promise((resolve, reject) => {
    const cb = (err, checkResult) => {
      if (err) {
        reject(err);
      }
      resolve(checkResult);
    };
    yandex_speller_1.checkText(text, cb);
  });
  return promise
    .then((checkResult) => fixTypos(text, checkResult))
    .catch((err) => {
      console.log(err);
      throw (err);
    });
};
