import BinaryTree from './binarytree.js';
import BinaryNode from './binarynode.js';

export default class ExpressionTree extends BinaryTree{
	constructor(priorities){
		super();
		this.priorities = priorities;
		this.flag = false;
		// this.pointer = this.head;
		// this.currentHead
		// this.expression = expression.split('');
	}
	buildTree(expressionArray){
		// let symbol = '';
		// while (symbol = expressionArray.shift()){
			// let priority = this.getPriority(symbol);
			// this.addNode(symbol);
		// }
		let tree = this.buildSubTree(expressionArray, this.head);
		
		return tree;
	}
	buildSubTree(expressionArray, node){
		let tree = new BinaryTree();
		
		tree.addSubTree();
		
		return tree;
	}
	addSubTree(subTree){
		if(!this.head){
			this.head = subTree.head;
		}else{
			
		}
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
		let oldPriority = this.getPriority(this.head.value);
		let newNode= new BinaryNode(symbol);
		// console.log(newNode);
		// console.log(newPriority);
		// console.log(newPriority);
		if (newPriority <= oldPriority && newPriority !== 100) {
			// console.log('smaller')
			let pointer = this.getLast();
			console.log(pointer)
			if(pointer.next){
				newNode.prev = pointer.next;
				pointer.next = newNode;	
			}else{
				newNode.prev = this.head;
				this.head = newNode;
			}
			
		}else{
			let pointer = this.getLast();
			if(pointer.next){
				pointer.next.next = newNode;
			}else{
				this.head.next = newNode;
				// this.flag = true;
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
}