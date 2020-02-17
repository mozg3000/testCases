import Node from './mnode.js';

export default class List {
	constructor(nodeFabric){
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