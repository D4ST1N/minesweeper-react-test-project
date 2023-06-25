import Icon from "@mdi/react";
import { MouseEvent } from "react";
import { mdiMine, mdiFlag, mdiHelpCircleOutline } from "@mdi/js";
import { FieldCell, FieldCellLabel } from "@/types/gameTypes";
import styles from "./FieldCell.module.scss";
import { classNames } from "@/helpers/utils";

interface Props {
  fieldCell: FieldCell;
  leftClick: () => void;
  middleClick: () => void;
  rightClick: () => void;
}

const minesNumberColorMapping: { [index: number]: string } = {
  0: "#fff",
  1: "#27a15c",
  2: "#27a18f",
  3: "#277ba1",
  4: "#2754a1",
  5: "#4927a1",
  6: "#9227a1",
  7: "#a12772",
  8: "#a12728",
};

export default function FieldCellComponent({
  fieldCell,
  leftClick,
  middleClick,
  rightClick,
}: Props) {
  const cellClasses = classNames({
    [styles.cell]: true,
    [styles.opened]: !fieldCell.isHidden,
    [styles.mine]: fieldCell.isPlanted,
    [styles.flag]: fieldCell.label === FieldCellLabel.Flag,
    [styles.question]: fieldCell.label === FieldCellLabel.Question,
    [styles.highlight]: fieldCell.isHighlighted,
  });

  const cellStyles = () => ({
    color: minesNumberColorMapping[fieldCell.numberOfMinesNearby],
  });

  const cellContent = () => {
    if (fieldCell.label === FieldCellLabel.Flag) {
      return (
        <span>
          <Icon path={mdiFlag} size={1} />
        </span>
      );
    } else if (fieldCell.label === FieldCellLabel.Question) {
      return (
        <span>
          <Icon path={mdiHelpCircleOutline} size={1} />
        </span>
      );
    } else if (fieldCell.isHidden) {
      return <span></span>;
    } else if (!fieldCell.isHidden && fieldCell.isPlanted) {
      return (
        <span>
          <Icon path={mdiMine} size={1} />
        </span>
      );
    } else {
      return (
        <span style={cellStyles()}>
          {fieldCell.numberOfMinesNearby ? fieldCell.numberOfMinesNearby : ""}
        </span>
      );
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
