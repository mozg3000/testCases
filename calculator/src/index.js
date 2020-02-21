// import MNode from './js/mnode.js';
// import BinaryNode from './js/binarynode.js';
// import BinaryTree from './js/binarytree.js';
import ExpressionTree from './js/expressiontree.js';
import priorities from './js/priorities.js';
import List from './js/list.js';

let list = new List();
list.addNode(1);
list.addNode(2);
list.addNode(3);
list.addNode(4);
list.addNode(5);
list.addNode(6);
list.deleteNode(4);
list.deleteNode(6);
list.pop();
list.push(7);
list.shift();
list.unshift(8);
list.insert(9,4);
// console.log(list.getLastNode())
// list.print();
for(let value of list){
	console.log(value);
}
// console.log('---------')
// let iterator = list[Symbol.iterator]();
// console.log(iterator.next())

// console.log(list.getLastButOneNode())
// console.log(list.getOneNodeBefore(5))

// list.print();
// let tree = new BinaryTree();

// tree.addNode(50)
// tree.addNode(60);
// tree.addNode(40);
// tree.addNode(45);
// tree.addNode(55);
// tree.addNode(30);
// tree.printList();
// console.log(priorities)

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
