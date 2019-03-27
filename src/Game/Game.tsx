import React, { Component } from "react";
import "./Game.scss";
import Weapons from "../Weapons/Weapons";
import Boardgame from "../BoardGame/BoardGame";
import {
  WEAPONS_LIST,
  OPPOSITION_MODES,
  SCORE_MODES,
  PLAYER_INTERFACE
} from "../constants";

const initializePlayer = (isComputer = false) => {
  let player: PLAYER_INTERFACE = {
    type: isComputer ? "Computer" : "Player",
    score: 0,
    weapon: null,
    hasIA: isComputer
  };
  return player;
};

interface MyProps {}

interface MyState {
  oppositionMode: string;
  scoreMode: string;
  player1: PLAYER_INTERFACE;
  player2: PLAYER_INTERFACE;
}

class Game extends Component<MyProps, MyState> {
  // hide weapons if mode === "cvsc" || end of game
  // handle mode (create component)
  // handle battle

  // set default player
  constructor(props: Object) {
    super(props);
    this.state = {
      oppositionMode: OPPOSITION_MODES[0],
      scoreMode: SCORE_MODES[0],
      player1: initializePlayer(),
      player2: initializePlayer(true)
    };
  }

  handlePlayer1Click = () => {};
  render() {
    return (
      <div className="game">
        <div className="boardgames">
          <Boardgame player={this.state.player1} />
          <Boardgame player={this.state.player2} />
        </div>
        <Weapons weapons={WEAPONS_LIST} />
      </div>
    );
  }
}

export default Game;
