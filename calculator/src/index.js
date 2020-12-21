import Vue from 'vue';

import {ExpressionTree, priorities} from '@mozg3000/Datastructures';
import './css/styles.css';
const app = new Vue({
	el: '#calc',
	data: {
		expression: '5-(3+x)/4-2)+9',
		from: 0,
		to: 10,
		step: 1,
		res: [],
		filtered: [],
		filterString: ''
	},
	methods: {
		calculate(){
			console.log(this.expression);
			const tree = new ExpressionTree(priorities);
			tree.buildTree(this.expression)
			console.log(tree);
			// console.log({start: Number(this.from), end: Number(this.to), step: Number(this.step)});
			this.res = tree.calculate({start: Number(this.from), end: Number(this.to), step: Number(this.step)});
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
				<input type="number" name="from" v-model="from"/>
				<label for="from">от</label>
				<input type="number" name="to" v-model="to"/>
				<label for="to">до</label>
				<input type="number" name="step" v-model="step">
				<label for="step">шаг</label>
				<textarea 
					name="input"
					v-model="expression"
					>
					</textarea>
				<input 
					type="submit"
					@click.prevent="calculate"
					value="Построить"
					name="generate"
					/>
				<input 
					type="button"
					@click="clearList"
					value="Очистить" 
					name="clear"
					/>
			</form>
			<p>
				{{this.res}}
			</p>
		</div>
	`
});