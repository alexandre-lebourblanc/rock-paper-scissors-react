import React, { Component } from "react";
import "./Game.scss";
import Weapons from "../Weapons/Weapons";
import Boardgame from "../BoardGame/BoardGame";
import Notifications from "../Notifications/Notifications";
import {
  WEAPONS_LIST,
  WEAPON_INTERFACE,
  OPPOSITION_MODES,
  SCORE_MODES,
  PLAYER_INTERFACE,
  GAME_RESULTS_MESSAGES,
  GAME_STATUS
} from "../constants";
import GameLogic from "./GameLogic";

interface GameProps {}

interface GameState {
  oppositionMode: string;
  scoreMode: string;
  player1: PLAYER_INTERFACE;
  player2: PLAYER_INTERFACE;
  gameStatus: string;
  result: string;
}

class Game extends Component<GameProps, GameState> {
  // hide weapons if mode === "cvsc" || end of game
  // handle mode (create component)

  constructor(props: Object) {
    super(props);
    this.state = {
      oppositionMode: OPPOSITION_MODES[0],
      scoreMode: SCORE_MODES[0],
      player1: GameLogic.initializePlayer(),
      player2: GameLogic.initializePlayer(true),
      gameStatus: GAME_STATUS[0],
      result: ""
    };
  }

  /**
   * Reinitialize the both players
   */
  fullReset = () => {
    this.setState({
      player1: GameLogic.initializePlayer(),
      player2: GameLogic.initializePlayer(true)
    });
  };

  resetWeapons = () => {
    let { player1, player2 } = this.state;

    player1.weapon = null;
    player2.weapon = null;
    this.setState({ player1, player2, gameStatus: GAME_STATUS[0] });
  };

  play = (weapon: WEAPON_INTERFACE) => {
    let { player1, player2, oppositionMode } = this.state;

    player1.weapon = weapon;
    this.setState({ player1, gameStatus: GAME_STATUS[1] });
    if ((oppositionMode = "PvsC")) {
      setTimeout(() => {
        player2.weapon = GameLogic.handleComputerChoice();
        this.setState({ player2 }, () => {
          this.arbitrate(player1, player2, oppositionMode);
          setTimeout(() => {
            this.resetWeapons();
          }, 2000);
        });
      }, 1000);
    }
  };

  arbitrate = (
    player1: PLAYER_INTERFACE,
    player2: PLAYER_INTERFACE,
    oppositionMode: string
  ) => {
    let res = GameLogic.getResult(player1.weapon!.type, player2.weapon!.type);

    if (oppositionMode === "CvsC") {
      res += 3;
    }
    if (res === 1 || res === 4) {
      player1.score++;
    } else if (res === 2 || res === 5) {
      player2.score++;
    }
    this.setState({
      result: GAME_RESULTS_MESSAGES[res],
      player1,
      player2,
      gameStatus: GAME_STATUS[2]
    });
  };

  render() {
    const { player1, player2, gameStatus, result } = this.state;

    return (
      <div className="game">
        <div className="boardgames">
          <Boardgame player={player1} gameStatus={gameStatus} />
          <Boardgame player={player2} gameStatus={gameStatus} />
        </div>
        {player1.type !== "C" && (
          <Weapons
            weapons={WEAPONS_LIST}
            onClickOnWeapon={this.play}
            gameStatus={gameStatus}
          />
        )}
        <Notifications gameStatus={gameStatus} result={result} />
      </div>
    );
  }
}

export default Game;
