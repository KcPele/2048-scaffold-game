import React from "react";
import { Tile } from "~~/helper";

const TilesView = ({ tile }: { tile: Tile }) => {
  // tile
  //   .tile#
  // position_#_#
  // row_from_#_to_#
  //col_from_#_to_#
  //isMoving
  //new
  //merge

  let classArray = ["tile"];
  classArray.push("rounded-md bg-cus-purple-100  text-[#766] max-w-[100px] w-full h-[100px] tile" + tile.value);
  if (!tile.mergedInto) {
    classArray.push(`position_${tile.row}_${tile.column}`);
  }
  if (tile.mergedInto) {
    classArray.push("merged");
  }
  if (tile.isNew()) {
    classArray.push("new");
  }
  if (tile.hasMoved()) {
    classArray.push(`row_from_${tile.fromRow()}_to_${tile.toRow()}`);
    classArray.push(`colum_from_${tile.fromColumn()}_to_${tile.toColumn()}`);
    classArray.push("isMoving");
  }
  let classess = classArray.join(" ");
  return <span className={classess}></span>;
};

export default TilesView;
