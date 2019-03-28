import * as React from "react";
import {
  OPPOSITION_MODES,
  MAX_CVSC_SCORING,
  MAX_PVSC_SCORING,
  GAME_STATUS
} from "../constants";
import "./Modes.scss";

interface ModeProps {
  oppositionMode: string;
  gameStatus: string;
  onOppositionModeChange: ((oppositionMode: string) => void);
}

const Modes: React.SFC<ModeProps> = props => {
  const { oppositionMode, gameStatus } = props;

  const handleOppositionModeChange = () => {
    let newOppositionMode =
      oppositionMode === OPPOSITION_MODES[0]
        ? OPPOSITION_MODES[1]
        : OPPOSITION_MODES[0];
    props.onOppositionModeChange(newOppositionMode);
  };

  return (
    <div className="modes">
      <div className="opposition">
        <label>
          {oppositionMode === "PvsC"
            ? "Player vs Computer"
            : "Computer vs Computer"}
          <span>
            {`( First to ${
              oppositionMode === "PvsC" ? MAX_PVSC_SCORING : MAX_CVSC_SCORING
            } )`}
          </span>
        </label>
        <button onClick={handleOppositionModeChange}>
          Change opposition mode
        </button>
      </div>
    </div>
  );
};

export default Modes;
