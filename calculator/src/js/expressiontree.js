import BinaryTree from './binarytree.js';

export default class ExpressionTree extends BinaryTree{
	constructor(priorities){
		super();
		this.priorities = priorities;
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
				rootNode = new Node(root);
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
				// return new Node(_generator(this.range));
				// return new Node(_generator(this.range));
				return new Node(new Object());
			}else if(expression[maxPriorityIndexes[0]] === '/'){
				rootIndex = maxPriorityIndexes[0];
			}else{
				rootIndex = maxPriorityIndexes[parseInt((maxPriorityIndexes.length-1)/2)];
			}
			let root = expression[rootIndex];
			rootNode = new Node(root);
			let rightExpressionPart = expression.substring(rootIndex + 1);
			let leftExpressionPart = expression.substring(0, rootIndex);
			rootNode.prev = this.buildSubTree(leftExpressionPart);
			rootNode.next = this.buildSubTree(rightExpressionPart);
		}else{
			
			rootNode = !isNaN(expression[0])?
								new Node(expression[0]) :
								new Node(new Object());
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
	insertIterator(_range){
		this._insertIterator(this.head.prev, _range);
		this._insertIterator(this.head.next, _range);
	}
	_insertIterator(_node, _range){
		if(_node){
			if(typeof(_node.value) === 'object'){
				_node.value = this._g(_range);
			}
			this._insertIterator(_node.prev, _range);
			this._insertIterator(_node.next, _range);
		}else{
			return;
		}
	}
	calculate(_range){
		this.insertIterator(_range);
		const func = [];
		for(let res = this._calculate(this.head); !isNaN(res);res = this._calculate(this.head)){// когда итератор проходит всю коллекцию, то он возвращает {done: true} и результат операции (+,-,*,/) будет NaN
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
			return !node.value ? 0 : // это если унирный минус, то одно node.value будет undefined, поэтому вместо него идёт 0. Ноль минус что-то будет просто минус что-то.
						!isNaN(node.value) ? // если не число, то переменная
							Number(node.value) :
							node.value.next().value; // интерируем значение переменой
		}
	}
	
}