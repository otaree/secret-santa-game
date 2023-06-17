import {
    readCSV,
    writeCSV,
    formateDataToCSVString
} from "./libs/csv-utils.mjs";
import { assignSecretSanta } from "./libs/secret-santa-assignment.mjs";

/**
 * @description Assigns a secret to each employee and saves the assignments in a CSV file.
 * @param {string} employeeFilename - Path to employee list csv file.
 * @param {string} previousSecretSantaFilename - Path to previous year secret santa csv file. 
 */
export default async function assign(employeeFilename, previousSecretSantaFilename) {
    try {
        const employeeList = await readCSV(employeeFilename);
        const previousYearSecretSanta = await readCSV(previousSecretSantaFilename);
        const resultCSVFilename = `secret-santa-${new Date().getFullYear()}.csv`;
        await writeCSV(
            formateDataToCSVString([
                ["Employee_Name", "Employee_EmailID", "Secret_Child_Name", "Secret_Child_EmailID"],
                ...assignSecretSanta(
                    employeeList.filter(element => String(element[0]).toLowerCase() !== "employee_name"),
                    previousYearSecretSanta.filter(element => String(element[0]).toLowerCase() !== "employee_name"),
                )
            ]),
            resultCSVFilename
        );
        console.log(`Successfully assign Secret Santa and save it to a file named ${resultCSVFilename}`);
    } catch (error) {
        console.error("Error while assigning secret santa\n", error);
    }
}