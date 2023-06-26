import { FieldCellLabel } from "@/types/gameTypes";
import Icon from "@mdi/react";
import { mdiFlag, mdiHelpCircleOutline } from "@mdi/js";

interface FieldLabelIconProps {
  label: FieldCellLabel;
}

export default function FieldLabelIcon({ label }: FieldLabelIconProps) {
  if (label === FieldCellLabel.Flag) return <Icon path={mdiFlag} size={1} />;

  if (label === FieldCellLabel.Question) return <Icon path={mdiHelpCircleOutline} size={1} />;

  return null;
}
