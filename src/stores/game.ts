import { create } from "zustand";
import { immer } from 'zustand/middleware/immer';
import { FieldCell, FieldCellCoordinates, FieldCellLabel, DefaultFieldSize, GameFieldOptions, GameCondition, GameField } from "@/types/gameTypes";
import { defaultGameConfiguartions } from "@/helpers/gameEntities";
import { generateField, getCellNeighbors, populateField, timeout } from "@/helpers/gameHelpers";

interface GameState {
  field: GameField | null;
  selectedConfiguration: GameFieldOptions;
  bombsCount: number;
  status: GameCondition;
  interactionNotAllowed: () => boolean;
  startNewGame: (configuration: GameFieldOptions) => void;
  endGame: () => void;
  populateGame: (cellCoordinates: FieldCellCoordinates) => void;
  openCell: (cellCoordinates: FieldCellCoordinates) => void;
  toggleLabel: (cellCoordinates: FieldCellCoordinates) => void;
  highlightNeighbors: (cellCoordinates: FieldCellCoordinates) => void;
  checkVictory: () => void;
}

const useGameStore = create<GameState>()(
  immer((set, get) => ({
    field: null,
    selectedConfiguration: defaultGameConfiguartions[DefaultFieldSize.Small],
    bombsCount: 0,
    status: GameCondition.Pending,

    interactionNotAllowed: () => get().status === GameCondition.Victory || get().status === GameCondition.Defeat,

    startNewGame: (configuration: GameFieldOptions) => {
      set((state) => {
        state.field = generateField(configuration);
        state.selectedConfiguration = configuration;
        state.bombsCount = configuration.numberOfMines;
      });
    },

    endGame: () => {
      set((state) => {
        state.field = null;
        state.selectedConfiguration = defaultGameConfiguartions[DefaultFieldSize.Small];
        state.bombsCount = 0;
        state.status = GameCondition.Pending;
      });
    },

    populateGame: (cellCoordinates: FieldCellCoordinates) => {
      if (!get().field) return;

      set((state) => {
        state.status = GameCondition.Playing;
        state.field = populateField(
          get().field!,
          get().selectedConfiguration.numberOfMines,
          cellCoordinates,
        );
      });
    },

    openCell: async (cellCoordinates: FieldCellCoordinates) => {
      if (!get().field || get().interactionNotAllowed()) return;

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
          get().openCell(neighbor.coordinates);
        });
      }

      get().checkVictory();
    },

    toggleLabel: (cellCoordinates: FieldCellCoordinates) => {
      if (!get().field || get().interactionNotAllowed()) return;

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
    },

    highlightNeighbors: async (cellCoordinates: FieldCellCoordinates) => {
      if (!get().field || get().interactionNotAllowed()) return;

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
          get().openCell(neighbor.coordinates);
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
    },

    checkVictory: () => {
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
  }))
);

export default useGameStore;
