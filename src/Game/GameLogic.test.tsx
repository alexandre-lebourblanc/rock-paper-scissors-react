import React from "react";
import GameLogic from "./GameLogic";
import { PLAYER_INTERFACE, WEAPONS_LIST, WEAPON_INTERFACE } from "../constants";

describe("game logic", () => {
  it("should initialize a player", () => {
    let player: PLAYER_INTERFACE = GameLogic.initializePlayer();
    let playerMock = {
      type: "P",
      name: "Player 1",
      score: 0,
      weapon: null,
      hasIA: false
    };
    expect(player).toEqual(playerMock);
  });

  it("should return correct battle result", () => {
    let result: number = GameLogic.getResult("paper", "paper");
    expect(result).toEqual(0);
    result = GameLogic.getResult("paper", "rock");
    expect(result).toEqual(1);
    result = GameLogic.getResult("paper", "scissors");
    expect(result).toEqual(2);
  });

  it("should return valid weapon for computer", () => {
    let weapon: any = GameLogic.handleComputerChoice();
    let isValidWeapon = WEAPONS_LIST.includes(weapon);
    expect(isValidWeapon).toBeTruthy();
  });
});
