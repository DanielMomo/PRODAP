const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const regex2floats = /^[-+]?[0-9]+\.[0-9]{2}$/;

getInfoPromise = function () {
    var promise = new Promise((resolve, reject) => {
        var x1, y1, x2, y2;
        rl.resume();

        rl.question('Digite a primeira coordenada: ', (input_coordinate) => {
        
            coordinate = input_coordinate.split(" ");
            console.log(coordinate);
            x1 = coordinate[0];
            y1 = coordinate[1];

            rl.question('Digite a segunda coordenada: ', (input_coordinate) => {
                rl.pause();

                coordinate = input_coordinate.split(" ");
                console.log(coordinate);
                x2 = coordinate[0];
                y2 = coordinate[1];
                
                pack = {
                    var1: {x: x1, y: y1},
                    var2: {x: x2, y: y2}
                };

                console.log(pack);
                resolve(pack);
            });
        });
    });

    return promise;
}

async function getInfo(numExec) {
    await getInfoPromise().then((obj) => {
        console.log(obj.var1.x);
        console.log(obj.var1.y);
        console.log(obj.var2.x);
        console.log(obj.var2.y);

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
