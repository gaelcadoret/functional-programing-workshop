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

const filterSportCar = (car) => car.type === 'sport';
const filterGtCar = (car) => car.type === 'gt';

const sportCars = cars.filter(filterSportCar);
const gtCars = cars.filter(filterGtCar)

const buildCarLabel = (car) => `${car.brand} (${car.model})`

const sportCarsList = sportCars.map(buildCarLabel)
const gtCarsList = gtCars.map(buildCarLabel)

console.log("sportCars", sportCars)
console.log("gtCars", gtCars)

console.log("sportCarsList", sportCarsList)
console.log("gtCarsList", gtCarsList)