import fs from 'node:fs';
import { Passengers } from "./functions.js";
import {calcAvrFarInClasses, calcTotalFares, calcTotalSurQuan, calculate} from "./Homework_func.js";



fs.readFile('./train.csv', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        const lines = data.split('\n').map(line => line.trim());
        const passengers = changeDate(lines);
//                            1. Calculate total fares;
        console.log(`Calculate total fares;\n${JSON.stringify(calcTotalFares(passenger))}\n`);
//                2.Calculate average fare for 1,2,3 classes of travel;
        console.log(`Calculate average fare for 1 classes of travel;\n${JSON.stringify(calcAvrFarInClasses(passenger, 1))}\n`)
        console.log(`Calculate average fare for 2 classes of travel;\n${JSON.stringify(calcAvrFarInClasses(passenger, 2))}\n`)
        console.log(`Calculate average fare for 3 classes of travel;\n${JSON.stringify(calcAvrFarInClasses(passenger, 3))}\n`)
//               3.Calculate total quantity of survived and non survived passengers;
        console.log(`Calculate total quantity of survived and non survived passengers;nn\n${JSON.stringify(calcTotalSurQuan(passenger))}\n`)
//   4.Calculate total quantity of survived and non survived men, women and children(under 18 years old);
        console.log(`Calculate total quantity of survived and non survived men, women and children(under 18 years old);\n${JSON.stringify(calculate(passenger))}\n`)

    }
})


// node ./statistics.js
