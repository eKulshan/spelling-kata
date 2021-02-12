import * as _ from 'lodash';
import { checkText } from 'yandex-speller';

interface checkResultItem {
  word: string,
  s: Array<string>
}

interface checkResultSchema {
  [index: string]: checkResultItem,
}

const fixTypos = (text: string, checkResult: checkResultSchema) => {
  const isCapitalized = (str: string): boolean => str === _.capitalize(str);
  const words = _.words(text);
  // @ts-ignore
  checkResult.forEach(({ s: suggestion, word }) => {
    const index = _.indexOf(words, word);
    words.splice(index, 1, suggestion[0]);
  });
  let fixedText = '';
  words.forEach((word, index) => {
    if (index === 0) {
      fixedText += `${word}`;
      return;
    }
    if (isCapitalized(word)) {
      fixedText += `. ${word}`;
      return;
    }
    fixedText += ` ${word}`;
  });
  return fixedText;
};

export default async (text: string) => {
  const promise = new Promise((resolve, reject) => {
    const cb = (err: Error, checkResult: checkResultSchema) => {
      if (err) {
        reject(err);
      }
      resolve(checkResult);
    };

    checkText(text, cb);
  });
  return promise
    .then((checkResult: checkResultSchema) => fixTypos(text, checkResult))
    .catch((err: Error) => {
      console.log(err);
      throw (err);
    });
};
