import * as React from "react";
import { WEAPON_INTERFACE } from "../constants";
import "./Weapons.scss";

interface WeaponsProps {
  weapons: WEAPON_INTERFACE[];
  onClickOnWeapon: ((weapon: WEAPON_INTERFACE) => void);
}

interface WeaponProps {
  weapon: WEAPON_INTERFACE;
  onClickOnWeapon: ((weapon: WEAPON_INTERFACE) => void);
}

/**
 * Render a weapon component with his icon
 * @param props
 */
export const Weapon: React.SFC<WeaponProps> = props => {
  const { weapon } = props;

  /**
   * Call the callback when a user select a weapon
   */
  const clickOnWeapon = () => {
    props.onClickOnWeapon(weapon);
  };

  return (
    <li
      className={["weapon", weapon.isActive ? "isActive" : ""].join(" ")}
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
  const { weapons } = props;

  return (
    <div className="weapons">
      {weapons && (
        <ul className="weapons-list">
          {weapons.map((weapon, index) => {
            return (
              <Weapon
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
