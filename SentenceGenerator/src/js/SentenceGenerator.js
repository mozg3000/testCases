
export default class SentenceGenerator{
	
	constructor(){
		this.result = [];
		this.stack = []; 
	}

	extractData(expression){
		this.stack = this.extractDataInBrackets(expression);
	}
	extractDataInBrackets(expression){
		let brackets = this.findBrackets(expression),
			vLines = this.findVlineOutsideBrackets(expression);
		if(vLines.length){
			let tmp = [];
			tmp.push(this.extractDataInBrackets(expression.substring(0, vLines[0])));
			for(let i = 0; i < vLines.length - 1; i++){
				let subExpression = expression.substring(vLines[i] + 1, vLines[i + 1]);
				tmp.push(this.extractDataInBrackets(subExpression));
			}
			tmp.push(this.extractDataInBrackets(expression.substring(vLines[vLines.length - 1] + 1)));
			return tmp; 
			
		}else{
			if(brackets.length >= 1){
				let tmp = [];
				tmp.push(expression.substring(0, brackets[0][0]));
				for(let i = 0; i < brackets.length; i++){
					let subexpression = expression.substring(brackets[i][0] + 1, brackets[i][1]);
					tmp.push(this.extractDataInBrackets(subexpression)); 
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
	
	generate(stack, result){
		for(let el of stack){
			if(!result.length){
				if(typeof el === 'string'){
					result.push(el);
				}else{
					for(let alt of el){
						result.push(alt);
					}
				}
			}else{
				if(typeof el === 'string'){
					for(let i = 0; i < result.length; i++){
						result[i] += el;
					}
				}else{
					let tmp = [];
					let t = [];
					for(let alt of el){
						if(typeof alt === 'string'){
							for(let v of result){
								t.push(v + alt);
							}
							tmp = [...tmp, ...t];
							t = [];
						}else{
							tmp = [...tmp, ...this.generate(alt, result.slice())];
						}
					}
					result = tmp.slice();
					tmp = [];
				}
			}
		}
		return result
	}
	
}
