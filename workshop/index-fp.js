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

const filterSportCar = (car) => car.type === TYPE_SPORT;
const filterGtCar = (car) => car.type === TYPE_GT;

const sportCars = cars.filter(filterSportCar);
const gtCars = cars.filter(filterGtCar)

const buildCarLabel = (car) => `${car.brand} (${car.model})`

const sportCarsList = sportCars.map(buildCarLabel)
const gtCarsList = gtCars.map(buildCarLabel)

console.log("sportCarsList", JSON.stringify(sportCarsList));
console.log("gtCarsList", JSON.stringify(gtCarsList));

console.log("is sport cars' list is correct", JSON.stringify(sportCarsList) === '["audi (R8 coupé v10 performance quattro)","porsche (911 sport classic)"]')
console.log("is GT cars' list is correct", JSON.stringify(gtCarsList) === '["audi (sportback TFSI)","porsche (Panamera 4 executive)"]')