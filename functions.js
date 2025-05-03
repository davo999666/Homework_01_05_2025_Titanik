
export class Passengers  {
    constructor (arr){
        this.arr = arr;
    }
    getChangeDate(){

    }

}







// export function changeDate(arr) {
//     const headers = arr[0].split(',')
//     const newDate = []
//     const newArr = arr.map(a => removeCommasInsideQuotes(a))
//     for (let i = 1; i < newArr.length; i++) {
//         const values = newArr[i].trim().split(',');
//
//         newDate.push(createPassenger( headers, values));
//     }
//     return newDate
// }
// function createPassenger(headers, values) {
//     const obj = {};
//     headers.forEach((key, index) => {
//         obj[key] = values[index];
//     });
//     return obj;
// }
// function removeCommasInsideQuotes(line) {
//     return line.replace(/"([^"]*)"/g, (match, insideQuotes) => {
//         const cleaned = insideQuotes.replace(/,/g, '');
//         return `"${cleaned}"`;
//     });
// }
//
//
//
// export function calcTotalSur(arr) {
//     const survived = arr.filter(f => f.Survived === '1')
//     const nonSurvived = arr.filter(f => f.Survived === '0')
//     return {
//         survived: survived,
//         nonSurvived: nonSurvived
//     }
// }