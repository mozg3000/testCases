import BinarNode from './binarynode';
import List from './list.js';
export default class BinarTree extends List{
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