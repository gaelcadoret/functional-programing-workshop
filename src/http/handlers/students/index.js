const { getAllStudents } = require("../../../domain/students/services");

const getAll = async (req) =>
    getAllStudents(req.query.type);

module.exports = {
    getAll,
}