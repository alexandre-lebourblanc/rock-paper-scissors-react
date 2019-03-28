import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { GAME_STATUS, GAME_RESULTS_MESSAGES } from "../constants";
import Notifications from "./Notifications";

describe("notifications", () => {
  it("renders notifications", () => {
    const wrapper = shallow(
      <Notifications gameStatus="" result="" winner="" />
    );

    expect(wrapper.exists(".notifications")).toEqual(true);
  });

  it("renders 'Choose your weapon' when game status is 'chooseWeapon'", () => {
    const wrapper = shallow(
      <Notifications gameStatus={GAME_STATUS[0]} result="" winner="" />
    );

    expect(wrapper.find("label").text()).toEqual("Choose your weapon");
  });

  it("renders game result when game status is 'showResult'", () => {
    const wrapper = shallow(
      <Notifications
        gameStatus={GAME_STATUS[2]}
        result={GAME_RESULTS_MESSAGES[0]}
        winner=""
      />
    );

    expect(wrapper.find("label").text()).toEqual("It's a draw");
  });
});
