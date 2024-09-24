const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const isSet = (n) => n || n === 0; // consider 0 as true

export const nextBotMove = (cellData) => {
  const botWinningPosition = findBotWinningPosition(cellData);
  if (isSet(botWinningPosition)) return [botWinningPosition, "O"];

  const blockingPosition = findOpponentBlockingPosition(cellData);
  if (isSet(blockingPosition)) return [blockingPosition, "O"];

  return [randomMove(cellData), "O"];
};

export const checkForWinner = (cellData) => {
  const matchWinningPattern = (a, b, c) =>
    cellData[a] &&
    cellData[b] &&
    cellData[c] &&
    cellData[a] === cellData[b] &&
    cellData[b] === cellData[c];

  for (let pattern of winningPatterns) {
    if (matchWinningPattern(...pattern)) {
      return {
        winner: cellData[pattern[0]],
        winningBlocks: pattern,
      };
    }
  }

  return { winner: false };
};

const findBotWinningPosition = (cellData) => {
  for (let pattern of winningPatterns) {
    const isBotWinning = pattern.filter((i) => cellData[i] === "O").length > 1;

    if (isBotWinning) return pattern.find((i) => !cellData[i]);
  }
}

const findOpponentBlockingPosition = (cellData) => {
  const findSingleMissingField = (a, b, c) => {
    const isAlreadyBlocked = [a, b, c].some((i) => cellData[i] === "O");
    if (isAlreadyBlocked) return;

    const isSingleMissingField =
      [a, b, c].filter((i) => !cellData[i]).length === 1;
    if (!isSingleMissingField) return;

    return [a, b, c].find((i) => !cellData[i]);
  };

  for (let pattern of winningPatterns) {
    const missingField = findSingleMissingField(...pattern);
    if (isSet(missingField)) return missingField;
  }
};

const randomMove = (cellData) => {
  const randomNextMove = () => Math.floor(Math.random() * 8);

  let randomPosition = randomNextMove();
  while (cellData[randomPosition] && cellData.some((i) => !i)) {
    randomPosition = randomNextMove();
  }

  return randomPosition;
};
