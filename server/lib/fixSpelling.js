import axios from 'axios';

const replaceWords = (text, checkResult) => {
  const words = text.split(' ');
  checkResult.forEach(({ s: suggestion, word }) => {
    const index = words.indexOf(word);
    words.splice(index, 1, suggestion[0]);
  });
  return words.join(' ');
};

const checkText = async (text) => {
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

export default async (text) => replaceWords(text, await checkText(text));
