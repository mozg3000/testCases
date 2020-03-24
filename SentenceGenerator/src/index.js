import SentenceGenerator from './js/SentenceGenerator.js';

let templateString = '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это {удивительное|крутое|простое|важное|бесполезное} тестовое предложение {изменялось {быстро|мгновенно|оперативно|правильно} случайным образом|менялось каждый раз}.';
// let testString = '{изменялось {быстро|мгновенно} случайным образом|менялось каждый раз}.'
// let testString = 'изменялось {быстро|мгновенно} случайным образом.'
// let testString = '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это  тестовое предложение.'

// let generator = new SentenceGenerator();

// generator.extractData(testString);
// console.log(generator.buildTreeWithBrackets(testString));
// generator.generateSentences();
// console.log(generator);
// generator.remove('Пожалуйста,');
// generator.remove('Просто,');
// console.log(generator);
// console.log(generator.extract());
let res = SentenceGenerator.generate(templateString);
for(let el of res){
	console.log(el);
}
// console.log(generator.generate(generator.stack, []));
// console.log((generator.stack));
// console.log(generator.generate());
// console.log(generator.hasNotNullOr());