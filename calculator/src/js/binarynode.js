import Node from './mnode.js';
export default class BinaryNode extends Node{
	constructor(value){
		super(value);
		this.prev = null;
	}
	
}