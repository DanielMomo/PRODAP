const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.resume();
        rl.question(questionText, (input) => {
            rl.pause();
            resolve(input)
        } );
    });
}


const regexFloat = /^[-+]?[0-9]+\.[0-9]{2}$/;


async function readValues() {
    var name, salary, total_of_sales;
    
    name = await ask('Nome do vendedor: ');

    var input_salary = await ask('Salario: ');
    if(!input_salary.match(regexFloat)) {
        console.log("Não é um número float de duas casas decimais.");
        return false;
    }
    salary = Number(input_salary.trim());

    var input_total_of_sales = await ask('Total de vendas: ');
    if(!input_total_of_sales.match(regexFloat)) {
        console.log("Não é um número float de duas casas decimais.");
        return false;
    }
    total_of_sales = Number(input_total_of_sales.trim());

    var pack = {
        name: name, 
        salary: salary, 
        total: total_of_sales
    };

    return pack;
}


async function calcValue(){
    var obj = await readValues();
    if(obj){
        var valor = obj.salary + 0.15 * obj.total;
        valor = (Math.round(valor * 100) / 100).toFixed(2);

        console.log(`TOTAL = R$ ${valor}`);
    }
    return
}


async function menu(execute){
    if(execute === true) {
        await calcValue();
    }

    var operation = await ask('Deseja fazer outra operação? (S/N)\n');

    switch(operation) {
        case 's':
        case 'S':
        case 'y':
        case 'Y':
            await menu(true);
            break;
        case 'n':
        case 'N':
            rl.close();
            return
        default:
            console.log("Favor informar S ou N");
            await menu(false);
            break;
    }
}


async function main() {
    await menu(true);
}


main();


