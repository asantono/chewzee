import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentGame } from "../../redux/actions/gameActions";
import GameList from "../gameList/GameList";

const PastGames = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const makeCurrentGame = (item) => {
    dispatch(updateCurrentGame(item));
    navigation.navigate("Recap");
  };

  let sortedGames = [...user.pastGames];
  sortedGames = sortedGames.sort((a, b) => b.gameInitiated - a.gameInitiated);

  return (
    <GameList title="Past Games" list={sortedGames} func={makeCurrentGame} />
  );
};

export default PastGames;
