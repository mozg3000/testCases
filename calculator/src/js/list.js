import Node from './mnode.js';

export default class List {
	constructor(value = null){
		if(value){
			this.head = new Node(value);
		}else{
			this.head = null;
		}
	}
	// Adds new leaf to list
	addNode(value){
		if(!this.head){
			this.addHead(value);
		}else{
			this.addElement(value);
		}
	}
	// Adds node to the head
	addHead(value){
		this.head = new Node(value);
	}
	// Adds node to the tail of the list
	addElement(value){
		let last = this.getLastNode();
		last.next = new Node(value);
	}
	// Adds list to the end of another list
	addSubList(list){
		if(this.head){
			let pointer = this.getLastNode();
		pointer.next = list.head;
		}else{
			this.head = list.head;
		}
	}
	// Returns last Node of the list
	getLastNode(){
		let pointer = this.head;
		while(pointer.next){
			pointer = pointer.next
		}
		return pointer;
	}
	// Deletes Node containing value from list 
	deleteNode(value){
		
		if(this.head.value === value){
			this.head = this.head.next;
		}else{
			let prev = this.getOneNodeBefore(value);
			prev.next = prev.next.next;
		}
	}
	// Returns node before but one the value
	getOneNodeBefore (value) {
		let pointer = this.head,
			prev = this.head;
		if (value) {
			for(;pointer.next; prev = pointer, pointer = pointer.next) {
				if(pointer.value === value) {
					break;
				}
			}
		}else{
			prev = getLastButOneNode();
		}
		return prev;
	}
	// Returns last but one Node
	getLastButOneNode() {
		let pointer = this.head,
			prev = this.head;
		for(;pointer.next; prev = pointer, pointer = pointer.next) {
			continue;
		}
		return prev;
	}
	// Insert Node in the certain position
	insert (value, index) {
		if(index === 0) {
			let newNode = new Node(value);
			newNode.next = this.head;
			this.head = newNode;
			
			return 1;
		}
		let pointer = this.head,
			prev = this.head,
			i = 0;
		for (i = 0; i !== index && pointer; prev = pointer, pointer = pointer.next, i++) {
			continue;
		}
		if (!i > index) {
			prev.next = new Node(value);
			prev.next.next = pointer;
		}else{
			return 0;
		}
		return 1;
	}
	// Adds Node to the head of the list
	unshift (value) {
		let newHead = new Node(value);
		newHead.next = this.head;
		this.head = newHead;
		return 1;
	}
	// Takes off the first node and returns its value
	shift () {
		let value = this.head.value;
		this.head = this.head.next;
		
		return value;
	}
	// Adds to the end of list
	push (value) {
		this.addNode(value);
		return 1;
	}
	// Takes off last node and returns value from the list
	pop() {
		let prev = this.getLastButOneNode(),
			value  = prev.next.value;
		prev.next = null;
		
		return value;
	}
	// Prints list in the console.log
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
	// Iterator
	[Symbol.iterator](){
		let current = { next: this.head };
		const iterator = {
			next(){
				if(current.next){
					current = current.next;
					return {
							  done: false,
							  value: current.value
							}
				}else{
					return {
						done: true
					}
				}  
			}
		}
      return iterator; 
    }
}