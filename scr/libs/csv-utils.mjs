import fsPromises from "fs/promises";

/**
 * @typedef {Array<Array<string>>} ParsedRows
 */

// Possible separators for CSV file.
const separators = [',', ';', '|', '\t'];
/**
 * @description Parse the CSV string
 * @param {string} data - A String value 
 * @returns {ParsedRows} Rows of cells
 */
export function parseCSV(data) {
    if (typeof data !== "string") throw new Error(`"data" has to be string`);
    const rows = data.split("\n");
    // Default separator of CSV is ","
    let separator = ",";
    // Detect the separator in the first row from a list of separators.
    const separatorIndex = separators.findIndex(sep => rows[0].indexOf(sep) !== -1);
    if (separatorIndex !== -1) separator = separators[separatorIndex];
    const parsedRows = [];
    for (const row of rows) {
        parsedRows.push(row.split(separator));
    }
    return parsedRows;
}

/**
 * @description A utility function to read CSV file
 * @param {string} filename - Path to the CSV file. 
 * @param {string} [encoding=utf-8] - Parsed data encoding
 * @returns {ParsedRows|Error} The parsed rows or an Error
 */
export function readCSV(filename, encoding = "utf-8") {
    // Validate whether the provided file type is correct.
    if (typeof filename !== "string" || !filename.toLowerCase().endsWith(".csv")) return Promise.reject(`Not a valid CSV file${typeof filename === "string" ? ` "${filename}"` : ""}`);
    return fsPromises.readFile(filename, encoding)
        .then(parseCSV)
        .catch(err => Promise.reject(err.message));
}

/**
 * @description formate data into CSV string
 * @param {ParsedRows} data - parsed rows
 * @param {string} [separator="\t"] - separator for CSV file
 * @returns {string} return CSV formatted string
 */
export function formateDataToCSVString(data, separator = "\t") {
    if (!Array.isArray(data) || data.some(row => !Array.isArray(row))) throw new Error("Invalid data");
    return data.map(row => row.join(separator)).join("\n");
}

/**
 * @description write a CSV file
 * @param {string} data - CSV data
 * @param {string} filename - Path to new CSV file
 * @param {string} [encoding=utf-8] - Encoding of file
 */
export function writeCSV(data, filename, encoding = "utf-8") {
    // Validate data
    if (typeof data !== "string") return Promise.reject(`Invalid data`);
    // Validate filename
    if (typeof filename !== "string") return Promise.reject("Please provide a filename");
    if (!filename.toLowerCase().endsWith(".csv")) filename += ".csv";
    return fsPromises.writeFile(filename, data, encoding);
}