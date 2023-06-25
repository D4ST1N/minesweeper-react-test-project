import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home/Home";
import GameView from "@/views/GameView/GameView";

const router = createBrowserRouter([
  {
    path: "/",
    element: Home(),
  },
  {
    path: "/game",
    element: GameView(),
  },
]);

export default router;
