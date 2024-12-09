import { crossword } from "./crossword";
import dictionary from "./dictionary.json";
import { sheets } from "./sheets";

sheets(crossword(dictionary, 10)).forEach((row, index) => {
    console.log(index)
});
