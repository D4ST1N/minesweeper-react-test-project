import Field from "@/components/Field/Field";
import InfoPanel from "../InfoPanel/InfoPanel";
import useGameStore from "@/stores/game";

export default function GameUI() {
  const field = useGameStore((state) => state.field);
  const status = useGameStore((state) => state.status);
  const bombsCount = useGameStore((state) => state.bombsCount);

  if (!field) return null;

  return (
    <>
      <InfoPanel status={status} bombsCount={bombsCount} />
      <Field />
    </>
  );
}
