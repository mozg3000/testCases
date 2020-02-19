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
tree.buildTree('5-(3+6)/7*(4-2)')
console.log(tree);

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
