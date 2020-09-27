const { mainModule } = require("process");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const numIntPos = /^\d+$/;

function ask(questionText) {
    return new Promise((resolve, reject) => {
        rl.resume();
        rl.question(questionText, (input) => {
            rl.pause();
            resolve(input)
        } );
    });
}

async function readEntries(entries) {
    var arrayEven = [], arrayOdd = [];
    
    for(i=0; i < entries; i++){
        number_input = await ask(`Digite o ${i+1}º numero: `);
        if(!number_input.match(numIntPos)) {
            console.log("Favor digitar numeros inteiros positivos.");
            return;
        }
        
        if(number_input % 2 == 0){
            arrayEven.push(Number(number_input));
        } else {
            arrayOdd.push(Number(number_input));
        }
    }

    return {arrayEven: arrayEven, arrayOdd: arrayOdd};
}

async function getInfo(){
    var entries;

    entries = await ask("Digite o numero de entradas: ");
    if(!entries.match(numIntPos)) {
        console.log("Favor digitar numeros inteiros positivos.");
        return;
    }
    if(entries < 1 || entries > 105){
        console.log("Valores maiores que 1 e menores que 105.");
        return;
    }

    obj = await readEntries(entries);
    if(obj){
        arrayEven = obj.arrayEven.sort(function(a,b){
            return a - b;
        });
        arrayOdd = obj.arrayOdd.sort(function(a,b){
            return b - a;
        });

        array = arrayEven.concat(arrayOdd);

        console.log(array);
    }

    return
}

async function getAllInfo(execute){
    if(execute === true) {
        await getInfo();
    }

    var operation = await ask('Deseja fazer outra operação? (S/N)\n');

    switch(operation) {
        case 's':
        case 'S':
        case 'y':
        case 'Y':
            await getAllInfo(true);
            break;
        case 'n':
        case 'N':
            rl.close();
            return
        default:
            console.log("Favor informar S ou N");
            await getAllInfo(false);
            break;
    }
}

async function main() {
    await getAllInfo(true);
}

main();
