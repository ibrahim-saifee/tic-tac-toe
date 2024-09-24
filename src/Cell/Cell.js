import { useState } from 'react';
import './Cell.css'

function Cell(props) {
  const { cellNo, cellMark, onChange: emitChange, cellRef, isWinningCell } = props;
  const [mark, setMark] = useState(cellMark);

  if (cellRef) {
    cellRef.triggerMark = (_mark) => updateCellMark(_mark, false);
  }

  const updateCellMark = (_mark, isUserClick = true) => {
    if (mark) return; // already marked

    setMark(_mark);
    emitChange && emitChange(cellNo, _mark, isUserClick);
  }

  return (
    <div className={`cell ${mark && "filled" } ${isWinningCell && "cell-green"}`} onClick={() => updateCellMark("X", true)}>
      <span className="cell-text center"> { mark } </span>
    </div>
  );
}

export default Cell;
