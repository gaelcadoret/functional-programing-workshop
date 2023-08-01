// Generic utils functions
const log = (msg) => { console.log('msg', msg); return msg; }
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const filter = (fn) => (arr) => arr.filter(fn);
const filterByProp = (propKey, propVal) => (obj) => obj[propKey] === propVal;
const map = (fn) => (arr) => arr.map(fn);
const reduce = (fn, initialValue) => (arr) => arr.reduce(fn, initialValue);
const add = (a, b) => a + b;
const divide = (a, b) => a / b;

const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

module.exports = {
    log,
    pipe,
    filter,
    filterByProp,
    map,
    reduce,
    add,
    divide,
    euro,
}