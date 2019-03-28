import React from "react";
import { shallow } from "enzyme";
import { WEAPONS_LIST, OPPOSITION_MODES } from "../constants";
import Game from "./Game";

describe("game", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallow(<Game />);
  });

  it("renders game component", () => {
    expect(wrapper.exists(".game")).toEqual(true);
  });

  it("set player 1 weapon", () => {
    wrapper.instance().play(WEAPONS_LIST[0]);
    expect(wrapper.state().player1.weapon).toEqual(WEAPONS_LIST[0]);
  });

  it("set player 2 weapon", () => {
    wrapper.instance().play(WEAPONS_LIST[0]);
    expect(wrapper.state().player2.weapon).not.toBeNull();
  });

  it("update opposition mode", () => {
    wrapper.instance().updateOppositionMode(OPPOSITION_MODES[1]);
    expect(wrapper.state().oppositionMode).toEqual(OPPOSITION_MODES[1]);
  });

  it("update player 1 score when paper beats rock", () => {
    let { player1, player2, oppositionMode } = wrapper.state();
    player1.weapon = WEAPONS_LIST[1];
    player2.weapon = WEAPONS_LIST[0];
    wrapper.instance().arbitrate(player1, player2, oppositionMode);
    expect(wrapper.state().player1.score).toEqual(1);
  });

  it("update player 2 score when scissors beats paper", () => {
    let { player1, player2, oppositionMode } = wrapper.state();
    player1.weapon = WEAPONS_LIST[1];
    player2.weapon = WEAPONS_LIST[2];
    wrapper.instance().arbitrate(player1, player2, oppositionMode);
    expect(wrapper.state().player2.score).toEqual(1);
  });

  it("should reset weapons", () => {
    let { player1, player2 } = wrapper.state();
    player1.weapon = WEAPONS_LIST[1];
    player2.weapon = WEAPONS_LIST[2];
    expect(wrapper.state().player1.weapon).toEqual(WEAPONS_LIST[1]);
    wrapper.instance().resetWeapons();
    expect(wrapper.state().player1.weapon).toBeNull();
    expect(wrapper.state().player2.weapon).toBeNull();
  });

  it("should reset full player", () => {
    let { player1, player2 } = wrapper.state();
    player1.type = "C";
    expect(wrapper.state().player1.type).toEqual("C");
    player1.weapon = WEAPONS_LIST[1];
    player2.weapon = WEAPONS_LIST[2];
    wrapper.instance().fullReset();
    expect(wrapper.state().player1.type).toEqual("P");
  });
});
