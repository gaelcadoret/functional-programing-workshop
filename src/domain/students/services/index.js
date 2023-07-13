const { findAll } = require("../../../infra/orm/mongoClient/repositories/students");

const { getScientistAverageResults, getLiteraryAverageResults } = require('../index');

const getAllStudents = async (type) =>
    type === 'scientist'
        ? getScientistAverageResults(await findAll())
        : getLiteraryAverageResults(await findAll());

module.exports = {
    getAllStudents,
}