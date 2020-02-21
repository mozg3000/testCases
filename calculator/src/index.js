// import MNode from './js/mnode.js';
// import BinaryNode from './js/binarynode.js';
import BinaryTree from './js/binarytree.js';
// import ExpressionTree from './js/expressiontree.js';
// import priorities from './js/priorities.js';
// import List from './js/list.js';
// import Stack from './js/stack.js';
// import Queue from './js/queue.js';

// Testing BINARYTREE
let bintree = new BinaryTree(50);
bintree.push(4)
bintree.push(65)
bintree.push(35)
bintree.push(45)
bintree.push(95)
bintree.push(25)
console.log(bintree)
bintree.printList()
console.log(bintree.includes(405));

// Testing QUEUE
// let queue = new Queue(7);
// queue.push(8);
// queue.push(9);
// queue.pop();
// console.log(queue.pop())
// console.log(queue)
// queue.print()

// Testing STACK
// let stack = new Stack();
// stack.push(8)
// stack.push(7)
// stack.push(6)
// stack.push(5)
// stack.push(4)
// console.log(stack.pop())
// console.log(stack)
// stack.print()

// Testing LIST
// let list = new List(7);
// list.deleteNode(4);
// list.pop();
// list.push(6);
// list.shift();
// list.unshift(8);
// list.insert(9,6);
// list.deleteNode(9);
// console.log(list)
// console.log(list.includes(7))
// list.print();
// for(let value of list){
	// console.log(value);
// }
// console.log('---------')
// let iterator = list[Symbol.iterator]();
// console.log(iterator.next())

// console.log(list.getLastButOneNode())
// console.log(list.getOneNodeBefore(5))

// list.print();
// End of LIST tests


// let tree = new ExpressionTree(priorities);
// tree.buildTree('5-(3+6)/7*(4-2)')
// console.log(tree);
// console.log(tree.treeToExpression());

// tree.addNode('1');
// tree.addNode('+');
// tree.addNode('2');
// tree.addNode('+');
// tree.addNode('3');
// tree.addNode('/');
// tree.addNode('4');
// tree.addNode('*');
// tree.addNode('5');
// tree.addNode('+');
// console.log(tree.stack)
// tree.addNode('2');
// tree.addNode('*');
// tree.addNode('1');
// tree.addNode('+');
// tree.addNode('6');
// console.log(tree.getLast())
// tree.addNode('/');
// tree.addNode('7');
// console.log(tree)
// console.log(tree.findBrackets('5*3+(6/7)*4-2'));
// tree.buildTree('5-3+6/7*4-2')
// console.log(tree);
