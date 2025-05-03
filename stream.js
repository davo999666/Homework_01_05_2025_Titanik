import fs from 'fs';
import readline from "readline";


const reader = readline.createInterface({
    input: fs.createReadStream('./train.csv', 'utf8'),
    crlfDelay: Infinity
});

//                         1. Calculate total fares;
let totalFare = 0;
//                2.Calculate average fare for 1,2,3 classes of travel;
let averageFare_1 = {
    total: 0,
    count: 0,
    toString: function () {
        return (this.count ? (this.total / this.count).toFixed(2) : '0');
    }
};
let averageFare_2 = {
    total: 0,
    count: 0,
    toString: function () {
        return (this.count ? (this.total / this.count).toFixed(2) : '0');
    }
};
let averageFare_3 = {
    total: 0,
    count: 0,
    toString: function () {
        return (this.count ? (this.total / this.count).toFixed(2) : '0');
    }
};
//               3.Calculate total quantity of survived and non survived passengers;
let totalQuanSur = 0
let totalQuanNonSur = 0
//   4.Calculate total quantity of survived and non survived men, women and children(under 18 years old);
let totalQuanSurMen = 0
let totalQuanNonSurMen = 0
let totalQuanSurWomen = 0
let totalQuanNonSurWomen = 0
let totalQuanSurChild = 0
let totalQuanNonSurChild = 0
let line = 0
let headers = []
reader.on('line', (data) => {
    const values = data.split(',');
    if (line === 0) {
        headers = values;
    } else {
        if (!isNaN(parseFloat(values[10]))) totalFare += parseFloat(values[10]);
        if (values[1] === '1') {
            totalQuanSur++;
            if (values[5] === 'male') totalQuanSurMen++;
            if (values[5] === 'female') totalQuanSurWomen++;
            if (!isNaN(parseFloat(values[6])) && parseFloat(values[6]) < 18) totalQuanSurChild++;
        }
        if (values[1] === '0') {
            totalQuanNonSur++;
            if (values[5] === 'male') totalQuanNonSurMen++;
            if (values[5] === 'female') totalQuanNonSurWomen++;
            if (!isNaN(parseFloat(values[6])) && parseFloat(values[6]) < 18) totalQuanNonSurChild++;
        }
        if (+values[2] === 1) {
            averageFare_1.total += parseFloat(values[10])
            averageFare_1.count++;
        }
        if (+values[2] === 2) {
            averageFare_2.total += parseFloat(values[10]);
            averageFare_2.count++;
        }
        if (+values[2] === 3) {
            averageFare_3.total += parseFloat(values[10]);
            averageFare_3.count++;
        }
    }
    line++;

})

reader.on('close', () => {
    console.log(`Total Fare: ${totalFare.toFixed(2)}`);
    console.log(`Average Fare for Class 1: ${averageFare_1.toString()}`);
    console.log(`Average Fare for Class 2: ${averageFare_2.toString()}`);
    console.log(`Average Fare for Class 3: ${averageFare_3.toString()}`);
    console.log(`Total Survived: ${totalQuanSur}`);
    console.log(`Total Not Survived: ${totalQuanNonSur}`);
    console.log(`Survived Men: ${totalQuanSurMen}`);
    console.log(`Non-Survived Men: ${totalQuanNonSurMen}`);
    console.log(`Survived Women: ${totalQuanSurWomen}`);
    console.log(`Non-Survived Women: ${totalQuanNonSurWomen}`);
    console.log(`Survived Children: ${totalQuanSurChild}`);
    console.log(`Non-Survived Children: ${totalQuanNonSurChild}`);

})


// node ./stream.js