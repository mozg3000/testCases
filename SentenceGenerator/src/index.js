import SentenceGenerator from './js/SentenceGenerator.js';

// let testString = '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это {удивительное|крутое|простое|важное|бесполезное} тестовое предложение {изменялось {быстро|мгновенно|оперативно|правильно} случайным образом|менялось каждый раз}.';
let testString = '{Пожалуйста,|Просто} сделайте так,';

let generator = new SentenceGenerator();

generator.buildTree(testString);
// generator.generateSentences();
console.log(generator);
generator.remove('Пожалуйста,');
generator.remove('Просто,');
console.log(generator);
console.log(generator.includes('OR'));