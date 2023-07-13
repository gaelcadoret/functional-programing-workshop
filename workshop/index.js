console.log('workshop');

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
];

const sportCars = cars.filter((car) => car.type === 'sport');
const gtCars = cars.filter((car) => car.type === 'gt');

const sportCarsList = sportCars.map((car) => `${car.brand} (${car.model})`);
const gtCarsList = gtCars.map((car) => `${car.brand} (${car.model})`);

console.log("sportCarsList", sportCarsList)
console.log("gtCarsList", gtCarsList)