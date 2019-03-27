import * as React from "react";
import { PLAYER_INTERFACE } from "../constants";
import "./Boardgame.scss";

interface BoardgameProps {
  player: PLAYER_INTERFACE;
}

/**
 * Render a board game
 * @param props
 */
const Boardgame: React.SFC<BoardgameProps> = props => {
  const { player } = props;

  return (
    <div className="boardgame">
      <h3>{player.type}</h3>
      <div className="boardgame-weapon-container">
        <div
          className={["boardgame-weapon", !player.weapon ? "empty" : ""].join(
            " "
          )}
        >
          {player.weapon ? (
            <i className={player.weapon.icon} />
          ) : (
            <i className="fas fa-question" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Boardgame;
