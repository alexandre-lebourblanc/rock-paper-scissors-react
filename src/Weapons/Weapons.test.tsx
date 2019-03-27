import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import { WEAPONS_LIST } from "../constants";
import Weapons, { Weapon } from "./Weapons";

describe("weapons", () => {
  it("renders weapons list", () => {
    const wrapper = shallow(
      <Weapons
        weapons={WEAPONS_LIST}
        onClickOnWeapon={() => null}
        gameStatus=""
      />
    );

    expect(wrapper.exists(".weapons-list")).toEqual(true);
  });

  it("should render as many Weapon as declared in WEAPONS_LIST", () => {
    const wrapper = shallow(
      <Weapons
        weapons={WEAPONS_LIST}
        onClickOnWeapon={() => null}
        gameStatus=""
      />
    );

    expect(wrapper.find(Weapon)).toHaveLength(WEAPONS_LIST.length);
  });
});

describe("weapon", () => {
  it("renders a weapon", () => {
    const wrapper = shallow(
      <Weapon
        weapon={WEAPONS_LIST[0]}
        onClickOnWeapon={() => null}
        disabled={false}
      />
    );

    expect(wrapper.exists(".weapon")).toEqual(true);
  });

  it("handle click on weapon", () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <Weapon
        weapon={WEAPONS_LIST[0]}
        onClickOnWeapon={mockCallback}
        disabled={false}
      />
    );

    wrapper.find("li").simulate("click");
    expect(mockCallback).toHaveBeenCalled();
  });
});
