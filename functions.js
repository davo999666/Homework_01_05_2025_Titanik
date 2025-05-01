import {parse} from 'csv-parse/sync';

export function changeDate(arr) {
    const csvText = arr.join('\n');
    return parse(csvText, {
        columns: true,
        skip_empty_lines: true,
        trim: true
    });
}


export function calcTotalSur(arr) {
    const survived = arr.filter(f => f.Survived === '1')
    const nonSurvived = arr.filter(f => f.Survived === '0')
    return {
        survived: survived,
        nonSurvived: nonSurvived
    }
}