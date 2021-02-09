import axios from 'axios';

interface checkResultItem {
  word: string,
  s: Array<string>
}

interface checkResultSchema {
  [index: string]: checkResultItem,
}

const replaceWords = (text: string, checkResult: checkResultSchema) => {
  const words = text.split(' ');
  // @ts-ignore
  checkResult.forEach(({ s: suggestion, word }: { s: string, word: string }) => {
    const index = words.indexOf(word);
    words.splice(index, 1, suggestion[0]);
  });
  return words.join(' ');
};

const checkText = async (text: string) => {
  const url = 'https://speller.yandex.net/services/spellservice.json/checkText';
  const response = await axios({
    method: 'post',
    url,
    params: {
      text,
    },
  });
  return response.data;
};

export default async (text: string) => replaceWords(text, await checkText(text));
