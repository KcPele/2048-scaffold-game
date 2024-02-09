"use client";

import React from "react";
import Cell from "./Cell";
import GameOverlay from "./GameOverlay";
import TilesView from "./TilesView";
import { Board } from "~~/helper";
import useEvent from "~~/hooks/game/useEvent";

const BoardView = () => {
  const [board, setBoard] = React.useState(new Board());
  const handleKeyDown = (event: KeyboardEvent) => {
    if (board.hasWon()) {
      return;
    }

    let direction: number | null = null;

    switch (event.key) {
      case "ArrowLeft":
        direction = 0;
        break;
      case "ArrowUp":
        direction = 1;
        break;
      case "ArrowRight":
        direction = 2;
        break;
      case "ArrowDown":
        direction = 3;
        break;
    }

    if (direction !== null) {
      let boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };
  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="grid grid-cols-4 ">
        {row.map((cell, columnIndex) => {
          return <Cell key={rowIndex * board.size + columnIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter(tile => tile.value !== 0)
    .map((tile, index) => {
      return <TilesView key={index} tile={tile} />;
    });
  const resetGame = () => {
    setBoard(new Board());
  };
  return (
    <div className="mt-20">
      <div className="max-w-[440px] mx-auto flex justify-between">
        <button
          onClick={resetGame}
          className="rounded-md bg-cus-purple-100 px-4 py-1 hover:bg-red-400 hover:text-white text-white/50"
        >
          New game
        </button>

        <div className=" bg-cus-purple-100 rounded-md text-white px-2 py-1">
          <div className="score-header">Score:</div>
          <div> {board.score}</div>
        </div>
      </div>
      <div className="relative rounded-md  h-[440px] mx-auto max-w-[440px] w-full">
        {cells}
        <div className="grid grid-cols-4 gap-1 "> {tiles}</div>
        <GameOverlay OnRestart={resetGame} board={board} />
      </div>
    </div>
  );
};

export default BoardView;
