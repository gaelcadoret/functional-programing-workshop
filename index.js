const {
    getScientistAverageResults,
    getLiteraryAverageResults,
} = require('./src/domain/students');

const studentResults = require('./__mocks__/students.json');

console.log("Scientist average");
console.table(getScientistAverageResults(studentResults));

console.log("Literary average");
console.table(getLiteraryAverageResults(studentResults));
