import BinaryTree from './binarytree.js';
import BinaryNode from /./binarynode.js';

export default class ExpressionTree extends BinaryTree{
	constructor(expression, priorities){
		super();
		this.priorities = priorities;
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
			this.addElement();
		}
	}
	addHead(symbol){
		this.head = new BinaryNode(symbol);
	}
	addElement(symbol){
		let newPriority = this.getPriority(symbol);
		let oldPriority = this.getPriority(this
		if (newPriority < oldPriority) {
			
		}
	}
	getPriority(symbol){
		let priority;
		if(!priority = this.priorities[symbol]){
			priority = 100;
		}
		return priority;
	}
}
// priorities = {
	// '(': 90,
	// ')': 90,
	// '*': 80,
	// '/': 70,
	// '+': 50,
	// '-': 50
// };