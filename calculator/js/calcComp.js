Vue.component('calc',{

    data(){

        return {
            expression: ""
        }
    },
    methods:{

        calculate(input){

            input.split('').forEach(x=>{
                console.log(this.isOperator(x));
            });

        },
        isOperator(char){

            let flag = false;
            switch (char) {

                case "+": {

                    flag = true;
                }
                case "-": {

                    flag = true;
                }
                case "*": {

                    flag = true;
                }
                case "/": {

                    flag = true;
                }
            }

            return flag;
        }
    },
    template: `
    
        <div>
            <div class="row">
                    <input class="form-control form-control-sm col-4" type="text" placeholder="ваше выражение"
                            v-on:keyup.enter="calculate(expression)"
                            v-model="expression">
                </div>
        </div>
    `
});