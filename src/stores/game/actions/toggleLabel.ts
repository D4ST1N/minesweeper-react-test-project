import { ActionProps } from "@/types/storeTypes";
import { GameState } from "../";
import { FieldCell, FieldCellCoordinates, FieldCellLabel } from "@/types/gameTypes";

export default function toggleLabel({ get, set }: ActionProps<GameState>, cellCoordinates: FieldCellCoordinates) {
  if (!get().field || get().getters.interactionNotAllowed) return;

  const cell: FieldCell = get().field![cellCoordinates.x][cellCoordinates.y];

  if (!cell.isHidden) return;

  // Toggle cell label None -> Flag -> Qestion -> None
  if (cell.label === FieldCellLabel.None) {
    set((state) => {
      state.field![cellCoordinates.x][cellCoordinates.y].label = FieldCellLabel.Flag;
      state.bombsCount -= 1;
    });
  } else if (cell.label === FieldCellLabel.Flag) {
    set((state) => {
      state.field![cellCoordinates.x][cellCoordinates.y].label = FieldCellLabel.Question;
      state.bombsCount += 1;
    });
  } else {
    set((state) => {
      state.field![cellCoordinates.x][cellCoordinates.y].label = FieldCellLabel.None;
    });
  }
}
