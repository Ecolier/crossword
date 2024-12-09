export type Cell = {
  letter: string;
  x: number;
  y: number;
};

export type Entry = {
  solution: string;
  x: number;
  y: number;
  cells: [cell: Cell, index: number][];
  horizontal: boolean;
};

export function crossword(dictionary: string[], colSize: number) {
  let exportEntries: Entry[] = [];

  let recordedLength = 0;
  let gridSize = Math.pow(colSize, 2);

  let entryIndex = 0;

  let links: { [entry: number]: [letter: string, index: number][] } = {};
  let linkIndex = 0;

  let i = 0;

  while (true) {
    const parentEntry = exportEntries[entryIndex];

    // Filter out existing words
    let filteredDictionary = dictionary.filter(
      (word) => !exportEntries.map(({ solution }) => solution).includes(word)
    );

    const link = links[entryIndex]?.[linkIndex];
    if (link) {
      const [letter] = link;
      filteredDictionary = filteredDictionary.filter((word) =>
        word.includes(letter)
      );
      ++linkIndex;
      // Out of words including filter, dictionary may be too small
      if (filteredDictionary.length === 0) {
        continue;
      }
    }

    // Pick a random word from the filtered dictionary
    const constrainedWord =
      filteredDictionary[Math.floor(Math.random() * filteredDictionary.length)];

    // Stop if we hit the maximum grid size
    if (recordedLength + constrainedWord.length > gridSize) {
      break;
    }

    let offset = 0;
    let horizontal = true;
    let x = 0;
    let y = 0;

    if (link) {
      const [letter, index] = link;
      offset = constrainedWord.indexOf(letter);
      horizontal = !parentEntry.horizontal;
      if (!horizontal) {
        x = parentEntry.x + index;
        y = parentEntry.y - offset;
      } else {
        x = parentEntry.x - offset;
        y = parentEntry.y + index;
      }
    }

    const newEntry = {
      solution: constrainedWord,
      x,
      y,
      horizontal,
    } as Entry;

    [...constrainedWord].forEach((char, index, arr) => {
      // We need at least one anchor, no word can be isolated
      if (arr[index + 1] === undefined || Math.random() < 0.5) {
        links[i] = [...(links[i] ? links[i] : []), [char, index]];
      }
      newEntry.cells = [
        ...(newEntry.cells ? newEntry.cells : []),
        [
          {
            letter: char,
            x: horizontal ? newEntry.x + index : newEntry.x,
            y: horizontal ? newEntry.y : newEntry.y + index,
          },
          index,
        ],
      ];
    });

    recordedLength += constrainedWord.length;
    exportEntries.push(newEntry);

    if (links[entryIndex][linkIndex] === undefined) {
      ++entryIndex;
      linkIndex = 0;
    }

    ++i;
  }

  return exportEntries;
}
