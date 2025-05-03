import {parse} from "csv-parse/sync";

export class Passengers {
    constructor(arr) {
        const csvText = arr.join('\n');
        this.arr = parse(csvText, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });
    }

    TotalSurvivors() {
        return this.arr.reduce((acc, passenger) => {
            if (Number(passenger.Survived)) acc.survived.push(passenger);
            else acc.nonSurvived.push(passenger);
            return acc;
        }, {survived: [], nonSurvived: []});
    }

    getTotalFares() {
        const total = this.arr
            .map(a => Number(a.Fare))
            .filter(f => !isNaN(f))
            .reduce((acc, cur) => acc + cur, 0);

        return {total: total.toFixed(2)};
    }

    getAverageFareByClass(numClass) {
        const fares = this.arr
            .filter(f => Number(f.Pclass) === numClass)
            .map(a => Number(a.Fare))
            .filter(f => !isNaN(f));

        const total = fares.reduce((acc, cur) => acc + cur, 0);
        const average = total / fares.length;

        return {
            total: total.toFixed(2),
            average: average.toFixed(2)
        };
    }

    getSurvivorQuantities() {
        const {survived, nonSurvived} = this.TotalSurvivors();
        return {
            survivedQuan: survived.length,
            nonSurvivedQuan: nonSurvived.length
        };
    }

    getDetailedSurvival() {
        const {survived, nonSurvived} = this.TotalSurvivors()
        const survivedMen = survived.filter(f => f.Sex === 'male')
        const nonSurvivedMen = nonSurvived.filter(f => f.Sex === 'male')
        const survivedWomen = survived.filter(f => f.Sex === 'female')
        const nonSurvivedWomen = nonSurvived.filter(f => f.Sex === 'female')
        const survivedChildren = survived.filter(f => {
            const age = parseFloat(f.Age);
            return !isNaN(age) && age > 0 && age < 18;
        });

        const nonSurvivedChildren = nonSurvived.filter(f => {
            const age = parseFloat(f.Age);
            return !isNaN(age) && age > 0 && age < 18;
        });
        return {
            men: {
                survived: survivedMen.length,
                notSurvived: nonSurvivedMen.length
            },
            women: {
                survived: survivedWomen.length,
                notSurvived: nonSurvivedWomen.length
            },
            children: {
                survived: survivedChildren.length,
                notSurvived: nonSurvivedChildren.length
            }
        }
    }
}
