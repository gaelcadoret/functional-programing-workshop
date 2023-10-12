const {
    log,
    pipe,
    divide,
    add,
    filter,
    filterByProp,
    map,
    reduce,
    addLanguagesToTranslations,
    compose,
    existsFn,
    differenceFn,
} = require('../');

describe('utils', () => {
    describe('log', () => {
        it('Should call console.log and then return the value', () => {
            const consoleLogSpy = jest.spyOn(console, 'log');

            expect(log('hello')).toBe('hello');
            expect(consoleLogSpy).toHaveBeenCalledTimes(1);
            expect(consoleLogSpy).toHaveBeenCalledWith('msg', 'hello');
        });
    });

    describe('add', () => {
        it('Should add 2 numbers and return the good result', () => {
            expect(add(2, 3)).toBe(5);
        });
    });

    describe('divide', () => {
        it('Should divide 2 numbers and return the good result', () => {
            expect(divide(9, 3)).toBe(3);
        });
    });

    describe('map', () => {
        it('Should iterate on an array and apply the aggregate function', () => {
            const arr = [1,2,3,4,5,6,7,8,9];
            const isOdd = (el) => el % 2 === 0;
            expect(map(isOdd)(arr)).toEqual([false, true, false, true, false, true, false, true, false]);
        });
    });

    describe('reduce', () => {
        it('Should reduce an array by applying the aggregate function and return the good result', () => {
            const arr = [1,2,3,4,5,6,7,8,9];
            const sum = (a, b) => a + b;
            expect(reduce(sum, 0)(arr)).toBe(45);
        });
    });

    describe('pipe', () => {
        it('Should chain functions and return the good result', () => {
            const addCurried = (a) => (b) => a + b;
            const multCurried = (a) => (b) => a * b;

            const pipeline = pipe(
                addCurried(3),
                multCurried(11),
                addCurried(10)
            )
            expect(pipeline(4)).toBe(87);
        });
    });

    describe('filterByProp', () => {
        it('Should filter an array with the given filter\'s function', () => {
            const cars = [
                {
                    brand: 'audi',
                    model: 'sportback',
                    type: 'gt'
                },
                {
                    brand: 'opel',
                    model: 'vectra',
                    type: 'citadine'
                },
                {
                    brand: 'audi',
                    model: 'R8',
                    type: 'sport'
                }
            ]
            const filterByTypeSport = filterByProp('type', 'sport');
            const filterArrByTypeSport = filter(filterByTypeSport);

            expect(filterArrByTypeSport(cars)).toEqual([{
                brand: 'audi',
                model: 'R8',
                type: 'sport'
            }]);
        });
    });

    describe('addLanguagesToTranslations', () => {
        it('should addLanguagesToTranslations - return array with keys and fallback', () => {
            // Given
            const translations = [
                { locale: 'en_US', key1: 'English Key 1', key2: 'English Key 2' },
                { locale: 'fr_FR', key1: 'French Key 1', key2: 'French Key 2' }
            ];

            const languages = [
                { code: 'en_US', fallback: { code: 'en_US' } },
                { code: 'fr_FR', fallback: { code: 'en_US' } },
                { code: 'de_DE', fallback: { code: 'en_US' } }
            ];

            // When
            const result = addLanguagesToTranslations(translations, languages);

            // Then
            expect(result).toEqual([
                { locale: 'en_US', key1: 'English Key 1', key2: 'English Key 2' },
                { locale: 'fr_FR', key1: 'French Key 1', key2: 'French Key 2' },
                { locale: 'de_DE', key1: '', key2: '', fallback: 'en_US' },
            ]);
        });
    })

    // describe('differenceWith', () => {
    //     it('should return the difference between 2 arrays', () => {
    //         // Given
    //         const referenceArray = [
    //             { locale: 'en_US', key1: 'English Key 1', key2: 'English Key 2' },
    //             { locale: 'fr_FR', key1: 'French Key 1', key2: 'French Key 2' }
    //         ];
    //
    //         const languages = [
    //             { locale: 'en_US', key1: 'English Key 1', key2: 'English Key 2' },
    //             { locale: 'fr_FR', key1: 'French Key 1', key2: 'French Key 2' },
    //             { locale: 'de_DE', key1: 'Deutch Key 1', key2: 'Deutch Key 2' },
    //         ];
    //
    //         // When
    //         const composedFunction = (refArray, cmpArray) => compose(
    //             differenceFn(refArray),
    //             existsFn(cmpArray)
    //         );
    //
    //         const result = composedFunction(referenceArray, languages);
    //
    //         // Then
    //         expect(result).toEqual([
    //             { locale: 'de_DE', key1: 'Deutch Key 1', key2: 'Deutch Key 2' },
    //         ]);
    //     });
    // })
});