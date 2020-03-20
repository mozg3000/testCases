
export default class SentenceGenerator{
	
	constructor(){
		this.result = [];
		this.stack = []; 
	}

	buildTree(expression){
		this.result = this.buildTreeWithBrackets(expression);
	}
	buildTreeWithBrackets(expression){
		let brackets = this.findBrackets(expression),
			vLines = this.findVlineOutsideBrackets(expression);
		if(vLines.length){
			let tmp = [];
			tmp.push(this.buildTreeWithBrackets(expression.substring(0, vLines[0])));
			for(let i = 0; i < vLines.length - 1; i++){
				let subExpression = expression.substring(vLines[i] + 1, vLines[i + 1]);
				tmp.push(this.buildTreeWithBrackets(subExpression));
			}
			tmp.push(this.buildTreeWithBrackets(expression.substring(vLines[vLines.length - 1] + 1)));
			return tmp; 
			
		}else{
			if(brackets.length >= 1){
				let tmp = [];
				tmp.push(expression.substring(0, brackets[0][0]));
				for(let i = 0; i < brackets.length; i++){
					let subexpression = expression.substring(brackets[i][0] + 1, brackets[i][1]);
					tmp.push(this.buildTreeWithBrackets(subexpression)); 
					if(i + 1 < brackets.length){
						tmp.push(expression.substring(brackets[i][1] + 1, brackets[i + 1][0]));
					}
				}
				tmp.push(expression.substring(brackets[brackets.length - 1][1] + 1));
				return tmp;
			}else{
				return expression;
			}
		}
	}
	findVlineOutsideBrackets(expression){
		let vLines = [];
		let openBracketsIndexes = [];
		let closeBracketsIndexes = [];
		let level = 0;
		for(let i = 0; i < expression.length; i++){
			if (expression[i] === '{') {
				if(!level){
					openBracketsIndexes.push(i);
				}
				level++;
			}else if (expression[i] === '}'){
				level--;
				if(!level){
					closeBracketsIndexes.push(i);
				}
			}
			if(!level && expression[i] === '|'){
				vLines.push(i);
			}
		}
		
		return vLines;
	}
	findBrackets(expression){
		let openBracketsIndexes = [];
		let closeBracketsIndexes = [];
		let level = 0;
		for(let i = 0; i < expression.length; i++){
			if (expression[i] === '{') {
				if(!level){
					openBracketsIndexes.push(i);
				}
				level++;
			}else if (expression[i] === '}'){
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
	
	generate(){
		
	}
	
}
