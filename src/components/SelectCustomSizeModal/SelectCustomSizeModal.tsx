import DialogTitle from "@mui/material/DialogTitle";
import { GameFieldOptions } from "@/types/gameTypes";
import { useState } from "react";
import { DialogContent, TextField, Dialog, DialogActions, Button } from "@mui/material";

interface SelectCustomSizeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (gameOptions: GameFieldOptions) => void;
}

export default function SelectCustomSizeModal({
  open,
  onSubmit,
  onClose,
}: SelectCustomSizeModalProps) {
  const [customOptions, setCustomOptions] = useState({
    width: 9,
    height: 9,
    numberOfMines: 10,
  });

  const minWidth = 9;
  const maxWidth = Math.ceil(window.innerWidth / 40);
  const minHeight = 9;
  const maxHeight = Math.ceil((window.innerHeight - 60) / 40);
  const minMines = Math.round(customOptions.width * customOptions.height * 0.05);
  const maxMines = Math.round(customOptions.width * customOptions.height * 0.25);
  const widthWithError = minWidth > customOptions.width || maxWidth < customOptions.width;
  const heightWithError = minHeight > customOptions.height || maxHeight < customOptions.height;
  const minesNumberWithError =
    minMines > customOptions.numberOfMines || maxMines < customOptions.numberOfMines;

  function handleSubmit() {
    onSubmit(customOptions);
  }

  function handleClose() {
    onClose();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    setCustomOptions((oldCustomOptions) => ({
      ...oldCustomOptions,
      [name]: Number(value),
    }));
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select game field size and number of mines</DialogTitle>
      <DialogContent>
        <TextField
          value={customOptions.width}
          name="width"
          label="Width"
          fullWidth
          type="number"
          helperText={`Min: ${minWidth}; Max: ${maxWidth}`}
          InputProps={{ inputProps: { min: minWidth, max: maxWidth } }}
          error={widthWithError}
          variant="filled"
          onChange={handleChange}
        />
        <TextField
          value={customOptions.height}
          name="height"
          label="Height"
          fullWidth
          type="number"
          helperText={`Min: ${minHeight}; Max: ${maxHeight}`}
          InputProps={{ inputProps: { min: minHeight, max: maxHeight } }}
          error={heightWithError}
          variant="filled"
          onChange={handleChange}
        />
        <TextField
          value={customOptions.numberOfMines}
          name="numberOfMines"
          label="Number of mines"
          fullWidth
          type="number"
          helperText={`Min: ${minMines}; Max: ${maxMines}`}
          InputProps={{ inputProps: { min: minMines, max: maxMines } }}
          error={minesNumberWithError}
          variant="filled"
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          disabled={widthWithError || heightWithError || minesNumberWithError}
          onClick={handleSubmit}
        >
          Start
        </Button>
      </DialogActions>
    </Dialog>
  );
}
