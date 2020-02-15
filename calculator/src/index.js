import MNode from './js/mnode.js';
import BinaryNode from './js/binarynode.js';
import BinaryTree from './js/binarytree.js';
import ExpressionTree from './js/expressiontree.js';
import priorities from './js/priorities.js';


// let tree = new BinaryTree();

// tree.addNode(50)
// tree.addNode(60);
// tree.addNode(40);
// tree.addNode(45);
// tree.addNode(55);
// tree.addNode(30);
// tree.printList();
// console.log(priorities)

let tree = new ExpressionTree(priorities);

// tree.addNode('1');
// tree.addNode('+');
tree.addNode('2');
tree.addNode('+');
tree.addNode('3');
tree.addNode('*');
tree.addNode('4');
tree.addNode('+');
tree.addNode('5');

console.log(tree)
// console.log(tree.getLast())