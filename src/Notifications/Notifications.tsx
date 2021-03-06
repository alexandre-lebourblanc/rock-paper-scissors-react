import React, { useState } from "react";
import "./Notifications.scss";

interface NotificationProps {
  gameStatus: string;
  result: string;
  winner: string;
}

const Notifications: React.SFC<NotificationProps> = props => {
  let { gameStatus, result, winner } = props;

  // TODO could add dynamic countdown

  return (
    <div className="notifications">
      <label>
        {gameStatus === "chooseWeapon" && "Choose your weapon"}
        {gameStatus === "waitingForOpponent" && "Waiting for your opponent"}
        {gameStatus === "showResult" && result}
        {gameStatus === "showWinner" &&
          `The winner is ${winner} congratulations`}
      </label>
      {gameStatus === "showWinner" && (
        <label className="winner">A new game will start in 5 seconds</label>
      )}
    </div>
  );
};

export default Notifications;
