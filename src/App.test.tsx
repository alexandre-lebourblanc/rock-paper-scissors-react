import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders header title", () => {
  const wrapper = shallow(<App />);
  const title = <h1>Rock Paper Scissors</h1>;

  expect(wrapper.contains(title)).toEqual(true);
});
