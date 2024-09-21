import { useState, useRef } from "react";
import { nextBotMove, checkForWinner } from "../bot/bot";
import "./Grid.css";
import Cell from "../Cell/Cell";

function Grid() {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];
  const [winner, setWinner] = useState("");

  const cellData = useRef(Array.from({ length: 9 }, (_, i) => "")).current;

  const cellRefsArr = useRef([]);
  const cellRefs = cellRefsArr.current;
  cellData.forEach((_, i) => (cellRefs[i] = {}));

  const handleCellChange = (cellNo, mark, isUserClick) => {
    cellData[cellNo] = mark;

    const _winner = checkForWinner(cellData);
    if (_winner) {
      setWinner(`Winner is ${_winner}`);
      return;
    }

    const isDraw = cellData.every((i) => i);
    if (isDraw) {
      setWinner("Draw");
      return;
    }

    if (isUserClick) {
      const [botPosition, botMark] = nextBotMove(cellData);

      cellRefs[botPosition].triggerMark &&
        cellRefs[botPosition].triggerMark(botMark);
    }
  };

  const cells = cellData.map((mark, i) => (
    <Cell
      key={i}
      cellNo={i}
      cellMark={mark}
      onChange={handleCellChange}
      cellRef={cellRefs[i]}
    />
  ));

  return (
    <div className="main-body center">
      <div className="grid-container">
        <div className={`grid center ${winner && "disabled"}`}>
          {rows.map((row) => (
            <div className="row">{cols.map((col) => cells[3 * row + col])}</div>
          ))}
        </div>
      </div>
      <WinnerLabel winner={winner} />
      <ResetButton show={!!winner} />
    </div>
  );
}

const WinnerLabel = (props) => {
  const { winner } = props;
  if (winner) {
    return (
      <div className="winner-label-container">
        <span className="winner-label center"> {winner} </span>
      </div>
    );
  }
}

const ResetButton = (props) => {
  const { show } = props;
  const refreshWindow = () => window.location.reload();
  if (show) {
    return (
      <div className="btn-container">
        <button className="center btn" onClick={refreshWindow}> Reset ↺ </button>
      </div>
    )
  }
}

export default Grid;
