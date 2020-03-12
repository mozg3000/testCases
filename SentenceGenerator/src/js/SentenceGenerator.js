import BinaryTree from './binarytree.js';
import List from './list.js';

export default class SentenceGenerator extends BinaryTree{
	
	constructor(){
		super();
		this.lastAlternative = '';
		this.sentence = '';
		this.resultSet = new List();
		// Node = class extends Node{
			// constructor(value){
				// super(value);
				// this.prev = null;
			// }
			
		// } 
	}
	// Looking for the value in collection and return true if it was found or false else.
	includes(value, comparator){
		let res = {isitin: false};
		this.find(value, this.head, res);

		return res.isitin;
	}
	// Using for recursive searching
	find(value, head, res){
		if(head){
			if(head.value === value){
				res.isitin = true;
				return;
			}else{
				this.find(value, head.prev, res);
				this.find(value, head.next, res);
			}
		}
		return;		
	}
	remove(value){
		if(this.head){
			if(this.head.value === value){
				this.head = null;
			}else{
				if(this.head.prev){
					if(this.head.prev.value === value){
						this.head.prev = null;
					}else{
						this.removeRecursive(value, this.head.prev.prev, this.head, 'prev');
						this.removeRecursive(value, this.head.prev.next, this.head, 'next');
					}
				}
				if(this.head.next){
					if(this.head.next.value === value){
						this.head.next = null;
					}else{
						this.removeRecursive(value, this.head.next.prev, this.head, 'prev');
						this.removeRecursive(value, this.head.next.next, this.head, 'next');
					}
				}
			}
		}
		
	}
	removeRecursive(value, head, prevPrevNode, direction){
		if(head){
			if(head.value === value){
				if(prevPrevNode){
					switch (direction){
						case 'prev': {
							if(prevPrevNode.prev.next.value === null && prevPrevNode.prev.prev === null){
								prevPrevNode.prev = null;
							}else{
								head.value = null;
							}
							break;
						}
						case 'next': {
							if(prevPrevNode.next.next.value === null && prevPrevNode.next.prev === null){
								prevPrevNode.next = null;
							}else{
								head.value = null;
							}
						}
					}
				}
			}else{
				this.removeRecursive(value, head.prev, prevPrevNode.prev, 'prev');
				this.removeRecursive(value, head.next, prevPrevNode.next, 'next');
			}
		}
		return;
	}
	buildTree(expression){
		this.head = this.buildTreeWithBrackets(expression);
	}
	buildTreeWithBrackets(expression){
		let brackets = this.findBrackets(expression),
			vLines = this.findVlineOutsideBrackets(expression),
			node;
		if(vLines.length){
			let text = expression.substring(0, vLines[0]);
			node = new Node('OR');
			node.prev = this.buildTreeWithBrackets(expression.substring(0, vLines[0]));
			node.next= this.buildTreeWithBrackets(expression.substring(vLines[0] + 1));
			
		}else{
			// let brackets = this.findBrackets(expression);
			if(brackets.length >= 1){
			let text = '';
			if(brackets[0][0] !== 0){
				text = expression.substring(0, brackets[0][0]);
				node = new Node('AND');
				node.prev = new Node(text);
				node.next = this.buildTreeWithBrackets(expression.substring(brackets[0][0]));
			}else{
				node = new Node('AND');
				node.prev = this.buildTreeWithBrackets(expression.substring( brackets[0][0] + 1, brackets[0][1]));
				node.next = this.buildTreeWithBrackets(expression.substring( brackets[0][1] + 1));
			}
			}else{
				node = new Node(expression);
			}
		}
		
		return node;
	}
	findVlineOutsideBrackets(expression){
		let vLines = [];
		let openBracketsIndexes = [];
		let closeBracketsIndexes = [];
		let level = 0;
		for(let i = 0; i < expression.length; i++){
			if (expression[i] === '{') {
				if(!level){
					openBracketsIndexes.push(i);
				}
				level++;
			}else if (expression[i] === '}'){
				level--;
				if(!level){
					closeBracketsIndexes.push(i);
				}
			}
			if(!level && expression[i] === '|'){
				vLines.push(i);
			}
		}
		
		return vLines;
	}
	findBrackets(expression){
		let openBracketsIndexes = [];
		let closeBracketsIndexes = [];
		let level = 0;
		for(let i = 0; i < expression.length; i++){
			if (expression[i] === '{') {
				if(!level){
					openBracketsIndexes.push(i);
				}
				level++;
			}else if (expression[i] === '}'){
				level--;
				if(!level){
					closeBracketsIndexes.push(i);
				}
			}
		}
		let brackets = [];
		for(let i = 0; i < openBracketsIndexes.length; i++){
			brackets.push([openBracketsIndexes[i], closeBracketsIndexes[i]]);
		}
		return brackets;
	}
	generateSentences(){
		while(this.includes('OR')){
			
			this.generateSentence(this.head, null);
			this.resultSet.push(this.sentence);
			this.delete(this.lastAlternative);
			this.sentence = '';
			this.lastAlternative = '';
		}
	}
	generateSentence(head, prevValue){
		if(head.value === 'AND' || head.value === 'OR'){
			this.generateSentence(head.prev, head.value);
			this.generateSentence(head.next, head.value);
		}else{
			if(prevValue === 'OR'){
				if(!this.lastAlternative){
					this.sentence += head.value;
					this.lastAlternative = head.value;
				}
			}else if (prevValue === 'AND'){
				this.sentence += head.value;
			}
		}
		return;
	}
}
