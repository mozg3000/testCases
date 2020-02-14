import MNode from './js/mnode.js';
// const MNode = require('./js/node.js');
	
export default class BinarNode extends MNode{
	constructor(value){
		super(value);
		this.prev = null;
	}
}
// import Node from './node.js';