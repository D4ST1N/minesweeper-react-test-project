import useGameStore from "@/stores/game";
import { GameCondition } from "@/types/gameTypes";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import classes from "./GameAlert.module.scss";

export default function GameAlert() {
  const status = useGameStore((state) => state.status);
  const endGame = useGameStore((state) => state.endGame);

  if (![GameCondition.Victory, GameCondition.Defeat].includes(status)) return null;

  const alert =
    status === GameCondition.Victory ? (
      <Alert severity="success">
        <h3 className={classes.title}>You Won!</h3>
        <Button variant="contained" onClick={endGame}>
          Start a New Game
        </Button>
      </Alert>
    ) : (
      <Alert severity="error">
        <h3 className={classes.title}>Defeated!</h3>
        <Button variant="contained" onClick={endGame}>
          Start a New Game
        </Button>
      </Alert>
    );

  return (
    <div className={classes.alertContainer}>
      <div className={classes.alertWrapper}>{alert}</div>
    </div>
  );
}
