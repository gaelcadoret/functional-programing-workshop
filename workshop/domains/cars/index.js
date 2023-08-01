const { filterByProp, filter, map, euro } = require('../../../src/utils');

/** *************
 * business logic
 * **************
 */
const TYPE_SPORT = 'sport';
const TYPE_GT = 'gt';

const filterSportCar = filterByProp('type', TYPE_SPORT);
const filterGtCar = filterByProp('type', TYPE_GT);

const formatPrice = euro.format;

const buildCarLabel = (car) => `${car.brand} (${car.model})`
const buildCarLabelWithPrice = (car) => `${car.brand} - ${formatPrice(car.price)} TTC (${car.model})`

const filterCarsByTypeSport = filter(filterSportCar);
const filterCarsByTypeGt = filter(filterGtCar);

const buildCarsLabel = map(buildCarLabel);
const buildCarsLabelWithPrice = map(buildCarLabelWithPrice);

module.exports = {
    filterCarsByTypeSport,
    filterCarsByTypeGt,
    buildCarsLabel,
    buildCarsLabelWithPrice,
}