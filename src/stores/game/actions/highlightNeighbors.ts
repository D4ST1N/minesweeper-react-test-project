import { ActionProps } from "@/types/storeTypes";
import { GameState } from "../";
import { FieldCell, FieldCellCoordinates, FieldCellLabel } from "@/types/gameTypes";
import { getCellNeighbors, timeout } from "@/helpers/gameHelpers";

export default async function highlightNeighbors({ get, set }: ActionProps<GameState>, cellCoordinates: FieldCellCoordinates) {
  if (!get().field || get().getters.interactionNotAllowed) return;

  const cell: FieldCell = get().field![cellCoordinates.x][cellCoordinates.y];

  if (cell.numberOfMinesNearby === 0) return;

  // Get all hidden nearby cells
  const neighbors = getCellNeighbors(cellCoordinates, get().field!);
  const hiddenNeighbors = neighbors.filter((neighbor) => neighbor.isHidden);

  if (hiddenNeighbors.length === 0) return;

  const labeledNeighbors = hiddenNeighbors.filter(
    (neighbor) => neighbor.label === FieldCellLabel.Flag,
  );

  // Open all nearby cells if all mines flagged
  if (labeledNeighbors.length === cell.numberOfMinesNearby && !cell.isHidden) {
    hiddenNeighbors.forEach((neighbor) => {
      get().actions.openCell(neighbor.coordinates);
    });
  } else {
    // Highlight neighbors
    hiddenNeighbors.forEach((neighbor) => {
      if (neighbor.label !== FieldCellLabel.None || !get().field!) return;

      set((state) => {
        state.field![neighbor.coordinates.x][neighbor.coordinates.y].isHighlighted = true;
      });
    });

    await timeout(250);

    // Remove highlight
    hiddenNeighbors.forEach((neighbor) => {
      if (!get().field) return;

      set((state) => {
        state.field![neighbor.coordinates.x][neighbor.coordinates.y].isHighlighted = false;
      });
    });
  }
}
