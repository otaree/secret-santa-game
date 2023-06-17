import { assignSecretSanta } from "../../scr/libs/secret-santa-assignment.mjs";

const employeeList = [
    ['Hamish Murray', 'hamish.murray@acme.com'],
    ['Layla Graham', 'layla.graham@acme.com'],
    ['Matthew King', 'matthew.king@acme.com'],
    ['Benjamin Collins', 'benjamin.collins@acme.com'],
    ['Isabella Scott', 'isabella.scott@acme.com'],
    ['Charlie Ross', 'charlie.ross@acme.com'],
    ['Hamish Murray', 'hamish.murray.sr@acme.com'],
    ['Piper Stewart', 'piper.stewart@acme.com'],
    ['Spencer Allen', 'spencer.allen@acme.com'],
    ['Charlie Wright', 'charlie.wright@acme.com'],
    ['Hamish Murray', 'hamish.murray.jr@acme.com'],
    ['Charlie Ross', 'charlie.ross.jr@acme.com'],
    ['Ethan Murray', 'ethan.murray@acme.com'],
    ['Matthew King', 'matthew.king.jr@acme.com'],
    ['Mark Lawrence', 'mark.lawrence@acme.com']
];
const previousYearSecretSanta = [
    [
        'Hamish Murray',
        'hamish.murray@acme.com',
        'Benjamin Collins',
        'benjamin.collins@acme.com'
    ],
    [
        'Layla Graham',
        'layla.graham@acme.com',
        'Piper Stewart',
        'piper.stewart@acme.com'
    ],
    [
        'Matthew King',
        'matthew.king@acme.com',
        'Spencer Allen',
        'spencer.allen@acme.com'
    ],
    [
        'Benjamin Collins',
        'benjamin.collins@acme.com',
        'Ethan Murray',
        'ethan.murray@acme.com'
    ],
    [
        'Isabella Scott',
        'isabella.scott@acme.com',
        'Layla Graham',
        'layla.graham@acme.com'
    ],
    [
        'Charlie Ross',
        'charlie.ross@acme.com',
        'Mark Lawrence',
        'mark.lawrence@acme.com'
    ],
    [
        'Hamish Murray',
        'hamish.murray.sr@acme.com',
        'Hamish Murray',
        'hamish.murray.jr@acme.com'
    ],
    [
        'Piper Stewart',
        'piper.stewart@acme.com',
        'Charlie Ross',
        'charlie.ross.jr@acme.com'
    ],
    [
        'Spencer Allen',
        'spencer.allen@acme.com',
        'Charlie Wright',
        'charlie.wright@acme.com'
    ],
    [
        'Charlie Wright',
        'charlie.wright@acme.com',
        'Hamish Murray',
        'hamish.murray@acme.com'
    ],
    [
        'Hamish Murray',
        'hamish.murray.jr@acme.com',
        'Charlie Ross',
        'charlie.ross@acme.com'
    ],
    [
        'Charlie Ross',
        'charlie.ross.jr@acme.com',
        'Matthew King',
        'matthew.king@acme.com'
    ],
    [
        'Ethan Murray',
        'ethan.murray@acme.com',
        'Matthew King',
        'matthew.king.jr@acme.com'
    ],
    [
        'Matthew King',
        'matthew.king.jr@acme.com',
        'Hamish Murray',
        'hamish.murray.sr@acme.com'
    ],
    [
        'Mark Lawrence',
        'mark.lawrence@acme.com',
        'Isabella Scott',
        'isabella.scott@acme.com'
    ]
];

describe("Assign Secret Santa", () => {
    let newSecretSanta = null;
    beforeAll(() => {
        newSecretSanta = assignSecretSanta(employeeList, previousYearSecretSanta);
    });

    it("should not assign itself as their secret child", () => {
        newSecretSanta.forEach((row) => {
            expect(row[1]).not.toEqual(row[3]);
        });
    });

    it("should ensure that an employee is not assigned to the same secret child as in the previous year's Secret Santa.", () => {
        for (const row of newSecretSanta) {
            const previousYearRow = previousYearSecretSanta.find(element => element[1] === row[1]);
            if (previousYearRow) {
                expect(row[3]).not.toEqual(previousYearRow[3]);
            }
        }
    });

    it("should ensure that each employee is assigned exactly one secret child", () => {
        for (const row of newSecretSanta) {
            expect(newSecretSanta.filter(element => element[1] ===  row[1])).toHaveLength(1);
        }
    });

    it("should ensure that secret child should be assigned to only one employee", () => {
        for (const row of newSecretSanta) {
            expect(newSecretSanta.filter(element => element[3] ===  row[3])).toHaveLength(1);
        }
    });
});