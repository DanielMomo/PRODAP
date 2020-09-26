const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const regexFloat = /^[-+]?[0-9]+\.[0-9]{2}$/;

async function getInfo(numExec) {
    await getInfoPromise().then((obj) => {
        var valor = obj.salary + 0.15 * obj.total;
        valor = (Math.round(valor * 100) / 100).toFixed(2);

        console.log(`TOTAL = $${valor}`);

        getAllInfo(numExec+1);
    }).catch((error) => {
        console.log(`Erro ao processar informações: ${error.toString()}`);
        getAllInfo(numExec+1);
    });
}

async function getAllInfo(numExec) {
    var promise = new Promise((resolve, reject) => {
        if(numExec == 0) {
            getInfo(numExec);
        }

        rl.question('Deseja fazer outra operação? (S/N)', (input_operacao) => {
            rl.pause();

            switch(input_operacao) {
                case 's':
                case 'S':
                case 'y':
                case 'Y':
                    getInfo(numExec);
                    break;
                case 'n':
                case 'N':
                    rl.close();
                    resolve();
                    break;
                default:
                    console.log("Informe S ou N");
                    getAllInfo(numExec);
            }
        });
    });

    return promise;

}

getInfoPromise = function () {
    var promise = new Promise((resolve, reject) => {
        var name, salary, total_of_sales;
        rl.resume();

        rl.question('Nome do vendedor: ', (input_nome) => {
        
            name = input_nome;

            rl.question('Salario: ', (input_salary) => {
                rl.pause();
                if(!input_salary.match(regexFloat)) {
                    reject("Não é um número float de duas casas decimais.");
                    return;
                }
                salary = Number(result);
                rl.resume();
        
                rl.question('Total de vendas: ', (input_total_of_sales) => {
                    rl.pause();

                    if(!input_total_of_sales.match(regexFloat)) {
                        reject("Não é um número float de duas casas decimais.");
                        return;
                    }
                    total_of_sales = Number(input_total_of_sales.trim());

                    resolve({
                        name: name, 
                        salary: salary, 
                        total: total_of_sales
                    });
                });
                
            });
        });
    });

    return promise;
}

async function main() {
    await getAllInfo(0);
}

main();

