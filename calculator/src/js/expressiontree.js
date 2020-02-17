import BinaryTree from './binarytree.js';
import BinaryNode from './binarynode.js';

export default class ExpressionTree extends BinaryTree{
	constructor(priorities){
		super();
		this.priorities = priorities;
		this.symbols = [];
		this.stack = [];
		// this.parents = [];
		// this.pointer = this.head;
		// this.currentHead
		// this.expression = expression.split('');
	}
	addNode(symbol){
		if(!this.head){
			this.addHead(symbol);
		}else{
			this.addElement(symbol);
		}
	}
	addHead(symbol){
		this.head = new BinaryNode(symbol);
		// this.pointer = this.head;
	}
	addElement(symbol){
		let newPriority = this.getPriority(symbol);
		// let oldPriority = this.getPriority(this.head.value);
		let newNode= new BinaryNode(symbol);
		let pointer = this.getLast();
		let oldPriority = this.getPriority(pointer.value);
		// console.log('--------------------');
		// console.log(pointer);
		// console.log('======================');
		if (newPriority <= oldPriority && newPriority !== 100) {
			if(pointer.next){
				newNode.prev = pointer.next;
				pointer.next = newNode;	
			}else{
				newNode.prev = this.head;
				this.head = newNode;
			}
			// this.parents.push(pointer);
			this.stack.push(newNode);
		}else{
			if(newPriority !== 100){
				// console.log('+++++++++++++++')
				// console.log(this.stack[0])
				// console.log('\\\\\\\\\\\\\\\\\\\\\\')
				newNode.prev = this.stack[0];
				this.head = newNode;
				this.stack = [];
				this.stack.push(this.head);
			}else{
				if(pointer.next){
					pointer.next.next = newNode;
				}else{
					this.head.next = newNode;
				}
			}
		}
	}
	getLast(){
		let pointer = this.head;
		let prev = this.head;
		while(pointer.next){
			if(this.getPriority(pointer.next.value) === 100){
				break;
			}
			prev = pointer;
			pointer = pointer.next;
		}
		// console.log(prev)
		return prev;
	}
	getPriority(symbol){
		let priority = this.priorities[symbol];
		if(!priority){
			priority = 100;
		}
		return priority;
	}
	buildTree(expression){
		this.head = this.buildSubTree(expression);
	}
	buildSubTree(expression){
		let rootNode = null;
		if(expression.length > 1){
			let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expression);
			let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
			let rootValue = expression[rootIndex];
			let rightExpressionPart = expression.substring(rootIndex + 1);
			let leftExpressionPart = expression.substring(0, rootIndex);
			rootNode = new BinaryNode(rootValue);
			rootNode.prev = this.buildSubTree(leftExpressionPart);
			rootNode.next = this.buildSubTree(rightExpressionPart);
		}else{
			rootNode = new BinaryNode(expression[0]);
		}
		return rootNode;
	}
	findBrackets(expression){
		let openBracketsIndexes = [];
		let closeBracketsIndexes = [];
		let level = 0;
		for(let i = 0; i < expression.length; i++){
			if (expression[i] === '(') {
				if(!level){
					openBracketsIndexes.push(i);
				}
				// stack.push(i);
				level++;
			}else if (expression[i] === ')'){
				// stack.pop();
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
	findIndexesOfMaxPriorities(expression){
		let indexes = [],
			max = 0,
			priority = 0;
		for(let i = 0; i < expression.length; i++){
			priority = this.getPriority(expression[i]);
			// console.log('----------')
			// console.log(priority)
			// console.log('==========')
			if(priority !== 100){
				if(priority > max){
					indexes = [];
					max = priority;
					indexes.push(i);
				}else if(priority < max){
					continue;
				}else{
					indexes.push(i);
				}
			}
		}
		
		return indexes;
	}
}