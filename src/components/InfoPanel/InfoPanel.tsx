import Icon from "@mdi/react";
import { mdiMine, mdiTimer } from "@mdi/js";
import classes from "./InfoPanel.module.scss";
import { useEffect, useRef, useState } from "react";
import { GameCondition } from "@/types/gameTypes";

interface Props {
  status: GameCondition;
  bombsCount: number;
}

export default function InfoPanel({ status, bombsCount }: Props) {
  const [time, setTime] = useState(0);
  const timerIdRef = useRef<null | NodeJS.Timer>(null);

  useEffect(() => {
    if (status === GameCondition.Playing && !timerIdRef.current) {
      startTimer();
    }

    if (status === GameCondition.Defeat && timerIdRef.current) {
      stopTimer();
    }

    return stopTimer;
  }, [status]);

  const formattedTime = `${Math.floor(time / 60)}:${(time % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  })}`;

  function startTimer() {
    timerIdRef.current = setInterval(() => {
      setTime((oldTime) => oldTime + 1);
    }, 1000);
  }

  function stopTimer() {
    if (!timerIdRef.current) return;

    clearInterval(timerIdRef.current);
  }

  return (
    <div className={classes.panelWrapper}>
      <div className={classes.bombsCount}>
        <Icon path={mdiMine} size={1} />
        {bombsCount}
      </div>
      <div className={classes.separator}>|</div>
      <div className={classes.timer}>
        {formattedTime}
        <Icon path={mdiTimer} size={1} />
      </div>
    </div>
  );
}
