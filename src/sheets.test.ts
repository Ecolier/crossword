import { crossword } from "./crossword";
import dictionary from "./dictionary.json";
import { sheets } from "./sheets";

console.log(sheets(crossword(dictionary, 10)));
