import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { GAME_STATUS, GAME_RESULTS_MESSAGES, WEAPONS_LIST } from "../constants";
import Boardgame from "./BoardGame";
import GameLogic from "../Game/GameLogic";

describe("boardgame", () => {
  it("renders board game", () => {
    let player1 = GameLogic.initializePlayer();
    const wrapper = shallow(
      <Boardgame player={player1} gameStatus={GAME_STATUS[0]} />
    );

    expect(wrapper.exists(".boardgame")).toEqual(true);
  });

  it("renders question mark as icon when no player1 weapon", () => {
    let player1 = GameLogic.initializePlayer();
    const wrapper = shallow(
      <Boardgame player={player1} gameStatus={GAME_STATUS[0]} />
    );

    expect(wrapper.find("i").hasClass("fas fa-question")).toEqual(true);
  });

  it("renders rock icon when selected weapon is 'rock'", () => {
    let player1 = GameLogic.initializePlayer();
    player1.weapon = WEAPONS_LIST[0];

    const wrapper = shallow(
      <Boardgame player={player1} gameStatus={GAME_STATUS[1]} />
    );

    expect(wrapper.find("i").hasClass(player1.weapon.icon)).toEqual(true);
  });

  it("renders loading icon when no selected weapon and game status is 'waitingForOpponent'", () => {
    let player1 = GameLogic.initializePlayer();

    const wrapper = shallow(
      <Boardgame player={player1} gameStatus={GAME_STATUS[2]} />
    );

    expect(wrapper.find("i").hasClass("fas fa-spinner")).toEqual(true);
  });
});
