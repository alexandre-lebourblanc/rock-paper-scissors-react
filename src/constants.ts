export const WEAPONS_SHORT = ["rock", "paper", "scissors"];

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

export const GAME_RESULTS_MESSAGES = [
  "It's a draw",
  "Player 1 won",
  "Computer won",
  "It's a draw",
  "Computer 1 won",
  "Computer 2 won"
];

export const GAME_STATUS = [
  "chooseWeapon",
  "waitingForOpponent",
  "showResult",
  "replay"
];

export const OPPOSITION_MODES = ["PvsC", "CvsC"];

export const SCORE_MODES = ["1", "5", "7"];

export const WIN_SCENARIOS: { [key: string]: string[] } = {
  rock: ["scissors"],
  paper: ["rock"],
  scissors: ["paper"]
};

export interface WEAPON_INTERFACE {
  type: string;
  isActive: boolean;
  icon: string;
}

export interface PLAYER_INTERFACE {
  type: string;
  name: string;
  score: number;
  weapon: WEAPON_INTERFACE | null | undefined;
  hasIA: boolean;
}
