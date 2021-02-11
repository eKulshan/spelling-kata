import { checkText } from 'yandex-speller';

interface checkResultItem {
  word: string,
  s: Array<string>
}

interface checkResultSchema {
  [index: string]: checkResultItem,
}

const fixTypos = (text: string, checkResult: checkResultSchema) => {
  const words = text.split(' ');
  // @ts-ignore
  checkResult.forEach(({ s: suggestion, word }: { s: string, word: string }) => {
    const index = words.indexOf(word);
    words.splice(index, 1, suggestion[0]);
  });
  return words.join(' ');
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
