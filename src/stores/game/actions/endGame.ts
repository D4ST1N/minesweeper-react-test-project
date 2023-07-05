import { defaultGameConfiguartions } from "@/helpers/gameEntities";
import { GameState } from "../";
import { ActionProps } from "@/types/storeTypes";
import { DefaultFieldSize, GameCondition } from "@/types/gameTypes";

export default function endGame({ set }: ActionProps<GameState>) {
  set((state) => {
    state.field = null;
    state.selectedConfiguration = defaultGameConfiguartions[DefaultFieldSize.Small];
    state.bombsCount = 0;
    state.status = GameCondition.Pending;
  });
}
