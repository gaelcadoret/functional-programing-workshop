const { filterByProp, filter, map } = require('../../../src/utils');

/** *************
 * business logic
 * **************
 */
const TYPE_SPORT = 'sport';
const TYPE_GT = 'gt';

const filterSportCar = filterByProp('type', TYPE_SPORT);
const filterGtCar = filterByProp('type', TYPE_GT);

const buildCarLabel = (car) => `${car.brand} (${car.model})`

const filterCarsByTypeSport = filter(filterSportCar);
const filterCarsByTypeGt = filter(filterGtCar);
const buildCarsLabel = map(buildCarLabel);

module.exports = {
    filterCarsByTypeSport,
    filterCarsByTypeGt,
    buildCarsLabel,
}