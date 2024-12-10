import { crossword } from "#crossword.js";
import dictionary from "#dictionary.json" with { type: "json" };
import { sheets } from "./sheets.js";

console.log(sheets(crossword(dictionary, 10)));
