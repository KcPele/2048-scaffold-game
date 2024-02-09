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
      <div key={rowIndex} className="grid grid-cols-4 place-items-center">
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
    <div className=" ">
      <div className="max-w-[440px] mx-auto flex justify-between p-1">
        <button
          onClick={resetGame}
          className="rounded-md text-2xl text-white/50 px-5 py-2 bg-cus-purple-100 hover:bg-red-500 hover:text-white"
        >
          New game
        </button>

        <div className="flex  bg-cus-purple-100 text-white/50 py-1 px-4 rounded-md w-fit">
          <p className="">Score:</p>
          <p> {board.score}</p>
        </div>
      </div>
      <div className="relative rounded-md p-1 h-[440px] mx-auto max-w-[440px] w-full">
        {cells}
        <div className="grid grid-cols-4 place-items-center"> {tiles}</div>
        <GameOverlay OnRestart={resetGame} board={board} />
      </div>
    </div>
  );
};

export default BoardView;
