import { GameFieldOptions } from "@/types/gameTypes";
import { GameState } from "../";
import { ActionProps } from "@/types/storeTypes";
import { generateField } from "@/helpers/gameHelpers";

export default function startNewGame({ set }: ActionProps<GameState>, configuration: GameFieldOptions) {
  set((state) => {
    state.field = generateField(configuration);
    state.selectedConfiguration = configuration;
    state.bombsCount = configuration.numberOfMines;
  });
}
