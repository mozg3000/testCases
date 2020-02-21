import Stack from './stack.js';

export default class Queue extends Stack{
	constructor(value){
		super(value);
	}
	//
	push(value){
		let head = this.head;
		if(head){
			let newNode = new Node(value);
			newNode.next = this.head;
			this.head = newNode;
		}else{
			this.head = new Node(value);
		}
			return 1;
	}
}