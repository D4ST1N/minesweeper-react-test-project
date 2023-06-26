import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import useGameStore from "@/stores/game";
import { DefaultFieldSize } from "@/types/gameTypes";
import { defaultGameConfiguartions } from "@/helpers/gameEntities";

export default function GameStartActions() {
  const field = useGameStore((state) => state.field);
  const startNewGame = useGameStore((state) => state.startNewGame);

  if (field) return null;

  function startGameWithDefaultConfiguration(size: DefaultFieldSize) {
    startNewGame(defaultGameConfiguartions[size]);
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
      </Stack>
    </div>
  );
}
