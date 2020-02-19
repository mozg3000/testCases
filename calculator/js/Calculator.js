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
		this.head = this.buildTreeWithBrackets(expression);
	}
	isIndexInBrackets(index, brackets){
		
	}
	buildTreeWithBrackets(expression){
		// находим все скобки верхнего уровня вложенности
		let brackets = this.findBrackets(expression),
			rightExpressionPart,
			leftExpressionPart,
			rootNode,
			leftNode,
			rightNode;
		// если на верхнем уровне скобок больше 1	
		if(brackets.length > 1){
			let maxPriority = 0;
			let maxPriorityIndexes = [];
			for(let i = 0; i < expression.length; i++){
				for(let bracketPair of brackets){
					if(bracketPair[0] <= i && i <= bracketPair[1]){
						continue;
					}else{
						let newPriority = this.getPriority(expression[i]);
						if(maxPriority <= newPriority && newPriority !== 100){
							maxPriority = newPriority;
							maxPriorityIndexes.push(i);
						}
						break;
					}
				}
			}
			return maxPriorityIndexes
			let expressionBetweenFirstTwoBrackets = expression.substring(brackets[0][1] + 1, brackets[1][0]);
			// let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expressionBetweenFirstTwoBrackets);
			let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
			let root = expressionBetweenFirstTwoBrackets[rootIndex];
			let expressionBeforeRoot = expression.substring(0, brackets[0][1] + 1);
			let expressionAfterRoot = expression.substring(brackets[1][0]);
			
			rootNode = this.buildTreeWithBrackets(expressionBetweenFirstTwoBrackets);
			rootNode.next = this.buildTreeWithBrackets(expressionAfterRoot);
			rootNode.prev = this.buildTreeWithBrackets(expressionBeforeRoot);
			
			
		}else if(brackets.length === 1){
			let expressionBeforeBrackets = expression.substring(0, brackets[0][0]);
			let expressionAfterBrackets = expression.substring(brackets[0][1] + 1);
			//если слева и справа от скобки ничего не
			if(expressionBeforeBrackets === '' && expressionAfterBrackets === ''){
				expression = expression.substring(brackets[0][0] + 1, brackets[0][1])
				let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expression);
				let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
				let root = expression[rootIndex];
				let expressionAfterRoot = expression.substring(rootIndex + 1);
				let expressionBeforeRoot = expression.substring(0, rootIndex);
				rootNode = new BinaryNode(root);
				rootNode.next = this.buildTreeWithBrackets(expressionAfterRoot);
				rootNode.prev = this.buildTreeWithBrackets(expressionBeforeRoot);
			}else if(expressionBeforeBrackets === ''){//если только слева от скобок ничего нет
			
				let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expressionAfterBrackets);
				let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
				rootIndex = rootIndex + brackets[0][1] + 1 - brackets[0][0];
				let root = expression[rootIndex];
				rootNode = new BinaryNode(root);
				let expressionAfterRoot = expression.substring(rootIndex + 1);
				let expressionBeforeRoot = expression.substring(0, rootIndex);
				// return expressionAfterRoot
				rootNode.next = this.buildTreeWithBrackets(expressionAfterRoot);
				rootNode.prev = this.buildTreeWithBrackets(expressionBeforeRoot);
			}else if(expressionAfterBrackets === ''){//если только справа от скобок ничего нет
			
				let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expressionBeforeBrackets);
				let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
				let root = expression[rootIndex];
				rootNode = new BinaryNode(root);
				let expressionAfterRoot = expression.substring(rootIndex + 1);
				let expressionBeforeRoot = expression.substring(0, rootIndex);
				// return expressionBeforeRoot
				rootNode.next = this.buildTreeWithBrackets(expressionAfterRoot);
				rootNode.prev = this.buildTreeWithBrackets(expressionBeforeRoot);
				
			}else {//и слева и справа от скобок что-то есть
				let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expressionBeforeBrackets+expressionAfterBrackets);
				let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
				if(rootIndex > brackets[0][0]-1){
					rootIndex = rootIndex + brackets[0][1] + 1 - brackets[0][0];
				}
				let root = expression[rootIndex];
				rootNode = new BinaryNode(root);
				let expressionAfterRoot = expression.substring(rootIndex + 1);
				let expressionBeforeRoot = expression.substring(0, rootIndex);
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
			let rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
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
// tree.buildTree('5-(3+6)/7*(4-2)')
// console.log(tree);
console.log(tree.buildTreeWithBrackets('5-(3+6)/7*(4-2)'))
// console.log(tree.buildTreeWithBrackets('5-(3+6)/7'))//*(4-2)'));
// console.log(tree.buildTreeWithBrackets('(3+6)/7'))//*(4-2)'));
// console.log(tree.findBrackets('(5*3)+(6/7)*4-2'));
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