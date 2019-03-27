import * as React from "react";
import { WEAPON_INTERFACE } from "../constants";
import "./Weapons.scss";

interface WeaponsProps {
  weapons: WEAPON_INTERFACE[];
  onClickOnWeapon: ((weapon: WEAPON_INTERFACE) => void);
  gameStatus: string;
}

interface WeaponProps {
  weapon: WEAPON_INTERFACE;
  onClickOnWeapon: ((weapon: WEAPON_INTERFACE) => void);
  disabled: boolean;
}

/**
 * Render a weapon component with his icon
 * @param props
 */
export const Weapon: React.SFC<WeaponProps> = props => {
  const { weapon, disabled } = props;

  /**
   * Call the callback when a user select a weapon
   */
  const clickOnWeapon = () => {
    props.onClickOnWeapon(weapon);
  };

  return (
    <li
      className={[
        "weapon",
        weapon.isActive ? "active" : "",
        disabled ? "disabled" : ""
      ].join(" ")}
      onClick={clickOnWeapon}
    >
      <i className={weapon.icon} />
    </li>
  );
};

/**
 * Render list of Weapons component
 * @param props
 */
const Weapons: React.SFC<WeaponsProps> = props => {
  const { weapons, gameStatus } = props;

  return (
    <div className="weapons">
      {weapons && (
        <ul className="weapons-list">
          {weapons.map((weapon, index) => {
            return (
              <Weapon
                disabled={gameStatus !== "chooseWeapon"}
                key={index}
                weapon={weapon}
                onClickOnWeapon={props.onClickOnWeapon}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Weapons;
