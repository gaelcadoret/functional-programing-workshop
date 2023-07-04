const { getScientistAverageResults, getLiteraryAverageResults } = require("../index");

const funcThrow = async () => {
    throw new Error('Hey...');
}

describe('[Domain] Students', () => {
    describe('getScientistAverageResults', () => {
        it('Should keep scientist notes and return the average for each students', () => {
            const students = [
                {
                    "id": 1,
                    "firstName": "Gael",
                    "lastName": "CADORET",
                    "subjects": [
                        {
                            "id": 1,
                            "label": "Maths",
                            "type": "scientist",
                            "note": 13
                        },
                        {
                            "id": 2,
                            "label": "French",
                            "type": "literary",
                            "note": 11
                        },
                        {
                            "id": 3,
                            "label": "English",
                            "type": "literary",
                            "note": 12
                        },
                        {
                            "id": 4,
                            "label": "Physics",
                            "type": "scientist",
                            "note": 14
                        }
                    ]
                },
                {
                    "id": 2,
                    "firstName": "Vincent",
                    "lastName": "VADE",
                    "subjects": [
                        {
                            "id": 1,
                            "label": "Maths",
                            "type": "scientist",
                            "note": 17
                        },
                        {
                            "id": 2,
                            "label": "French",
                            "type": "literary",
                            "note": 15
                        },
                        {
                            "id": 3,
                            "label": "English",
                            "type": "literary",
                            "note": 16
                        },
                        {
                            "id": 4,
                            "label": "Physics",
                            "type": "scientist",
                            "note": 18
                        }
                    ]
                }
            ]

            expect(getScientistAverageResults(students)).toEqual([
                {
                    fullName: "Gael CADORET",
                    average: 13.5
                },
                {
                    fullName: "Vincent VADE",
                    average: 17.5
                }
            ]);
        });
    });

    describe('getLiteraryAverageResults', () => {
        it('Should keep literary notes and return the average for each students', () => {
            const students = [
                {
                    "id": 1,
                    "firstName": "Gael",
                    "lastName": "CADORET",
                    "subjects": [
                        {
                            "id": 1,
                            "label": "Maths",
                            "type": "scientist",
                            "note": 13
                        },
                        {
                            "id": 2,
                            "label": "French",
                            "type": "literary",
                            "note": 11
                        },
                        {
                            "id": 3,
                            "label": "English",
                            "type": "literary",
                            "note": 12
                        },
                        {
                            "id": 4,
                            "label": "Physics",
                            "type": "scientist",
                            "note": 14
                        }
                    ]
                },
                {
                    "id": 2,
                    "firstName": "Vincent",
                    "lastName": "VADE",
                    "subjects": [
                        {
                            "id": 1,
                            "label": "Maths",
                            "type": "scientist",
                            "note": 17
                        },
                        {
                            "id": 2,
                            "label": "French",
                            "type": "literary",
                            "note": 15
                        },
                        {
                            "id": 3,
                            "label": "English",
                            "type": "literary",
                            "note": 16
                        },
                        {
                            "id": 4,
                            "label": "Physics",
                            "type": "scientist",
                            "note": 18
                        }
                    ]
                }
            ]

            expect(getLiteraryAverageResults(students)).toEqual([
                {
                    fullName: "Gael CADORET",
                    average: 11.5
                },
                {
                    fullName: "Vincent VADE",
                    average: 15.5
                }
            ]);
        });
    });

    describe('Throw Error', () => {
        it('should throw error', async () => {
            await expect(() => funcThrow()).rejects.toThrow('Hey...');
        })
    })
});
