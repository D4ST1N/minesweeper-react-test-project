import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { FieldCellCoordinates, DefaultFieldSize, GameFieldOptions, GameCondition, GameField } from "@/types/gameTypes";
import { defaultGameConfiguartions } from "@/helpers/gameEntities";
import startNewGame from "./actions/startNewGame";
import endGame from "./actions/endGame";
import populateGame from "./actions/populateGame";
import openCell from "./actions/openCell";
import toggleLabel from "./actions/toggleLabel";
import highlightNeighbors from "./actions/highlightNeighbors";
import checkVictory from "./actions/checkVictory";

export interface GameState {
  field: GameField | null;
  selectedConfiguration: GameFieldOptions;
  bombsCount: number;
  status: GameCondition;
  getters: {
    interactionNotAllowed: boolean;
  };
  actions: {
    startNewGame: (configuration: GameFieldOptions) => void;
    endGame: () => void;
    populateGame: (cellCoordinates: FieldCellCoordinates) => void;
    openCell: (cellCoordinates: FieldCellCoordinates) => void;
    toggleLabel: (cellCoordinates: FieldCellCoordinates) => void;
    highlightNeighbors: (cellCoordinates: FieldCellCoordinates) => void;
    checkVictory: () => void;
  };
}

const useGameStore = create<GameState>()(
  immer((set, get) => ({
    field: null,
    selectedConfiguration: defaultGameConfiguartions[DefaultFieldSize.Small],
    bombsCount: 0,
    status: GameCondition.Pending,

    getters: {
      get interactionNotAllowed() { return get().status === GameCondition.Victory || get().status === GameCondition.Defeat },
    },

    actions: {
      startNewGame: (configuration: GameFieldOptions) => startNewGame({ get, set }, configuration),
      endGame: () => endGame({ get, set }),
      populateGame: (cellCoordinates: FieldCellCoordinates) => populateGame({ get, set }, cellCoordinates),
      openCell: async (cellCoordinates: FieldCellCoordinates) => await openCell({ get, set }, cellCoordinates),
      toggleLabel: (cellCoordinates: FieldCellCoordinates) => toggleLabel({ get, set }, cellCoordinates),
      highlightNeighbors: async (cellCoordinates: FieldCellCoordinates) => await highlightNeighbors({ get, set }, cellCoordinates),
      checkVictory: () => checkVictory({ get, set }),
    }
  }))
);

export const useField = () => useGameStore((state) => state.field);
export const useSelectedConfiguration = () => useGameStore((state) => state.selectedConfiguration);
export const useBombsCount = () => useGameStore((state) => state.bombsCount);
export const useStatus = () => useGameStore((state) => state.status);
export const useGameActions = () => useGameStore((state) => state.actions);
export const useGameGetters = () => useGameStore((state) => state.getters);
