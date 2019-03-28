import React, { Component } from "react";
import "./Game.scss";
import Weapons from "../Weapons/Weapons";
import Boardgame from "../BoardGame/BoardGame";
import Notifications from "../Notifications/Notifications";
import Modes from "../Modes/Modes";
import {
  WEAPONS_LIST,
  WEAPON_INTERFACE,
  OPPOSITION_MODES,
  SCORE_MODES,
  PLAYER_INTERFACE,
  GAME_RESULTS_MESSAGES,
  GAME_STATUS,
  MAX_CVSC_SCORING,
  MAX_PVSC_SCORING
} from "../constants";
import GameLogic from "./GameLogic";

interface GameProps {}

interface GameState {
  oppositionMode: string;
  player1: PLAYER_INTERFACE;
  player2: PLAYER_INTERFACE;
  gameStatus: string;
  result: string;
  winner: string;
}

class Game extends Component<GameProps, GameState> {
  // fix countdown in notification and choose your weapon
  // fix issue with boardgame when computer vs computer begin
  // add comments for documentation if needed

  constructor(props: Object) {
    super(props);
    this.state = {
      oppositionMode: OPPOSITION_MODES[0],
      player1: GameLogic.initializePlayer(),
      player2: GameLogic.initializePlayer(true),
      gameStatus: GAME_STATUS[0],
      result: "",
      winner: ""
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

  playComputerVsComputerMode = () => {
    let player1 = GameLogic.initializePlayer(true);
    let player2 = GameLogic.initializePlayer(true, 2);

    this.setState({ player1, player2 }, () => {
      this.simulate();
    });
  };

  updateOppositionMode = (oppositionMode: string) => {
    this.setState({ oppositionMode });
    this.fullReset();
    if (oppositionMode === "CvsC") {
      this.playComputerVsComputerMode();
    }
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
    if (oppositionMode === "PvsC") {
      player2.weapon = GameLogic.handleComputerChoice();
      this.setState({ player2 }, () => {
        this.arbitrate(player1, player2, oppositionMode);
        if (
          player1.score < MAX_PVSC_SCORING &&
          player2.score < MAX_PVSC_SCORING
        ) {
          setTimeout(() => {
            this.resetWeapons();
          }, 1000);
        } else {
          let winner = player1.name;

          if (player2.score === MAX_PVSC_SCORING) {
            winner = player2.name;
          }
          this.setState({ winner: winner, gameStatus: GAME_STATUS[3] });
          setTimeout(() => {
            this.fullReset();
            this.setState({ gameStatus: GAME_STATUS[0] });
          }, 5000);
        }
      });
    }
  };

  simulate = () => {
    let { player1, player2, oppositionMode } = this.state;

    if (oppositionMode === "CvsC") {
      player1.weapon = GameLogic.handleComputerChoice();
      player2.weapon = GameLogic.handleComputerChoice();
      this.setState({ player1, player2 }, () => {
        this.arbitrate(player1, player2, oppositionMode);

        setTimeout(() => {
          if (
            player1.score < MAX_CVSC_SCORING &&
            player2.score < MAX_CVSC_SCORING
          ) {
            this.resetWeapons();
            this.simulate();
          } else {
            let winner = player1.name;

            if (player2.score === MAX_CVSC_SCORING) {
              winner = player2.name;
            }
            this.setState({ winner: winner, gameStatus: GAME_STATUS[3] });
            setTimeout(() => {
              this.playComputerVsComputerMode();
              this.setState({ gameStatus: GAME_STATUS[0] });
            }, 5000);
          }
        }, 1000);
      });
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
    const {
      player1,
      player2,
      gameStatus,
      result,
      oppositionMode,
      winner
    } = this.state;

    return (
      <div className="game">
        <Modes
          oppositionMode={oppositionMode}
          onOppositionModeChange={this.updateOppositionMode}
          gameStatus={gameStatus}
        />
        <div className="boardgames">
          <Boardgame player={player1} gameStatus={gameStatus} />
          <Boardgame player={player2} gameStatus={gameStatus} />
        </div>
        {oppositionMode === "PvsC" && (
          <Weapons
            weapons={WEAPONS_LIST}
            onClickOnWeapon={this.play}
            gameStatus={gameStatus}
          />
        )}
        <Notifications
          gameStatus={gameStatus}
          result={result}
          winner={winner}
        />
      </div>
    );
  }
}

export default Game;
