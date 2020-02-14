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
class BinarNode extends Node{
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
			//this.head = new Node(value);
			this.addHead(value);
		}else{
			// let last = this.getLastNode();
			// console.log(last);
			// last.next = new Node(value);
			this.addElement(value);
		}
	}
	addHead(value){
		this.head = new Node(value);
	}
	addElement(value){
		let last = this.getLastNode();
		// console.log(last);
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
		let flag = true;
		let direction = '';
		let pointer = null;
		if(this.head.value > value){
			pointer = this.head.prev;
			direction = 'prev';
		}else if (this.head.value < value){
			pointer = this.head.next;
			direction = 'next';			
		}
		// console.log(pointer);
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
		// console.log(pointer);
		switch(direction){
			case 'prev': {
				flag = false;
				prevNode.prev = new BinarNode(value);
				break;
			}
			case 'next': {
				flag = false;
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
	addLeaf(leaf){
		
	}
}
priorities = {
	'(': 90,
	')': 90,
	'*': 80,
	'/': 70,
	'+': 50,
	'-': 50
};
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

let tree = new BinarTree();

tree.addNode(50);
tree.addNode(60);
tree.addNode(40);
tree.addNode(45);
tree.addNode(55);
tree.addNode(30);
tree.printList();