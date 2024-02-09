import React from "react";
import Image from "next/image";
import tryagainlogo from "~~/assets/img/try-again.gif";
import { Board } from "~~/helper";

const GameOverlay = ({ OnRestart, board }: { OnRestart: () => void; board: any }) => {
  if (board.hasWon()) {
    return <div className="tile2048"></div>;
  } else if (board.hasLost()) {
    return (
      <div className="gameOver" onClick={OnRestart}>
        <Image src={tryagainlogo} alt="tryagainlogo" className="w-full h-full cursor-pointer" />
      </div>
    );
  }
  return null;
};

export default GameOverlay;
