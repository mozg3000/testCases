export default class Stack {
	constructor(value) {
		Node = class {
			constructor(invalue){
				this.value = invalue;
				this.next = null;
			}
		}
		this.head = value ? new Node(value) : null;
	}
	// Takes off last node and returns value
	pop() {
		let value = null;
		if(this.head){
			if(this.head.next){
				let prev = this.getLastButOneNode(),
					value = prev.next.value;
			}else{
				value = this.head.value;
				this.head = null;
			}
		}
		return value;
	}
	// Adds Node to collection
	push(value){
		if(!this.head){
			this.head = new Node(value);
		}else{
			this.append(value);
		}
		return 1;
	}
	append(value){
		this.findNodeToPush().next = new Node(value);
	}
	// Method to be use in inheritors clases to push nodes to the end
	findNodeToPush(value){
		return this.getLastNode();
	}
	// Returns last Node of the collection
	getLastNode(){
		let pointer = this.head;
		for(; pointer.next; pointer = pointer.next){
			continue;
		}
		return pointer;
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
	// Find out length of the collection
	length(){
		let count = 0;
		if(this.head){
			count++;
			for(let pointer = this.head; pointer.next; pointer = pointer.next){
				count++;
			}
		}
		return count;
	}
	// Prints collection to the console.log
	print(){
		if(this.head){
			let pointer = this.head;
			while(pointer.next){
				console.log(pointer.value);
				pointer = pointer.next;
			}
			console.log(pointer.value);
		} else {
			console.log('Empty Collection');
		}
	}
}