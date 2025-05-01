//                            1. Calculate total fares;


import {calcTotalSur} from "./functions.js";

export function calcTotalFares(arr) {
    const total = arr.map(a => Number(a.Fare)).filter(f => !isNaN(f)).reduce((acc, current) => acc + current, 0)
    return {
        total: total.toFixed(2)
    }
}

//                2.Calculate average fare for 1,2,3 classes of travel;

export function calcAvrFarInClasses(arr, numClasses) {
    const classes = arr
        .filter(f => Number(f.Pclass) === numClasses)
        .map(a => Number(a.Fare)).filter(f => !isNaN(f))

    const total = classes.reduce((acc, current) => acc + current, 0)
    const average = total / classes.length;
    return {
        total: total.toFixed(2),
        average: average.toFixed(2)
    }
}

//               3.Calculate total quantity of survived and non survived passengers;


export function calcTotalSurQuan(arr) {
    const {survived, nonSurvived} = calcTotalSur(arr)
    return{
        survivedQuan: survived.length,
        nonSurvivedQuan: nonSurvived.length,
    }

}

//   4.Calculate total quantity of survived and non survived men, women and children(under 18 years old);

export function calculate(arr) {
    const {survived, nonSurvived} = calcTotalSur(arr)
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
}