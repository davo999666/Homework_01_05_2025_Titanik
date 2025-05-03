import { parse } from "csv-parse/sync";

export class Passengers {
    constructor(arr) {
        const csvText = arr.join('\n');
        this.arr = parse(csvText, {
            columns: true,
            skip_empty_lines: true,
            trim: true
        });
    }

    getTotalSurvivors() {
        const survived = this.arr.filter(f => f.Survived === '1');
        const nonSurvived = this.arr.filter(f => f.Survived === '0');
        return { survived, nonSurvived };
    }

    getTotalFares() {
        const total = this.arr
            .map(a => Number(a.Fare))
            .filter(f => !isNaN(f))
            .reduce((acc, cur) => acc + cur, 0);

        return { total: total.toFixed(2) };
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
        const { survived, nonSurvived } = this.getTotalSurvivors();
        return {
            survivedQuan: survived.length,
            nonSurvivedQuan: nonSurvived.length
        };
    }

    getDetailedSurvival() {
        const {survived, nonSurvived} = this.getTotalSurvivors()
        const survivedMen = survived.filter(f => f.Sex === 'male')
        const nonSurvivedMen = nonSurvived.filter(f => f.Sex === 'male')
        const survivedWomen = survived.filter(f => f.Sex === 'female')
        const nonSurvivedWomen = nonSurvived.filter(f => f.Sex === 'female')
        const survivedChildren = survived.filter(f => !isNaN(Number(f.Age)) && Number(f.Age) < 18);
        const nonSurvivedChildren = nonSurvived.filter(f => !isNaN(Number(f.Age)) && Number(f.Age) < 18);
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
    }}
