import fs from 'fs';
import readline from 'readline';

async function processCSV() {
    const reader = readline.createInterface({
        input: fs.createReadStream('./train.csv', 'utf8'),
        crlfDelay: Infinity
    });

    let totalFare = 0;
    let averageFare_1 = { total: 0, count: 0 };
    let averageFare_2 = { total: 0, count: 0 };
    let averageFare_3 = { total: 0, count: 0 };

    let totalQuanSur = 0, totalQuanNonSur = 0;
    let totalQuanSurMen = 0, totalQuanNonSurMen = 0;
    let totalQuanSurWomen = 0, totalQuanNonSurWomen = 0;
    let totalQuanSurChild = 0, totalQuanNonSurChild = 0;
    let line = 0;

    for await (const data of reader) {
        const values = data.split(',');
        if (line === 0) {
            let headers = values;
        } else {
            const fare = parseFloat(values[10]);
            const survived = values[1];
            const sex = values[5];
            const age = parseFloat(values[6]);
            const pClass = +values[2];

            if (!isNaN(fare)) totalFare += fare;

            switch (survived) {
                case '1':
                    totalQuanSur++;
                    if (sex === 'male') totalQuanSurMen++;
                    if (sex === 'female') totalQuanSurWomen++;
                    if (!isNaN(age) && age < 18) totalQuanSurChild++;
                    break;
                case '0':
                    totalQuanNonSur++;
                    if (sex === 'male') totalQuanNonSurMen++;
                    if (sex === 'female') totalQuanNonSurWomen++;
                    if (!isNaN(age) && age < 18) totalQuanNonSurChild++;
                    break;
            }

            switch (pClass) {
                case 1:
                    averageFare_1.total += fare;
                    averageFare_1.count++;
                    break;
                case 2:
                    averageFare_2.total += fare;
                    averageFare_2.count++;
                    break;
                case 3:
                    averageFare_3.total += fare;
                    averageFare_3.count++;
                    break;
            }
        }
        line++;
    }

    console.log(`Total Fare: ${totalFare.toFixed(2)}`);
    console.log(`Average Fare for Class 1: ${(averageFare_1.total / averageFare_1.count).toFixed(2)}`);
    console.log(`Average Fare for Class 2: ${(averageFare_2.total / averageFare_2.count).toFixed(2)}`);
    console.log(`Average Fare for Class 3: ${(averageFare_3.total / averageFare_3.count).toFixed(2)}`);
    console.log(`Total Survived: ${totalQuanSur}`);
    console.log(`Total Not Survived: ${totalQuanNonSur}`);
    console.log(`Survived Men: ${totalQuanSurMen}`);
    console.log(`Non-Survived Men: ${totalQuanNonSurMen}`);
    console.log(`Survived Women: ${totalQuanSurWomen}`);
    console.log(`Non-Survived Women: ${totalQuanNonSurWomen}`);
    console.log(`Survived Children: ${totalQuanSurChild}`);
    console.log(`Non-Survived Children: ${totalQuanNonSurChild}`);
}

processCSV().catch(console.error);
