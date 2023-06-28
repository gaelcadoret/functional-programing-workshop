const {add, filterByProp, filter, pipe, reduce, divide, map} = require("../../utils");

// Specific utils functions which are using generic ones
const sumWithNote = (acc, {note}) => add(acc, note)
const scientistFilter = filterByProp("type", "scientist");
const literaryFilter = filterByProp("type", "literary");
const filterByScientistType = filter(scientistFilter);
const filterByLiteraryType = filter(literaryFilter);

// const sumScientistNotes = (subjects) =>
//     subjects
//         .filter(scientistFilter)
//         .reduce(sumWithNote, 0);
const sumScientistNotes = pipe(
    filterByScientistType,
    reduce(sumWithNote, 0),
);
const sumLiteraryNotes = pipe(
    filterByLiteraryType,
    reduce(sumWithNote, 0),
);

const calcScientistAverage = (subjects) =>
    divide(
        sumScientistNotes(subjects),
        filterByScientistType(subjects).length
    );
const calcLiteraryAverage = (subjects) =>
    divide(
        sumLiteraryNotes(subjects),
        filterByLiteraryType(subjects).length
    );

const buildScientistAverageResult = ({id, firstName, lastName, subjects}) => ({
    fullName: `${firstName} ${lastName}`,
    average: calcScientistAverage(subjects),
});
const buildLiteraryAverageResult = ({id, firstName, lastName, subjects}) => ({
    fullName: `${firstName} ${lastName}`,
    average: calcLiteraryAverage(subjects),
});

const getScientistAverageResults = map(buildScientistAverageResult);
const getLiteraryAverageResults = map(buildLiteraryAverageResult);

module.exports = {
    getScientistAverageResults,
    getLiteraryAverageResults,
}