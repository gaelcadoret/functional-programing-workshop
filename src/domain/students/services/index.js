const { findAll } = require("../../../infra/orm/mongoClient/repositories/students");

const { getScientistAverageResults, getLiteraryAverageResults } = require('../index');

const getAllStudents = async (type) => {
    const students = await findAll();
    return type === 'scientist'
        ? getScientistAverageResults(students)
        : getLiteraryAverageResults(students);
};

module.exports = {
    getAllStudents,
}