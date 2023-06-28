const {
    log,
    pipe,
    divide,
    add,
    filter,
    filterByProp,
    map,
    reduce,
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
});