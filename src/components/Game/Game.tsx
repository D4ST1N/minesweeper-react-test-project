import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Field from "@/components/Field/Field";
import InfoPanel from "../InfoPanel/InfoPanel";
import Alert from "@mui/material/Alert";
import useGameStore from "@/stores/game";
import { FieldSize, GameCondition } from "@/types/gameTypes";
import classes from "./Game.module.scss";

export default function Game() {
  const field = useGameStore((state) => state.field);
  const status = useGameStore((state) => state.status);
  const bombsCount = useGameStore((state) => state.bombsCount);
  const startNewGame = useGameStore((state) => state.startNewGame);
  const endGame = useGameStore((state) => state.endGame);

  return (
    <>
      {field && (
        <>
          <InfoPanel status={status} bombsCount={bombsCount} />
          <Field />
        </>
      )}
      {!field && (
        <div>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => startNewGame(FieldSize.Small)}
            >
              Small
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => startNewGame(FieldSize.Medium)}
            >
              Medium
            </Button>
            <Button variant="contained" onClick={() => startNewGame(FieldSize.Expert)}>
              Expert
            </Button>
          </Stack>
        </div>
      )}
      {[GameCondition.Victory, GameCondition.Defeat].includes(status) && (
        <div className={classes.alertContainer}>
          <div className={classes.alertWrapper}>
            {status === GameCondition.Victory && (
              <Alert severity="success">
                <h3 className={classes.title}>You Won!</h3>
                <Button variant="contained" onClick={endGame}>
                  Start a New Game
                </Button>
              </Alert>
            )}
            {status === GameCondition.Defeat && (
              <Alert severity="error">
                <h3 className={classes.title}>Defeated!</h3>
                <Button variant="contained" onClick={endGame}>
                  Start a New Game
                </Button>
              </Alert>
            )}
          </div>
        </div>
      )}
    </>
  );
}
