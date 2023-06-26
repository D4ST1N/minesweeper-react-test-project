import Icon from "@mdi/react";
import { MouseEvent } from "react";
import { mdiMine } from "@mdi/js";
import { FieldCell, FieldCellLabel } from "@/types/gameTypes";
import styles from "./FieldCell.module.scss";
import { classNames } from "@/helpers/utils";
import FieldLabelIcon from "../FieldLabelIcon/FieldLabelIcon";
import FieldCellCount from "../FieldCellCount/FieldCellCount";

interface FieldCellComponentProps {
  fieldCell: FieldCell;
  leftClick: () => void;
  middleClick: () => void;
  rightClick: () => void;
}

export default function FieldCellComponent({
  fieldCell,
  leftClick,
  middleClick,
  rightClick,
}: FieldCellComponentProps) {
  const cellClasses = classNames({
    [styles.cell]: true,
    [styles.opened]: !fieldCell.isHidden,
    [styles.mine]: fieldCell.isPlanted,
    [styles.flag]: fieldCell.label === FieldCellLabel.Flag,
    [styles.question]: fieldCell.label === FieldCellLabel.Question,
    [styles.highlight]: fieldCell.isHighlighted,
  });

  const cellContent = () => {
    if (fieldCell.label !== FieldCellLabel.None) {
      return <FieldLabelIcon label={fieldCell.label} />;
    } else if (!fieldCell.isHidden && fieldCell.isPlanted) {
      return <Icon path={mdiMine} size={1} />;
    } else if (!fieldCell.isHidden && !fieldCell.isPlanted) {
      return <FieldCellCount numberOfMinesNearby={fieldCell.numberOfMinesNearby} />;
    } else {
      return <span></span>;
    }
  };

  function handleMouseEvent(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    switch (e.button) {
      case 0: {
        leftClick();
        break;
      }
      case 1: {
        middleClick();
        break;
      }
      case 2: {
        rightClick();
        break;
      }
      default: {
        break;
      }
    }
  }

  return (
    <>
      <button
        onMouseDown={handleMouseEvent}
        onContextMenu={(e) => e.preventDefault()}
        className={cellClasses}
      >
        {cellContent()}
      </button>
    </>
  );
}
