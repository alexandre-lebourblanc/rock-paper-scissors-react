import * as React from "react";
import { PLAYER_INTERFACE } from "../constants";
import "./Boardgame.scss";

interface BoardgameProps {
  player: PLAYER_INTERFACE;
  gameStatus: string;
}

interface ScoreProps {
  score: number;
}

const Score: React.SFC<ScoreProps> = props => {
  return <div className="score">{props.score}</div>;
};

/**
 * Render a board game
 * @param props
 */
const Boardgame: React.SFC<BoardgameProps> = props => {
  const { player, gameStatus } = props;

  return (
    <div className="boardgame">
      <h3>{player.name}</h3>
      <div className="boardgame-weapon-container">
        <div
          className={[
            "boardgame-weapon",
            !player.weapon
              ? gameStatus === "waitingForOpponent"
                ? "waiting"
                : "empty"
              : ""
          ].join(" ")}
        >
          {gameStatus !== "chooseWeapon" &&
            !player.weapon && <i className="fas fa-spinner" />}
          {gameStatus !== "chooseWeapon" &&
            player.weapon && <i className={player.weapon.icon} />}
          {gameStatus === "chooseWeapon" &&
            !player.weapon && <i className="fas fa-question" />}
        </div>
      </div>
      <Score score={player.score} />
    </div>
  );
};

export default Boardgame;
