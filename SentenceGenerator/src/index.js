import Vue from 'vue';

import {TemplateSentenceTree} from '@mozg3000/Datastructures';
import './css/styles.css';

const app = new Vue({
	el: '#calc',
	data: {
		templateString: '{Пожалуйста,|Просто|Если сможете,} сделайте так, чтобы это {удивительное|крутое|простое|важное|бесполезное} тестовое предложение {изменялось {быстро|мгновенно|оперативно|правильно} случайным образом|менялось каждый раз}.',
		res: [],
		filtered: [],
		filterString: ''
	},
	methods: {
		generate(){
			this.res = TemplateSentenceTree.generate(this.templateString);
			this.processFilter();
		},
		filterHandler(){
			this.processFilter();
		},
		clearList(){
			this.res = this.filtered = [];
		},
		processFilter(){
			if(this.filterString.length > 2){
				this.filtered = this.res.filter(s => s.includes(this.filterString));
			}else{
				this.filtered = this.res;
			}
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
			<form name="search">
				<input 
					type="text" 
					placeholder="фильтр"
					name="filter"
					v-model="filterString"
					v-on:input.prevent="filterHandler"
					v-on:change.prevent="filterHandler"
					/>
			</form>
			<ul>
				<li v-for="(sentence , i) in filtered" :key="i">
					{{sentence}}
				</li>
			</ul>
		</div>
	`
});