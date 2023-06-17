import { parseCSV, formateDataToCSVString } from "../../scr/libs/csv-utils.mjs";

const csvStr = "name\tage\nJohn\t25\nMary\t23";
const parsedCSV = [
    ["name", "age"],
    ["John", "25"],
    ["Mary", "23"]
];

describe("Parse CSV", () => {
    it("should parse the csv string", () => {
        const data = parseCSV(csvStr);

        expect(data).toHaveLength(3);
        expect(data).toEqual(parsedCSV);
    });

    it("should throw an error for invalid value", () => {
        expect(() => parseCSV(null)).toThrow(Error);
    });
});

describe("Formate data to CSV string", () => {
    it("should stringify data into correct csv string", () => {
        const str = formateDataToCSVString(parsedCSV, "\t");
        expect(str).toEqual(csvStr);
    });

    it("should throw an error for invalid value", () => {
        expect(() => formateDataToCSVString(null)).toThrow(Error);
    });
});