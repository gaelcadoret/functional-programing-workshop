console.log('workshop v1');

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

/**
 * Ennoncé :
 *
 * 1°) Dans un 1er temps, retourner un tableau contenant les voitures de type "SPORT" et pour lesquelles chaque voiture
 *   est formattée de la manière suivante : Marque (model) - Exemple => ["porsche (911 sport classic)"]
 *
 * 2°) Puis dans un 2nd temps, même exercice avec les voiture de type "GT"
 */

const TYPE_SPORT = 'sport';
const TYPE_GT = 'gt';

/** Etape n°1, lister les voitures de type "SPORT" */
const sportCarsList = cars
    .filter((car) => car.type === TYPE_SPORT)
    .map((car) => `${car.brand} (${car.model})`);

/** Etape n°2, lister les voitures de type "GT" */
const gtCarsList = cars
    .filter((car) => car.type === TYPE_GT)
    .map((car) => `${car.brand} (${car.model})`);

console.log("sportCarsList", JSON.stringify(sportCarsList));
console.log("gtCarsList", JSON.stringify(gtCarsList));

console.log("is sport cars' list is correct", JSON.stringify(sportCarsList) === '["audi (R8 coupé v10 performance quattro)","porsche (911 sport classic)"]')
console.log("is GT cars' list is correct", JSON.stringify(gtCarsList) === '["audi (sportback TFSI)","porsche (Panamera 4 executive)"]')