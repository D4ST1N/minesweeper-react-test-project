import { ActionProps } from "@/types/storeTypes";
import { GameState } from "../";
import { FieldCellCoordinates, GameCondition } from "@/types/gameTypes";
import { populateField } from "@/helpers/gameHelpers";

export default function populateGame({ get, set }: ActionProps<GameState>, cellCoordinates: FieldCellCoordinates) {
  if (!get().field) return;

  set((state) => {
    state.status = GameCondition.Playing;
    state.field = populateField(
      get().field!,
      get().selectedConfiguration.numberOfMines,
      cellCoordinates,
    );
  });
}
