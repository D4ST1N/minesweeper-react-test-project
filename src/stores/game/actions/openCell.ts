import { ActionProps } from "@/types/storeTypes";
import { GameState } from "../";
import { FieldCell, FieldCellCoordinates, FieldCellLabel, GameCondition } from "@/types/gameTypes";
import { getCellNeighbors, timeout } from "@/helpers/gameHelpers";

export default async function openCell({ get, set }: ActionProps<GameState>, cellCoordinates: FieldCellCoordinates) {
  if (!get().field || get().getters.interactionNotAllowed) return;

  const cell: FieldCell = get().field![cellCoordinates.x][cellCoordinates.y];

  if (!cell.isHidden || cell.label !== FieldCellLabel.None) return;

  // Open cell
  set((state) => {
    state.field![cellCoordinates.x][cellCoordinates.y].isHidden = false;
  });

  // If cell with bomb - game is over
  if (cell.isPlanted) {
    set((state) => {
      state.status = GameCondition.Defeat;
    });

    return;
  }

  // Open all cells nearby if there no mines
  if (cell.numberOfMinesNearby === 0) {
    const neighbors = getCellNeighbors(cellCoordinates, get().field!);

    // Add ripple effect
    await timeout(25);
    neighbors.forEach((neighbor) => {
      get().actions.openCell(neighbor.coordinates);
    });
  }

  get().actions.checkVictory();
}
