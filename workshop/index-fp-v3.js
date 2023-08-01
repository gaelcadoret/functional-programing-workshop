console.log('workshop (fp) v3');

const { filterByProp, filter, map } = require('../src/utils');

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

/** *************
 * business logic
 * **************
 */
const filterSportCar = filterByProp('type', TYPE_SPORT);
const filterGtCar = filterByProp('type', TYPE_GT);

const filterCarsByTypeSport = filter(filterSportCar);
const filterCarsByTypeGt = filter(filterGtCar);

const sportCars = filterCarsByTypeSport(cars);
const gtCars = filterCarsByTypeGt(cars);

const buildCarLabel = (car) => `${car.brand} (${car.model})`
const buildCarsLabel = map(buildCarLabel);

/** *************
 *    handler
 * **************
 */
const sportCarsList = buildCarsLabel(sportCars);
const gtCarsList = buildCarsLabel(gtCars);

console.log("sportCarsList", JSON.stringify(sportCarsList));
console.log("gtCarsList", JSON.stringify(gtCarsList));

console.log("is sport cars' list is correct", JSON.stringify(sportCarsList) === '["audi (R8 coupé v10 performance quattro)","porsche (911 sport classic)"]')
console.log("is GT cars' list is correct", JSON.stringify(gtCarsList) === '["audi (sportback TFSI)","porsche (Panamera 4 executive)"]')