export interface GameFieldMeasures {
  width: number;
  height: number;
}

export interface GameFieldOptions extends GameFieldMeasures {
  numberOfMines: number;
}

export interface FieldCellCoordinates {
  x: number;
  y: number;
}

export enum FieldCellLabel {
  None = "None",
  Flag = "Flag",
  Question = "Question",
}

export enum DefaultFieldSize {
  Small = "Small",
  Medium = "Medium",
  Expert = "Expert",
}

export enum CustomFieldSize {
  Custom = "Custom",
}

export type FieldSize = DefaultFieldSize | CustomFieldSize;

export enum GameCondition {
  Pending = "Pending",
  Playing = "Playing",
  Victory = "Victory",
  Defeat = "Defeat",
}

export type GameConfigurations = {
  [key in keyof typeof DefaultFieldSize]: GameFieldOptions;
};

export interface FieldCell {
  isHidden: boolean;
  label: FieldCellLabel;
  numberOfMinesNearby: number;
  isPlanted: boolean;
  coordinates: FieldCellCoordinates;
  isHighlighted: boolean;
}

export type GameField = FieldCell[][];
