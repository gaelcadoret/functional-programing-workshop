console.log('workshop (fp)');

const cars = [
    {
        brand: "audi",
        model: "sportback TFSI",
        price: 85000,
        type: "gt",
    },
    {
        brand: "porsche",
        model: "Panamera 4 executive",
        price: 113553,
        type: "gt",
    },
    {
        brand: "audi",
        model: "R8 coupé v10 performance quattro",
        price: 246340,
        type: "sport",
    },
    {
        brand: "porsche",
        model: "911 sport classic",
        price: 286215,
        type: "sport",
    },
]

const TYPE_SPORT = 'sport';
const TYPE_GT = 'gt';

/** **************
 *  Util functions
 * ***************
 */
const filter = (fn) => (arr) => arr.filter(fn);
const filterByKeyVal = (key , val) => (obj) => obj[key] === val;
const map = (fn) => (arr) => arr.map(fn);
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

/** *************
 * business logic
 * **************
 */
const filterSportCar = filterByKeyVal('type', TYPE_SPORT);
const filterGtCar = filterByKeyVal('type', TYPE_GT);

const filterCarsByTypeSport = filter(filterSportCar);
const filterCarsByTypeGt = filter(filterGtCar);

const buildCarLabel = (car) => `${car.brand} (${car.model})`

const buildCarsLabel = map(buildCarLabel);

/** *************
 *    handler
 * **************
 */
const sportPipeline = pipe(
    filterCarsByTypeSport,
    buildCarsLabel
);

const gtPipeline = pipe(
    filterCarsByTypeGt,
    buildCarsLabel
);

console.log("sportCarsList", JSON.stringify(sportPipeline(cars)));
console.log("gtCarsList", JSON.stringify(gtPipeline(cars)));

console.log("is sport cars' list is correct", JSON.stringify(sportPipeline(cars)) === '["audi (R8 coupé v10 performance quattro)","porsche (911 sport classic)"]')
console.log("is GT cars' list is correct", JSON.stringify(gtPipeline(cars)) === '["audi (sportback TFSI)","porsche (Panamera 4 executive)"]')