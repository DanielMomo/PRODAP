const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const regex2Floats = /^[-+]?[0-9]+\.[0-9]+ [-+]?[0-9]+\.[0-9]+$/;

getInfoPromise = function () {
    var promise = new Promise((resolve, reject) => {
        var x1, y1, x2, y2;
        rl.resume();

        rl.question('Digite a primeira coordenada: ', (input_coordinate) => {
        
            if(!input_coordinate.match(regex2Floats)) {
                reject("Não são dois números float separado por espaço.");
                return;
            }

            coordinate = input_coordinate.split(" ");
            
            x1 = coordinate[0];
            y1 = coordinate[1];

            rl.question('Digite a segunda coordenada: ', (input_coordinate) => {
                rl.pause();

                if(!input_coordinate.match(regex2Floats)) {
                    reject("Não são dois números float separado por espaço.");
                    return;
                }

                coordinate = input_coordinate.split(" ");
            
                x2 = coordinate[0];
                y2 = coordinate[1];
                
                pack = {
                    var1: {x: x1, y: y1},
                    var2: {x: x2, y: y2}
                };

                resolve(pack);
            });
        });
    });

    return promise;
}

async function getInfo(numExec) {
    await getInfoPromise().then((obj) => {
        x1 = obj.var1.x;
        x2 = obj.var2.x;
        y1 = obj.var1.y;
        y2 = obj.var2.y;

        result  = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2)).toFixed(4);

        console.log(result);

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

async function main() {
    await getAllInfo(0);
}

main();
