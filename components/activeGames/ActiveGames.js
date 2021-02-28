import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrentGame } from "../../redux/actions/gameActions";
import GameList from "../gameList/GameList";
import { deleteActiveGame, newCurrentGame } from "../../api/game";

const ActiveGames = ({ navigation }) => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const makeCurrentGame = (item) => {
    newCurrentGame(user, item);
    dispatch(updateCurrentGame(item));
    navigation.navigate("Game");
  };

  const deleteGame = (item) => {
    deleteActiveGame(user, item);
  };

  let sortedGames = [...user.activeGames];
  sortedGames = sortedGames.sort((a, b) => b.gameInitiated - a.gameInitiated);

  return (
    <GameList
      title="Active Games"
      list={sortedGames}
      func={makeCurrentGame}
      icon={true}
      iconFunc={deleteGame}
    />
  );
};

export default ActiveGames;
