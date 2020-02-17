class Calculator {
	constructor(){
		
	}
	calculate(exp){
		this.parse(exp);
	}
	parse(exp){
		
	}
}
class Node {
	constructor(value){
		this.value = value;
		this.next = null;
	}
}
class BinaryNode extends Node{
	constructor(value){
		super(value);
		this.prev = null;
	}
	
}
class List {
	constructor(){
		this.head = null;
	}
	addNode(value){
		if(!this.head){
			this.addHead(value);
		}else{
			this.addElement(value);
		}
	}
	addHead(value){
		this.head = new Node(value);
	}
	addElement(value){
		let last = this.getLastNode();
		last.next = new Node(value);
	}
	addSubList(list){
		if(this.head){
			let pointer = this.getLastNode();
		pointer.next = list.head;
		}else{
			this.head = list.head;
		}
	}
	getLastNode(){
		let pointer = this.head;
		while(pointer.next){
			pointer = pointer.next
		}
		return pointer;
	}
	deleteNode(value){
		
		if(this.head.value === value){
			this.head = this.head.next;
		}else{
			let pointer = this.head.next;
			let prevnode = this.head;
			
			while(pointer){
				if(pointer.value === value){
					prevnode.next = pointer.next;
					break;
				}else{
					prevnode = pointer;
					pointer = pointer.next;
				}
			}
		}
	}
	print(){
		if(this.head){
			let pointer = this.head;
			while(pointer.next){
				console.log(pointer.value);
				pointer = pointer.next;
			}
		console.log(pointer.value);
		} else {
			console.log('Empty List');
		}
	}
}
class BinarTree extends List{
	constructor(){
		super();
	}
	addHead(value){
		this.head = new BinarNode(value);
	}
	addElement(value){
		let direction = '';
		let pointer = null;
		if(this.head.value > value){
			pointer = this.head.prev;
			direction = 'prev';
		}else if (this.head.value < value){
			pointer = this.head.next;
			direction = 'next';			
		}
		let prevNode = this.head;
		
		while(pointer){
			prevNode = pointer;
			if(pointer.value > value){
				pointer = pointer.prev;
				direction = 'prev';
			}else if (pointer.value < value){
				pointer = pointer.next
				direction = 'next';
			}
		}
		switch(direction){
			case 'prev': {
				prevNode.prev = new BinarNode(value);
				break;
			}
			case 'next': {
				prevNode.next = new BinarNode(value);
				break;
			}
		}
	}
	getLeftBranch(head){
		let branch = new List();
		branch.addNode(head.value);
		let pointer = head;
		while(pointer.prev){
			pointer = pointer.prev;
			branch.addNode(pointer.value);
		}
		return branch;
	}
	getSortedNode(node){
		let list = new List();
		if(node.prev){
			let sublist = this.getSortedNode(node.prev);
			list.addSubList(sublist);
		}
		list.addNode(node.value);
		// console.log(node);
		if(node.next){
			let sublist = this.getSortedNode(node.next);
			list.addSubList(sublist);
		}
		return list;
	}
	treeToList(){
		let list = new List();
		list.addSubList(this.getSortedNode(this.head));
		return list;
	}
	printList(){
		
		this.treeToList().print();
		
	}
}
class ExpressionTree{
	constructor(priorities){
		this.childs = [];
		this.priorities = priorities;
	}
	
	getPriority(symbol){
		let priority = this.priorities[symbol];
		if(!priority){
			priority = 100;
		}
		return priority;
	}
	buildTree(expression){
		let rootNode = null;
		if(expression.length > 1){
			let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expression);
			let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
			let root = expression[rootIndex];
			rootNode = new BinaryNode(root);
			let rightExpressionPart = expression.substring(rootIndex + 1);
			let leftExpressionPart = expression.substring(0, rootIndex);
			rootNode.prev = this.buildTree(leftExpressionPart);
			rootNode.next = this.buildTree(rightExpressionPart);
		}else{
			rootNode = new BinaryNode(expression[0]);
		}
		
		
		return rootNode;
	}
	findBrackets(expression){
		let openBracketsIndexes = [];
		let closeBracketsIndexes = [];
		let stack = [];
		for(let i = 0; i < expression.length - 1; i++){
			if (expression[i] === '(') {
				if(!stack.length){
					openBracketsIndexes.push(i);
				}
				stack.push(i);
			}else if (expression[i] === ')'){
				stack.pop();
				if(!stack.length){
					closeBracketsIndexes.push(i);
				}
			}
		}
		return {
			openBracketsIndexes,
			closeBracketsIndexes
		}
	}
	findIndexesOfMaxPriorities(expression){
		let indexes = [],
			max = 0,
			priority = 0;
		for(let i = 0; i < expression.length -1; i++){
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
priorities = {
	'(': 10,
	')': 5,
	'*': 80,
	'/': 80,
	'+': 90,
	'-': 90
};



let tree = new ExpressionTree(priorities);
console.log(tree.findBrackets('(5*3)+(6/7)*4-2'));
// console.log(tree.buildTree('5*3+6/7'));
// list = new List();
// list2 = new List();
// list2.addNode(1);
// list.addNode(2);
// list.addNode(3);
// list.addNode(4);
// list.print();
// console.log('------------------');
// list.deleteNode(1);
// list2.addSubList(list);
// list2.print();

// let tree = new BinarTree();

// tree.addNode(50);
// tree.addNode(60);
// tree.addNode(40);
// tree.addNode(45);
// tree.addNode(55);
// tree.addNode(30);
// tree.printList();