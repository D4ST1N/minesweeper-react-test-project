import { ActionProps } from "@/types/storeTypes";
import { GameState } from "../";
import { GameCondition } from "@/types/gameTypes";

export default function checkVictory({ get, set }: ActionProps<GameState>) {
  if (!get().field) return;

  const allNotMinedCellsOpened = get().field!.every((column) =>
    column.every((cell) => (cell.isPlanted ? cell.isPlanted : !cell.isHidden)),
  );

  if (allNotMinedCellsOpened) {
    set((state) => {
      state.status = GameCondition.Victory;
    });
  }
}
