import SentenceGenerator from './js/SentenceGenerator.js';

let testString = '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это {удивительное|крутое|простое|важное|бесполезное} тестовое предложение {изменялось {быстро|мгновенно|оперативно|правильно} случайным образом|менялось каждый раз}.';
// let testString = '{изменялось {быстро|мгновенно} случайным образом|менялось каждый раз}.'
// let testString = 'изменялось {быстро|мгновенно} случайным образом.'
// let testString = '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это  тестовое предложение.'

let generator = new SentenceGenerator();

generator.buildTree(testString);
// console.log(generator.buildTreeWithBrackets(testString));
// generator.generateSentences();
// console.log(generator);
// generator.remove('Пожалуйста,');
// generator.remove('Просто,');
console.log(generator);
// console.log(generator.extract());
// console.log(generator.generate());
// console.log(generator.hasNotNullOr());