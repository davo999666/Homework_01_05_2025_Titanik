import fs from 'node:fs';
import { Passengers } from "./functions.js";




fs.readFile('./train.csv', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const lines = data.split('\n').map(line => line.trim());
        const passengers = new Passengers(lines);
//                            1. Calculate total fares;
        console.log(`1:Calculate total fares;\n${JSON.stringify(passengers.getTotalFares())}\n`);
//                2.Calculate average fare for 1,2,3 classes of travel;
        console.log(`2:Calculate average fare for 1 classes of travel;\n${JSON.stringify(passengers.getAverageFareByClass(1))}\n`)
        console.log(`2:Calculate average fare for 2 classes of travel;\n${JSON.stringify(passengers.getAverageFareByClass(2))}\n`)
        console.log(`2:Calculate average fare for 3 classes of travel;\n${JSON.stringify(passengers.getAverageFareByClass(3))}\n`)
//               3.Calculate total quantity of survived and non survived passengers;
        console.log(`3:Calculate total quantity of survived and non survived passengers;nn\n${JSON.stringify(passengers.getSurvivorQuantities())}\n`)
//   4.Calculate total quantity of survived and non survived men, women and children(under 18 years old);
        console.log(`4:Calculate total quantity of survived and non survived men, women and children(under 18 years old);\n${JSON.stringify(passengers.getDetailedSurvival())}\n`)

    }
})


// node ./statistics.js
