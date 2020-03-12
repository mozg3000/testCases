// import Node from './Node';
import List from './list.js';
// BinaryTree with only unique values
export default class BinaryTree extends List{
	constructor(value = null) {
		super(value);
		Node = class extends Node{
			constructor(value){
				super(value);
				this.prev = null;
			}
			
		} 
		if(value){
			this.head = new Node(value);
		}else{
			this.head = null;
		}
	}
	// Looking for the value in collection and return true if it was found or false else.
	includes(value, comparator){
		let res = {isitin: false};
		this.find(value, this.head, res);

		return res.isitin;
	}
	// Using for recursive searching
	find(value, head, res){
		if(head){
			if(head.value > value){
			this.find(value, head.prev, res);
			}
			if(head.value < value){
				this.find(value, head.next, res);
				
			}else if(head.value === value){
				res.isitin = true;
				return;
			}
		}
		return;
	}
	// Adds Node to the collection in sorted order
	push(value){
		let newNode	= new Node(value);
		if(this.head){
			let targetNode = this.getLastNode(value);
			if(targetNode.value < value){
				targetNode.next = newNode;
			}else if(targetNode.value > value){
				targetNode.prev = newNode;
			}
		}else{
			this.head = newNode;
		}
		
		return 1;
	}
	// Return Node the current value to be concatinated
	getLastNode(value){
		if(this.head){
			let pointer, prevNode;
			for(pointer = this.head, prevNode = this.head; pointer;){
				prevNode = pointer;
				if(pointer.value > value){
					pointer = pointer.prev;
				}else if(pointer.value < value){
					pointer = pointer.next;
				}
			}
			return prevNode;
		}else{
			return null;
		}
	}
	// Recursivly makes ordered list from Nodes
	getSortedNode(node){
		let list = new List();
		if(node.prev){
			let sublist = this.getSortedNode(node.prev);
			list.concat(sublist);
		}
		list.push(node.value);
		if(node.next){
			let sublist = this.getSortedNode(node.next);
			list.concat(sublist);
		}
		return list;
	}
	// Makes ordered list from the tree
	treeToList(){
		let list = new List();
		if(this.head){
			list.concat(this.getSortedNode(this.head));
		}
		return list;	
	}
	// Print tree in the view of ordered list
	printList(){
		
		this.treeToList().print();
		
	}
}