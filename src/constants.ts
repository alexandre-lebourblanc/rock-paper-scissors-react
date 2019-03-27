export const WEAPONS_LIST = [
  {
    type: "rock",
    isActive: false,
    icon: "far fa-hand-rock"
  },
  {
    type: "paper",
    isActive: false,
    icon: "far fa-hand-paper"
  },
  {
    type: "scissors",
    isActive: false,
    icon: "far fa-hand-scissors"
  }
];

export const OPPOSITION_MODES = ["PvsC", "CvsC"];

export const SCORE_MODES = ["1", "5", "7"];

export interface WEAPON_INTERFACE {
  type: string;
  isActive: boolean;
  icon: string;
}

export interface PLAYER_INTERFACE {
  type: string; // player || computer
  score: number;
  weapon: WEAPON_INTERFACE | null;
  hasIA: boolean;
}
