import {
  PLAYER_INTERFACE,
  WEAPONS_SHORT,
  WEAPONS_LIST,
  WEAPON_INTERFACE,
  WIN_SCENARIOS
} from "../constants";

const initializePlayer = (isComputer = false) => {
  let player: PLAYER_INTERFACE = {
    type: isComputer ? "C" : "P",
    name: isComputer ? "Computer" : "Player",
    score: 0,
    weapon: null,
    hasIA: isComputer
  };
  return player;
};

const handleComputerChoice = (hasIA = false) => {
  let weaponName: string;

  if (!hasIA) {
    let rand =
      Math.floor(Math.random() * (WEAPONS_SHORT.length - 1 - 0 + 1)) + 0;
    weaponName = WEAPONS_SHORT[rand];
  } else {
    // add algorithm here
  }
  let weaponObj = WEAPONS_LIST.find(weapon => weapon.type === weaponName);
  return weaponObj;
};

const getResult = (p1Weapon: string, p2Weapon: string) => {
  let res: number;

  if (p1Weapon === p2Weapon) {
    res = 0;
  } else if (WIN_SCENARIOS[p1Weapon].includes(p2Weapon)) {
    res = 1;
  } else {
    res = 2;
  }
  return res;
};

const GameLogic = {
  initializePlayer,
  handleComputerChoice,
  getResult
};

export default GameLogic;
