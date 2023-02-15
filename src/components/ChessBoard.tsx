import React, { useState, useEffect } from "react";

type BoxIndex = {
  outerIndex: number;
  innerIndex: number;
};

export default function ChessBoard(): JSX.Element {
  const [clickedBox, setClickedBox] = useState<BoxIndex | undefined>();
  const [clickedBoxDiagonals, setClickedBoxDiagonals] = useState<BoxIndex[]>([]);
  const chessRows = [0, 1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    if (clickedBox) {
      setClickedBoxDiagonals(getPossibleDiagonalsOfSelectedBox());
    }
  }, [clickedBox]);

  useEffect(() => {
    console.log(clickedBoxDiagonals);
  }, [clickedBoxDiagonals]);

  const getPossibleDiagonalsOfSelectedBox = (): BoxIndex[] => {
    const leftUp = getDiagonalIndexes("leftUp", {
      outerIndex: 0,
      innerIndex: 0,
    });
    const rightUp = getDiagonalIndexes("rightUp", {
      outerIndex: 0,
      innerIndex: 7,
    });
    const rightDown = getDiagonalIndexes("rightDown", {
      outerIndex: 7,
      innerIndex: 7,
    });
    const leftDown = getDiagonalIndexes("leftDown", {
      outerIndex: 7,
      innerIndex: 0,
    });
    return [...leftUp, ...rightUp, ...rightDown, ...leftDown];
  };

  const getDiagonalIndexes = (sign: string, limit: BoxIndex): BoxIndex[] => {
    const box: BoxIndex[] = [];
    let isLoopRunning = true;
    let outerIndex = clickedBox!.outerIndex;
    let innerIndex = clickedBox!.innerIndex;
    while (isLoopRunning) {
      if (sign === "leftUp") {
        if (
          outerIndex - 1 >= limit.outerIndex &&
          innerIndex - 1 >= limit.innerIndex
        ) {
          box.push({ outerIndex: outerIndex - 1, innerIndex: innerIndex - 1 });
          outerIndex--;
          innerIndex--;
        } else {
          isLoopRunning = false;
        }
      } else if (sign === "rightUp") {
        if (
          outerIndex - 1 >= limit.outerIndex &&
          innerIndex + 1 <= limit.innerIndex
        ) {
          box.push({ outerIndex: outerIndex - 1, innerIndex: innerIndex + 1 });
          outerIndex--;
          innerIndex++;
        } else {
          isLoopRunning = false;
        }
      } else if (sign === "rightDown") {
        if (
          outerIndex + 1 <= limit.outerIndex &&
          innerIndex + 1 <= limit.innerIndex
        ) {
          box.push({ outerIndex: outerIndex + 1, innerIndex: innerIndex + 1 });
          outerIndex++;
          innerIndex++;
        } else {
          isLoopRunning = false;
        }
      } else if (sign === "leftDown") {
        if (
          outerIndex + 1 <= limit.outerIndex &&
          innerIndex - 1 >= limit.innerIndex
        ) {
          box.push({ outerIndex: outerIndex + 1, innerIndex: innerIndex - 1 });
          outerIndex++;
          innerIndex--;
        } else {
          isLoopRunning = false;
        }
      }
    }
    return box;
  };

  const handleBoxClick = (outerIndex: number, innerIndex: number): void => {
    setClickedBox({ outerIndex, innerIndex });
  };

  const checkSelectedBox = (outerIndex: number, innerIndex: number) => {
    if (clickedBox) {
      return (
        (clickedBox.outerIndex === outerIndex &&
          clickedBox.innerIndex === innerIndex) ||
        clickedBoxDiagonals.find(
          (obj) =>
            obj.outerIndex === outerIndex && obj.innerIndex === innerIndex
        )
      );
    }
    return false;
  };

  return (
    <div className="chess-board">
      {chessRows.map((row, index) => (
        <div className="d-flex" key={index}>
          {chessRows.map((innerRow, innerIndex) => (
            <div
              key={innerIndex}
              className={`box ${
                checkSelectedBox(index, innerIndex) ? "highlight" : ""
              } ${index % 2 === 0 ? "even" : "odd"}`}
              onClick={() => handleBoxClick(index, innerIndex)}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
