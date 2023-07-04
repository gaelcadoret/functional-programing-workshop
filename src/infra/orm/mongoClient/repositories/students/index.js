const students = require('../../../../../../__mocks__/students.json');

const wait = (duration) => new Promise((res) => {
    setTimeout(() => {
        res();
    }, duration);
});

const findAll = async () => {
    await wait(0);
    return students;
};

module.exports = {
    findAll,
}