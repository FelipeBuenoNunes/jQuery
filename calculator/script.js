class Calculator{
    conta = '';
    dot = false;
    result = false;

    setNumbers(number) { 
        if(this.result) this.clear();
        this.conta += number; 
    }
    setDot() {
        if(!this.dot){
            this.conta += '.';
            this.dot = true
        }
    }
    setOperator(operator){
        if(/[-,+,/,*,.]/.test(this.conta[this.conta.length-1])) return;
        this.conta += operator;
        this.dot = false;
        this.result = false;
    }

    mathCont(){
        const operands = this.conta.split(/[-,+,*,/]/).map(elem => Number(elem));
        if(operands.length < 2) return "Os dois operandos devem existir";
        const operators = this.conta.split(/[^-,+,*,/]/).filter(elem => elem !== "");
        const operatorsPrin = operators.filter(elem => elem === '/' || elem === '*');
    
        while(operands.length > 1){
            if(operatorsPrin.length > 0){
                const index = operators.indexOf(operatorsPrin[0]);
                const result = operatorsPrin[0] === '/' ? operands[index] / operands[index+1] : operands[index] * operands[index+1];
                
                operands.splice(index, 2, result);
                
                operators.splice(index, 1);
                operatorsPrin.shift();
            }else{
                const result = operators[0] === '+' ? operands[0] + operands[1] : operands[0] - operands[1];
                operands.splice(0, 2, result);
                operators.splice(0, 1);
            }
        }
        this.result = true;
        this.conta = operands[0];
    }   

    clear(){
        this.conta = '';
        this.dot = false;
        this.result = false;
    }
}

const calc = new Calculator;

$(document).ready(function (){
    $('#calculator').click((e) => {
        switch(e.target.className){
            case 'numbers':
                calc.setNumbers(e.target.innerText);
                break;
            case 'operator':
                calc.setOperator(e.target.value);
            break;
            case 'dot':
                calc.setDot();
                break;
            case 'result':
                calc.mathCont();
                break;
            case 'clear':
                calc.clear();
                break;
        }
        
        $('#display').text(calc.conta);
    });
});