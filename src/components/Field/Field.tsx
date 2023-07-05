import FieldCell from "../FieldCell/FieldCell";
import { useField, useStatus, useGameActions } from "@/stores/game";
import classes from "./Field.module.scss";
import { FieldCellCoordinates, GameCondition } from "@/types/gameTypes";

function Field() {
  const field = useField();
  const status = useStatus();
  const { populateGame, openCell, highlightNeighbors, toggleLabel } = useGameActions();

  function handleLeftClick(x: number, y: number) {
    const coordinates: FieldCellCoordinates = { x, y };

    // We want the player's first click to always be on a blank cell, so we populate field after first click
    if (status === GameCondition.Pending) {
      populateGame(coordinates);
    }

    openCell(coordinates);
  }

  function handleMiddleClick(x: number, y: number) {
    const coordinates: FieldCellCoordinates = { x, y };

    highlightNeighbors(coordinates);
  }

  function handleRightClick(x: number, y: number) {
    const coordinates: FieldCellCoordinates = { x, y };

    toggleLabel(coordinates);
  }

  if (!field) return <></>;

  return (
    <div className={classes.field}>
      {field.map((column, columnIndex) => (
        <div key={columnIndex} className={classes.fieldRow}>
          {column.map((cell, cellIndex) => (
            <FieldCell
              fieldCell={cell}
              key={cellIndex}
              leftClick={() => handleLeftClick(columnIndex, cellIndex)}
              middleClick={() => handleMiddleClick(columnIndex, cellIndex)}
              rightClick={() => handleRightClick(columnIndex, cellIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Field;
