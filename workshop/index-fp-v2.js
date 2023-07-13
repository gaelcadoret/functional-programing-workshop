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

const filter = (fn) => (arr) => arr.filter(fn);
const filterByKeyVal = (key , val) => (obj) => obj[key] === val;
const map = (fn) => (arr) => arr.map(fn);


const filterSportCar = filterByKeyVal('type', 'sport');
const filterGtCar = filterByKeyVal('type', 'gt');

const filterCarsByTypeSport = filter(filterSportCar);
const filterCarsByTypeGt = filter(filterGtCar);

const sportCars = filterCarsByTypeSport(cars);
const gtCars = filterCarsByTypeGt(cars);

const buildCarLabel = (car) => `${car.brand} (${car.model})`

// const sportCarsList = sportCars.map(buildCarLabel)
const buildCarsLabel = map(buildCarLabel);

console.log("sportCarsList", buildCarsLabel(sportCars))
console.log("gtCarsList", buildCarsLabel(gtCars))