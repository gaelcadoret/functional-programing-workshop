// Generic utils functions
const log = (msg) => { console.log('msg', msg); return msg; }
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const filter = (fn) => (arr) => arr.filter(fn);
const filterByProp = (propKey, propVal) => (obj) => obj[propKey] === propVal;
const map = (fn) => (arr) => arr.map(fn);
const reduce = (fn, initialValue) => (arr) => arr.reduce(fn, initialValue);
const add = (a, b) => a + b;
const divide = (a, b) => a / b;



const isEqual = (a, b) => a === b;
const cmp = (objB, propB, propA) => (objA) => objA[propA] === objB[propB];
const some = (fn) => (arr) => arr.some(fn);

// const compareObjects = (obj1, obj2) =>
//     Object.entries(obj1).every(([key, value]) => obj2[key] === value);
//
// // Fonction pour vérifier si un élément existe dans un tableau en utilisant une fonction de comparaison
// const existsInArray = (comparator) => (item, array) =>
//     array.some(arrayItem => comparator(item, arrayItem));
//
// // Fonction pour calculer la différence entre deux tableaux en utilisant une fonction de comparaison
// const differenceWith = (comparator) => (referenceArray, compareArray) =>
//     compareArray.filter(compareItem =>
//         !existsInArray(comparator)(compareItem, referenceArray)
//     );

// Test data
// const referenceArray = [
//     { locale: 'en_US', key1: 'English Key 1', key2: 'English Key 2' },
//     { locale: 'fr_FR', key1: 'French Key 1', key2: 'French Key 2' }
// ];
//
// const languages = [
//     { locale: 'en_US', key1: 'English Key 1', key2: 'English Key 2' },
//     { locale: 'fr_FR', key1: 'French Key 1', key2: 'French Key 2' },
//     { locale: 'de_DE', key1: 'Deutch Key 1', key2: 'Deutch Key 2' }
// ];

// When
// const compareFn = (item1, item2) => compareObjects(item1, item2);
// const existsFn = existsInArray(compareFn);
// const differenceFn = differenceWith(compareFn);
//
// const result = differenceFn(referenceArray, languages);

// function differenceWith(referenceArray, compareArray) {
//     return compareArray.filter(compareItem =>
//         !referenceArray.some(referenceItem =>
//             Object.entries(compareItem).every(([key, value]) => referenceItem[key] === value)
//         )
//     );
// }

// Fonction de composition
const compose = (...functions) => input =>
    functions.reduce((result, func) => func(result), input);

// Fonction pour comparer deux objets en utilisant toutes leurs paires clé-valeur
const compareObjects = (obj1, obj2) =>
    Object.entries(obj1).every(([key, value]) => obj2[key] === value);

// Fonction pour vérifier si un élément existe dans un tableau en utilisant une fonction de comparaison
const existsInArray = (comparator) => (item, array) =>
    array.some(arrayItem => comparator(item, arrayItem));

// Fonction pour calculer la différence entre deux tableaux en utilisant une fonction de comparaison
const differenceWith = (comparator) => (referenceArray, compareArray) =>
    compareArray.filter(compareItem =>
        !existsInArray(comparator)(compareItem, referenceArray)
    );

// When
const existsFn = existsInArray(compareObjects);
const differenceFn = differenceWith(compareObjects);
// const getMissingLanguages = (translations, languages) => languages.filter(language => !translations.some(isPropEqual(language, 'code', 'locale')));
const getMissingLanguages = (translations, languages) => filter(language => !some(cmp(language, 'code', 'locale'))(translations))(languages);
// const processMissingLanguages = (translations) => (languages) => {
//     // return languages.filter(isMissing(translations));
//     return filter(isMissing(translations))
// };

// const getMissingLanguages = (translations, languages) => languages.filter(language => !translations.some(translation => translation.locale === language.code));
const getNewEntries = (missingLanguages) => missingLanguages.map(language => ({
    locale: language.code,
    fallback: language.fallback.code,
    key1: '',
    key2: ''
}));
function addLanguagesToTranslations(translations, languages) {
    const missingLanguages = getMissingLanguages(translations, languages);
    return [...translations, ...getNewEntries(missingLanguages)];
}

// const addLanguagesToTranslations = (translations, languages) => {
//     const translationKeys = Object.keys(translations[0])
//     const entries = translationKeys.map(key => [key, ''])
//     const emptyObject = Object.fromEntries(entries);
//
//     return languages.map(({ code, fallback }) =>
//         translations.find((t) => t.locale === code) || { ...emptyObject, locale: code, fallback: fallback.code });
// }

const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
});

module.exports = {
    log,
    pipe,
    filter,
    filterByProp,
    differenceWith,
    differenceFn,
    existsFn,
    compose,
    compareObjects,
    map,
    reduce,
    add,
    divide,
    euro,
    addLanguagesToTranslations,
}