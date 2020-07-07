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
	isIndexInBrackets(index, brackets){
		for(let bracketsPair of brackets){
			if(bracketsPair[0] <= index && index <= bracketsPair[1]){
				return true;
			}
		}
		return false;
	}
	buildTree(expression){
		this.head = this.buildTreeWithBrackets(expression);
	}
	buildTreeWithBrackets(expression){
		let brackets = this.findBrackets(expression),
			rightExpressionPart,
			leftExpressionPart,
			rootNode;
		if(brackets.length >= 1){
			let maxPriority = -1;
			let maxPriorityIndexes = [];
			for(let i = 0; i < expression.length; i++){
				if(!this.isIndexInBrackets(i, brackets)){
					let newPriority = this.getPriority(expression[i]);
						if(maxPriority <= newPriority && newPriority !== 100){
							maxPriority = newPriority;
							maxPriorityIndexes.push(i);
						}
				}else{
					continue;
				}
			}
			if(maxPriority === -1){
				expression = expression.substring(1, expression.length - 1);
				rootNode = this.buildTreeWithBrackets(expression);
			}else{
				let rootIndex = null;
				if(expression[maxPriorityIndexes[0]] === '/'){
					rootIndex = maxPriorityIndexes[0];
				}else{
					rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
				}
				let root = expression[rootIndex];
				let expressionBeforeRoot = expression.substring(0, rootIndex);
				let expressionAfterRoot = expression.substring(rootIndex +1);
				rootNode = new BinaryNode(root);
				rootNode.next = this.buildTreeWithBrackets(expressionAfterRoot);
				rootNode.prev = this.buildTreeWithBrackets(expressionBeforeRoot);
			}
		}else{
			rootNode = this.buildSubTree(expression);
		}
		return rootNode;
	}
	buildSubTree(expression){
		let rootNode = null;
		if(expression.length > 1){
			let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expression);
			let rootIndex = null;
			if(expression[maxPriorityIndexes[0]] === '/'){
				rootIndex = maxPriorityIndexes[0];
			}else{
				rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
			}
			let root = expression[rootIndex];
			rootNode = new BinaryNode(root);
			let rightExpressionPart = expression.substring(rootIndex + 1);
			let leftExpressionPart = expression.substring(0, rootIndex);
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
					// break;
				}
			}
		}
		let brackets = [];
		for(let i = 0; i < openBracketsIndexes.length; i++){
			brackets.push([openBracketsIndexes[i], closeBracketsIndexes[i]]);
		}
		// if(openBracketsIndexes.length){
			return brackets;//[openBracketsIndexes[0], closeBracketsIndexes[0]]
		// }else {
			// return [];
		// }
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
	treeToExpression(){
		return this.NodeToString(this.head);
	}
	NodeToString(node){
		let expression = [];
		expression.push(node.value);
		if(node.prev){
			expression.unshift(this.NodeToString(node.prev));
		}
		if(node.next){
			expression.push(this.NodeToString(node.next));
		}
		return expression.join('');
	}
	calculate(){
		
	}
	
}