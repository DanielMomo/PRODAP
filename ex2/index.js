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

const regex2Floats = /^[-+]?[0-9]+\.[0-9]+ [-+]?[0-9]+\.[0-9]+$/;


async function readCoordinates() {
    var input_coordinate, coordinate;
    
    input_coordinate = await ask('Digite a primeira coordenada: ');
    if(!input_coordinate.match(regex2Floats)) {
        console.log("Não são dois números float de uma casa decimal separado por espaço.");
        return false;
    }

    coordinate = input_coordinate.split(" ");

    x1 = coordinate[0];
    y1 = coordinate[1];

    input_coordinate = await ask('Digite a segunda coordenada: ');
    if(!input_coordinate.match(regex2Floats)) {
        console.log("Não são dois números float de uma casa decimal separado por espaço.");
        return false;
    }

    coordinate = input_coordinate.split(" ");
            
    x2 = coordinate[0];
    y2 = coordinate[1];
    
    pack = {
        var1: {x: x1, y: y1},
        var2: {x: x2, y: y2}
    };

    return pack;
}



async function calcDistance(){
    var obj = await readCoordinates();
    if(obj){
        x1 = obj.var1.x;
        x2 = obj.var2.x;
        y1 = obj.var1.y;
        y2 = obj.var2.y;

        result  = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)).toFixed(4);

        console.log(result);
    }
    return
}


async function menu(execute){
    if(execute === true) {
        await calcDistance();
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
