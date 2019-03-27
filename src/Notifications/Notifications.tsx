import * as React from "react";
import "./Notifications.scss";

interface NotificationProps {
  gameStatus: string;
  result: string;
}

const Notifications: React.SFC<NotificationProps> = props => {
  let { gameStatus, result } = props;

  return (
    <div className="notification">
      <label>
        {gameStatus === "chooseWeapon" && "Choose your weapon"}
        {gameStatus === "waitingForOpponent" && "Waiting for your opponent"}
        {gameStatus === "showResult" && result}
        {gameStatus === "replay" && "Do you want to play again ?"}
      </label>
    </div>
  );
};

export default Notifications;
