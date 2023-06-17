import shuffle, { randomNumberRange } from "./shuffle.mjs";
/**
 * @typedef {string} employeeName - Name of the Employee
 * @typedef {string} employeeEmail - Email of the Employee
 * @typedef {string} secretChildName - Name of the Secret child
 * @typedef {string} secretChildEmail - Email of the Secret child
 * @typedef {[employeeName, employeeEmail, secretChildName, secretChildEmail]} SecreteChildRow
 */

/**
 * @description Assigns secret santa to all employees
 * @param {import("./libs/csv-utils.mjs").ParsedRows} employeeList - List of current year employees
 * @param {SecreteChildRow} previousYearSecretSanta - Previous year secret santa
 * @returns {SecreteChildRow}
 */
export function assignSecretSantaV1(employeeList, previousYearSecretSanta) {
    const shuffledEmployeeList = shuffle(employeeList);
    if (Array.isArray(previousYearSecretSanta) && previousYearSecretSanta.length > 0) {
        // Loop through the shuffled employee list and check if the previous year's Secret Santa for an employee has a higher index in the array. 
        // If it does, swap their indices.
        for (let i = 0; i < shuffledEmployeeList.length; i++) {
            const prevYearDetail = previousYearSecretSanta
                .find(employee =>
                    Array.isArray(employee) &&
                    employee[1] &&
                    employee[1] === shuffledEmployeeList[i][1]
                );
            const secretChildIndex = prevYearDetail ? shuffledEmployeeList.findIndex(employee => employee[1] === prevYearDetail[3]) : -1;
            if (secretChildIndex !== -1 && (secretChildIndex - i) === 1) {
                [shuffledEmployeeList[secretChildIndex], shuffledEmployeeList[secretChildIndex + 1]] = [shuffledEmployeeList[secretChildIndex + 1], shuffledEmployeeList[secretChildIndex]];
            }
            if (i === shuffledEmployeeList.length - 1 && prevYearDetail[3] === shuffledEmployeeList[0][1]) {
                [shuffledEmployeeList[i], shuffledEmployeeList[shuffledEmployeeList.length - 1]] = [shuffledEmployeeList[shuffledEmployeeList.length - 1], shuffledEmployeeList[i]];
            }
        }

    }
    const secretSantaList = [];
    for (let i = 0; i < shuffledEmployeeList.length; i++) {
        secretSantaList.push([
            shuffledEmployeeList[i][0],
            shuffledEmployeeList[i][1],
            // shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][0],
            // shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][1]
            shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][0],
            shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][1]
        ]);
    }
    return secretSantaList;
}

/**
 * @description Assigns secret santa to all employees
 * @param {import("./libs/csv-utils.mjs").ParsedRows} employeeList - List of current year employees
 * @param {SecreteChildRow} previousYearSecretSanta - Previous year secret santa
 * @returns {SecreteChildRow}
 */
export function assignSecretSantaV2(employeeList, previousYearSecretSanta) {
    const shuffledEmployeeList = shuffle(employeeList);
    if (Array.isArray(previousYearSecretSanta) && previousYearSecretSanta.length > 0) {
        // Loop through the shuffled employee list and check if the previous year's Secret Santa for an employee has a higher index in the array. 
        // If it does, swap their indices.
        let i = 0;
        while (i < shuffledEmployeeList.length) {
            const prevYearDetail = previousYearSecretSanta
                .find(employee =>
                    Array.isArray(employee) &&
                    employee[1] &&
                    employee[1] === shuffledEmployeeList[i][1]
                );
            const nextIndex = i === shuffledEmployeeList.length - 1 ? 0 : i + 1;
            if (prevYearDetail[3] && prevYearDetail[3] === shuffledEmployeeList[nextIndex][1]) {
                [shuffledEmployeeList[nextIndex], shuffledEmployeeList[nextIndex + 1]] = [shuffledEmployeeList[nextIndex + 1], shuffledEmployeeList[nextIndex]];
                continue;
            }
            i++;
        }

    }
    const secretSantaList = [];
    for (let i = 0; i < shuffledEmployeeList.length; i++) {
        secretSantaList.push([
            shuffledEmployeeList[i][0],
            shuffledEmployeeList[i][1],
            // shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][0],
            // shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][1]
            shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][0],
            shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][1]
        ]);
    }
    return secretSantaList;
}

/**
 * @description Assigns secret santa to all employees
 * @param {import("./libs/csv-utils.mjs").ParsedRows} employees - List of current year employees
 * @param {SecreteChildRow} previousYearSecretSanta - Previous year secret santa
 * @returns {SecreteChildRow}
 */
export function assignSecretSantaV3(employees, previousYearSecretSanta) {
    const employeeList = shuffle(employees);
    const secretSantaList = [];
    let availableEmployees = [...employeeList];
    for (let i = 0; i < employeeList.length; i++) {
        const prevYearDetails = previousYearSecretSanta
            .find(row =>
                Array.isArray(row) &&
                row[1] &&
                employeeList[i][1] === row[1]
            );
        let selectedChild = null;
        if (prevYearDetails) {
            selectedChild = availableEmployees
                .filter(availableEmployee =>
                    availableEmployee[1] !== prevYearDetails[3] &&
                    availableEmployee[1] !== employeeList[i][1]
                )[0];
        } else {
            selectedChild = availableEmployees
                .filter(availableEmployee =>
                    availableEmployee[1] !== employeeList[i][1]
                )[0];
        }
        availableEmployees = availableEmployees.filter(availableEmployee => selectedChild[1] !== availableEmployee[1]);
        secretSantaList.push(employeeList[i].concat(selectedChild));
    }
    return secretSantaList;
}

/**
 * @description Assigns secret santa to all employees
 * @param {import("./libs/csv-utils.mjs").ParsedRows} employees - List of current year employees
 * @param {SecreteChildRow} previousYearSecretSanta - Previous year secret santa
 * @returns {SecreteChildRow}
 */
export function assignSecretSantaV4(employees, previousYearSecretSanta) {
    const shuffledEmployeeList = shuffle(employees);
    if (Array.isArray(previousYearSecretSanta)) {
        for (let i = 0; i < shuffledEmployeeList.length - 1; i++) {
            const previousYearDetail = previousYearSecretSanta.find(employee => employee[1] === shuffledEmployeeList[i][1]);
            if (Array.isArray(previousYearDetail)) {
                if (i === 0 && previousYearDetail[3] === shuffledEmployeeList[shuffledEmployeeList.length - 1][1]) {
                    [shuffledEmployeeList[i], shuffledEmployeeList[shuffledEmployeeList.length - 1]] = [shuffledEmployeeList[shuffledEmployeeList.length - 1], shuffledEmployeeList[i]];
                } else if (previousYearDetail[3] === shuffledEmployeeList[i + 1][1]) {
                    [shuffledEmployeeList[i], shuffledEmployeeList[i + 1]] = [shuffledEmployeeList[i + 1], shuffledEmployeeList[i]];
                }
            }
        }
    } else employeeList = [...shuffledEmployeeList];
    const secretSantaList = [];
    for (let i = 0; i < shuffledEmployeeList.length; i++) {
        secretSantaList.push([
            shuffledEmployeeList[i][0],
            shuffledEmployeeList[i][1],
            shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][0],
            shuffledEmployeeList[i === shuffledEmployeeList.length - 1 ? 0 : i + 1][1]
        ]);
    }
    return secretSantaList;
}

/**
 * @description Assigns secret santa to all employees
 * @param {import("./libs/csv-utils.mjs").ParsedRows} employees - List of current year employees
 * @param {SecreteChildRow} previousYearSecretSanta - Previous year secret santa
 * @returns {SecreteChildRow}
 */
export function assignSecretSanta(employees, previousYearSecretSanta) {
    let shuffledEmployeeList = shuffle(employees);
    const secretSantaList = [];
    for (let i = 0; i < employees.length - 1; i++) {
        const employee = employees[i];
        const secretChild = getValidSecretChild(employee, shuffledEmployeeList, previousYearSecretSanta);
        if (!secretChild) return assignSecretSanta(employees, previousYearSecretSanta);
        secretSantaList.push(employee.concat(secretChild));
        shuffledEmployeeList = shuffledEmployeeList.filter(emp => emp[1] !== secretChild[1]);
    }
    return secretSantaList;
}

/**
 * @description Get valid secret child
 * @param {Array<string>} employee - current employee 
 * @param {Array<Array<string>>} employees - Available employees 
 * @param {Array<SecreteChildRow>} previousYearSecretSanta - Previous year secret santa list 
 * @returns {Array<string>|null}
 */
function getValidSecretChild(employee, employees, previousYearSecretSanta) {
    const previousYearDetails = previousYearSecretSanta.find(emp => emp[1] === employee[1]);
    const validEmployees = shuffle(employees.filter(emp => emp[1] !== previousYearDetails[3]));
    if (Array.isArray(validEmployees) && validEmployees.length > 0) return validEmployees[0];
    return null;
}