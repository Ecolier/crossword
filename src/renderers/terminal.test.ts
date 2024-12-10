import { crossword } from "#crossword.js";
import dictionary from "#dictionary.json" with { type: "json" };
import { terminal } from "./terminal.js";

console.log(terminal(crossword(dictionary, 10)));
