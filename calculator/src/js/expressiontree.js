import BinaryTree from './binarytree.js';
import BinaryNode from './binarynode.js';

// function* _generator(range){
	// for(let i = range.start; i <= range.end; i += range.step){
		// yield i;
	// }
	// return;
// }
export default class ExpressionTree extends BinaryTree{
	constructor(priorities, range){
		super();
		this.priorities = priorities;
		this.range = range;
		this._g = function(_range){
			let from = _range.start,
				to = _range.end,
				step = _range.step,
				i = from - step;
			return {
				next: function(){
					if(i + step <= to){
						i += step;
						return {value: i, done: false}
					}else{
						return {done:true}
					}
				}
			}
		};
	}
	getPriority(symbol){
		let priority = this.priorities[symbol];
		if(!priority){
			priority = 100;
		}
		return priority;
	}
	isIndexInBrackets(index, brackets){
		for(let bracketsPair of brackets){
			if(bracketsPair[0] <= index && index <= bracketsPair[1]){
				return true;
			}
		}
		return false;
	}
	buildTree(expression){
		this.head = this.buildTreeWithBrackets(expression);
	}
	buildTreeWithBrackets(expression){
		let brackets = this.findBrackets(expression),
			rootNode;
		if(brackets.length >= 1){
			let maxPriority = -1;
			let maxPriorityIndexes = [];
			for(let i = 0; i < expression.length; i++){
				if(!this.isIndexInBrackets(i, brackets)){
					let newPriority = this.getPriority(expression[i]);
						if(maxPriority <= newPriority && newPriority !== 100){
							maxPriority = newPriority;
							maxPriorityIndexes.push(i);
						}
				}else{
					continue;
				}
			}
			if(maxPriority === -1){
				expression = expression.substring(1, expression.length - 1);
				rootNode = this.buildTreeWithBrackets(expression);
			}else{
				let rootIndex = null;
				if(expression[maxPriorityIndexes[0]] === '/'){
					rootIndex = maxPriorityIndexes[0];
				}else{
					rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
				}
				let root = expression[rootIndex];
				let expressionBeforeRoot = expression.substring(0, rootIndex);
				let expressionAfterRoot = expression.substring(rootIndex +1);
				rootNode = new BinaryNode(root);
				rootNode.next = this.buildTreeWithBrackets(expressionAfterRoot);
				rootNode.prev = this.buildTreeWithBrackets(expressionBeforeRoot);
			}
		}else{
			rootNode = this.buildSubTree(expression);
		}
		return rootNode;
	}
	buildSubTree(expression){
		let rootNode = null;
		if(expression.length > 1){
			let maxPriorityIndexes = this.findIndexesOfMaxPriorities(expression);
			let rootIndex = null;
			if(!maxPriorityIndexes.length){
				// return new BinaryNode(_generator(this.range));
				// return new BinaryNode(_generator(this.range));
				return new BinaryNode(this._g(this.range));
			}else if(expression[maxPriorityIndexes[0]] === '/'){
				rootIndex = maxPriorityIndexes[0];
			}else{
				rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
			}
			let root = expression[rootIndex];
			rootNode = new BinaryNode(root);
			let rightExpressionPart = expression.substring(rootIndex + 1);
			let leftExpressionPart = expression.substring(0, rootIndex);
			rootNode.prev = this.buildSubTree(leftExpressionPart);
			rootNode.next = this.buildSubTree(rightExpressionPart);
		}else{
			
			rootNode = !isNaN(expression[0])?
								new BinaryNode(expression[0]) :
								new BinaryNode(this._g(this.range));
		}
		return rootNode;
	}
	findBrackets(expression){
		let openBracketsIndexes = [];
		let closeBracketsIndexes = [];
		let level = 0;
		for(let i = 0; i < expression.length; i++){
			if (expression[i] === '(') {
				if(!level){
					openBracketsIndexes.push(i);
				}
				level++;
			}else if (expression[i] === ')'){
				level--;
				if(!level){
					closeBracketsIndexes.push(i);
				}
			}
		}
		let brackets = [];
		for(let i = 0; i < openBracketsIndexes.length; i++){
			brackets.push([openBracketsIndexes[i], closeBracketsIndexes[i]]);
		}
		return brackets;
	}
	findIndexesOfMaxPriorities(expression){
		let indexes = [],
			max = 0,
			priority = 0;
		for(let i = 0; i < expression.length; i++){
			priority = this.getPriority(expression[i]);
			if(priority !== 100){
				if(priority > max){
					indexes = [];
					max = priority;
					indexes.push(i);
				}else if(priority < max){
					continue;
				}else{
					indexes.push(i);
				}
			}
		}
		
		return indexes;
	}
	treeToExpression(){
		return this.NodeToString(this.head);
	}
	NodeToString(node){
		let expression = [];
		expression.push(node.value);
		if(node.prev){
			expression.unshift(this.NodeToString(node.prev));
		}
		if(node.next){
			expression.push(this.NodeToString(node.next));
		}
		return expression.join('');
	}
	calculate(){
		const func = [];
		for(let res = this._calculate(this.head); !isNaN(res);res = this._calculate(this.head)){
			func.push(res);
		}
		return func;
	}
	_calculate(node){
		if(this.priorities[node.value]){
			switch(node.value){
				case '+': 
					return this._calculate(node.prev) + this._calculate(node.next);
				case '-':
					return this._calculate(node.prev) - this._calculate(node.next);
				case '*':
					return this._calculate(node.prev) * this._calculate(node.next);
				case '/':
					return this._calculate(node.prev) / this._calculate(node.next);
			}
		}else{
			return !node.value ? 0 :
						!isNaN(node.value) ?
							Number(node.value) :
							node.value.next().value;
		}
	}
	
}