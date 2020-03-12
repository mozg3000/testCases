import Stack from './stack.js';

export default class List extends Stack{
	constructor(value){
		super(value);
	}
	// Looking for the value in collection and return true if it was fount or false else.
	includes(value, comparator = (a, b) => a===b){
		
		for(let pointer = this.head; pointer; pointer = pointer.next){
			if(comparator(pointer.value, value)){
				return true;
			}
		}

		return false;
	}
	// Concatinate two (sub)list
	concat(list){
		if(this.head){
			let pointer = this.getLastNode();
		pointer.next = list.head;
		}else{
			this.head = list.head;
		}
	}
	// Deletes Node containing value from list 
	remove(value, comparator = (a, b) => a===b){
		if(comparator(this.head.value, value)){
			this.head = this.head.next;
			return 1;
		}else{
			let prev = this.getOneNodeBefore(value, comparator);
			if(prev){
				prev.next = prev.next.next;
				return 1;
			}else{
				return 0;
			}
		}
	}
	// Returns node before but one the value
	getOneNodeBefore (value, comparator) {
		let pointer = this.head,
			prev = this.head,
			found = false;
		if (value) {
			for(;pointer.next; prev = pointer, pointer = pointer.next) {
				if(comparator(pointer.value, value)) {
					found = true;
					break;
				}
			}
		}else{
			prev = getLastButOneNode();
		}
		if(comparator(pointer.value, value)){
			found = true;
		}
		return found ? prev : null;
	}
	// Insert Node in the certain position or to the end if index greate of the collection length
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
		prev.next = new Node(value);
		prev.next.next = pointer;
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
	// Prints list in the console.log
	// print(){
		// if(this.head){
			// let pointer = this.head;
			// while(pointer.next){
				// console.log(pointer.value);
				// pointer = pointer.next;
			// }
			// console.log(pointer.value);
		// } else {
			// console.log('Empty List');
		// }
	// }
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