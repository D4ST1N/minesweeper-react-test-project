interface FieldCellCountProps {
  numberOfMinesNearby: number;
}

export default function FieldCellCount({ numberOfMinesNearby }: FieldCellCountProps) {
  const minesNumberColorMapping: { [index: number]: string } = {
    0: "#fff",
    1: "#27a15c",
    2: "#27a18f",
    3: "#277ba1",
    4: "#2754a1",
    5: "#4927a1",
    6: "#9227a1",
    7: "#a12772",
    8: "#a12728",
  };

  const cellStyles = () => ({
    color: minesNumberColorMapping[numberOfMinesNearby],
  });

  return <span style={cellStyles()}>{numberOfMinesNearby ? numberOfMinesNearby : ""}</span>;
}
