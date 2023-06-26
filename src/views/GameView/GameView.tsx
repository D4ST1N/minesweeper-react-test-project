import GameStartActions from "@/components/GameStartActions/GameStartActions";
import GameAlert from "@/components/GameAlert/GameAlert";
import GameUI from "@/components/GameUI/GameUI";

export default function Game() {
  return (
    <>
      <GameUI />
      <GameStartActions />
      <GameAlert />
    </>
  );
}
