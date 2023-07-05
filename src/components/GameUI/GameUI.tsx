import Field from "@/components/Field/Field";
import InfoPanel from "../InfoPanel/InfoPanel";
import { useField, useStatus, useBombsCount } from "@/stores/game";

export default function GameUI() {
  const field = useField();
  const status = useStatus();
  const bombsCount = useBombsCount();

  if (!field) return null;

  return (
    <>
      <InfoPanel status={status} bombsCount={bombsCount} />
      <Field />
    </>
  );
}
