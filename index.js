import path from "path";
import { __dirname } from "./constants.mjs";
import assignSecretSanta from "./scr/index.mjs";

const employeeListFile = path.join(__dirname, "files", "Employee-List.csv");
const previousSecretSantaFile = path.join(__dirname, "files", "Secret-Santa-Game-Result-2023.csv");

assignSecretSanta(employeeListFile, previousSecretSantaFile);
