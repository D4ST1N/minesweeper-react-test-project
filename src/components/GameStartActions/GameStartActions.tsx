import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useField, useGameActions } from "@/stores/game";
import { DefaultFieldSize, GameFieldOptions } from "@/types/gameTypes";
import { defaultGameConfiguartions } from "@/helpers/gameEntities";
import SelectCustomSizeModal from "../SelectCustomSizeModal/SelectCustomSizeModal";
import { useState } from "react";

export default function GameStartActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const field = useField();
  const { startNewGame } = useGameActions();

  if (field) return null;

  function startGameWithDefaultConfiguration(size: DefaultFieldSize) {
    startNewGame(defaultGameConfiguartions[size]);
  }

  function showModal() {
    setIsModalOpen(true);
  }

  function handleClose() {
    setIsModalOpen(false);
  }

  function handleSubmit(customGameOptions: GameFieldOptions) {
    handleClose();
    startNewGame(customGameOptions);
  }

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          onClick={() => startGameWithDefaultConfiguration(DefaultFieldSize.Small)}
        >
          Small
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => startGameWithDefaultConfiguration(DefaultFieldSize.Medium)}
        >
          Medium
        </Button>
        <Button
          variant="contained"
          onClick={() => startGameWithDefaultConfiguration(DefaultFieldSize.Expert)}
        >
          Expert
        </Button>
        <Button variant="contained" color="info" onClick={showModal}>
          Custom
        </Button>
      </Stack>
      <SelectCustomSizeModal open={isModalOpen} onClose={handleClose} onSubmit={handleSubmit} />
    </div>
  );
}
