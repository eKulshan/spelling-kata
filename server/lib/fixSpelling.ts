import { checkText } from 'yandex-speller';

interface checkResultItem {
  word: string,
  s: Array<string>
}

interface checkResultSchema {
  [index: string]: checkResultItem,
}

const fixTypos = (text: string, checkResult: checkResultSchema) => {
  const fixedText = [];
  let i = 0;
  // @ts-ignore
  checkResult.forEach(({ pos, len, s: [suggestion] }: {pos: number, len: number, s: string}) => {
    fixedText.push(text.slice(i, pos));
    fixedText.push(suggestion);
    i = pos + len;
  });
  fixedText.push(text.slice(i));
  return fixedText.join('');
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
      // eslint-disable-next-line no-console
      console.log(err);
      throw (err);
    });
};
