import React, { Component } from "react";
import EnterNum from "./components/EnterNum";
import EnterPlayers from "./components/EnterPlayers";
import RankPlayers from "./components/RankPlayers";
import Algo from "./components/Algo";

function Person(id, name) {
  this.id = id;
  this.name = name;
  this.paired = false;
  this.next_possible = 0;
  this.preferences = [];
  this.setPairedValue = function (a) {
    this.paired = a;
  };
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numplayers: 0,
      numplayersui: true,
      enterplayersui: false,
      enterrankings: false,
      answersui: false,
      set1: [],
      set2: [],
    };
  }

  setDefaultPreference = (set1, set2) => {
    for (const person1 of set1) {
      for (const person2 of set2) {
        person1.preferences.push(person2.id);
      }
    }
  };
  handleSubmit = (event) => {
    if (this.state.numplayers < 21 && this.state.numplayers > 0) {
      this.setState({ numplayersui: false, enterplayersui: true });
      for (var i = 0; i < this.state.numplayers; i++) {
        this.state.set1.push(new Person("A - " + i, "", false));
        this.state.set2.push(new Person("B - " + i, "", false));
      }
    }
    event.preventDefault();
  };

  checkDup = (set) => {
    const uniqueValues = new Set(set.map((v) => v.name));
    if (uniqueValues.size < set.length) {
      return true;
    }
  };

  checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length;
  }

  checkDup2 = () => {
    for (const person1 of this.state.set1) {
      if (this.checkIfDuplicateExists(person1.preferences)) {
        return false;
      }
    }
    for (const person1 of this.state.set2) {
      if (this.checkIfDuplicateExists(person1.preferences)) {
        return false;
      }
    }
    return true;
  };

  handleSubmit2 = (event) => {
    if (
      this.checkDup(this.state.set1) === true ||
      this.checkDup(this.state.set2)
    ) {
      event.preventDefault();
      return;
    }
    this.setState({ enterplayersui: false, enterrankings: true });
    this.setDefaultPreference(this.state.set1, this.state.set2);
    this.setDefaultPreference(this.state.set2, this.state.set1);
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({ numplayers: event.target.value });
  };

  addNames = (event, person, set) => {
    const temp = [...set];
    const index = temp.indexOf(person);
    temp[index].name = event.target.value;
    if (person.id.startsWith("A")) {
      this.setState({ set1: temp });
    } else {
      this.setState({ set2: temp });
    }
  };

  updatePreferences = (person, event, index, set) => {
    const temp = [...set];
    const p_index = temp.indexOf(person);
    temp[p_index].preferences[index] = event.target.value;
    if (person.id.startsWith("A")) {
      this.setState({ set1: temp });
    } else {
      this.setState({ set2: temp });
    }
  };

  handleSubmit3 = (event) => {
    if (!this.checkDup2()) {
      event.preventDefault();
      return;
    }
    this.setState({ answersui: true, enterrankings: false });
    event.preventDefault();
  };

  render() {
    return (
      <div>
        {this.state.numplayersui ? (
          <div>
            <EnterNum
              handleSubmit={this.handleSubmit}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
        {this.state.enterplayersui ? (
          <form onSubmit={this.handleSubmit2}>
            <EnterPlayers
              set={this.state.set1}
              onChange={this.addNames}
              group="A"
            />
            <EnterPlayers
              set={this.state.set2}
              onChange={this.addNames}
              group="B"
            />
            <input className="m-3 btn btn-primary" type="submit" />
            <label className="text-danger mt-3 ms-3 ">
              Note: No duplicates in each side
            </label>
          </form>
        ) : null}
        {this.state.enterrankings ? (
          <form onSubmit={this.handleSubmit3}>
            <RankPlayers
              set1={this.state.set1}
              set2={this.state.set2}
              onChange={this.updatePreferences}
              numplayers={this.state.numplayers}
            />
            <input className="m-2 btn btn-primary" type="submit" />
            <label className="text-danger mt-3 ms-3 ">
              Note: Please make sure there are no duplicates in each priority
              list to be able to proceed
            </label>
          </form>
        ) : null}
        {this.state.answersui ? (
          <Algo set1={this.state.set1} set2={this.state.set2} />
        ) : null}
      </div>
    );
  }
}

export default App;
