"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const yandex_speller_1 = require("yandex-speller");
const fixTypos = (text, checkResult) => {
    const isCapitalized = (str) => str === _.capitalize(str);
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
