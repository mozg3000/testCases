import Vue from 'vue';

import SentenceGenerator from './js/SentenceGenerator.js';
import './css/styles.css';

const app = new Vue({
	el: '#calc',
	data: {
		templateString: '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это {удивительное|крутое|простое|важное|бесполезное} тестовое предложение {изменялось {быстро|мгновенно|оперативно|правильно} случайным образом|менялось каждый раз}.',
		res: []
	},
	methods: {
		generate(){
			this.res = SentenceGenerator.generate(this.templateString);
		},
		clearList(){
			this.res = [];
		}
	},
	template: `
		<div class="content">
			<form name="main">
				<textarea 
					name="input"
					v-model="templateString"
					>
					</textarea>
				<input 
					type="submit"
					@click.prevent="generate"
					value="Сгенерировать"
					name="generate"
					/>
				<input 
					type="button"
					@click="clearList"
					value="Очистить" 
					name="clear"
					/>
			</form>
			
			<ul>
				<li v-for="(sentence , i) in res" :key="i">
					{{sentence}}
				</li>
			</ul>
		</div>
	`
});

//let templateString = '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это {удивительное|крутое|простое|важное|бесполезное} тестовое предложение {изменялось {быстро|мгновенно|оперативно|правильно} случайным образом|менялось каждый раз}.';
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
// let res = SentenceGenerator.generate(templateString);
// for(let el of res.sort()){
	// console.log(el);
// }
// console.log(generator.generate(generator.stack, []));
// console.log((generator.stack));
// console.log(generator.generate());
// console.log(generator.hasNotNullOr());