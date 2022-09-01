import { configureStore } from "@reduxjs/toolkit";
import { Player1Slice, Player2Slice } from "./decks";

export default configureStore({
  reducer: {
    player1: Player1Slice,
    player2: Player2Slice,
  },
  devTools: true,
});
