import React, { Component } from "react";
import "./App.scss";
import Game from "./Game/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Rock Paper Scissors</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
