import Button from "@mui/material/Button";

export default function Home() {
  return (
    <>
      <div>
        Home view
        <br />
        <Button href="/game" variant="contained">
          Start a New Game
        </Button>
      </div>
    </>
  );
}
