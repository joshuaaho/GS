import React, { Component } from "react";

class RankPlayers extends Component {
  aOptions = () => {
    const aOptions = this.props.set2.map((b) => {
      return (
        <option key={b.id} value={b.id}>
          {b.name}
        </option>
      );
    });
    return aOptions;
  };
  aSelects = (person) => {
    const aSelects = this.props.set1.map((a, index) => {
      return (
        <select
          className="select-form"
          key={index}
          defaultValue={this.props.set2[index].id}
          onChange={(e) => {
            this.props.onChange(person, e, index, this.props.set1);
          }}
        >
          {this.aOptions()}
        </select>
      );
    });
    return aSelects;
  };
  aRanks = () => {
    const aRanks = this.props.set1.map((a) => {
      return (
        <div key={a.id} className="m-2">
          {a.name}'s Priority {this.aSelects(a)}
        </div>
      );
    });
    return aRanks;
  };

  bOptions = () => {
    const bOptions = this.props.set1.map((a) => {
      return (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      );
    });
    return bOptions;
  };
  bSelects = (person) => {
    const bSelects = this.props.set2.map((b, index) => {
      return (
        <select
          key={index}
          defaultValue={this.props.set1[index].id}
          onChange={(e) => {
            this.props.onChange(person, e, index, this.props.set2);
          }}
        >
          {this.bOptions()}
        </select>
      );
    });
    return bSelects;
  };
  bRanks = () => {
    const bRanks = this.props.set2.map((b) => {
      return (
        <div key={b.id} className="m-2">
          {b.name}'s Priority {this.bSelects(b)}
        </div>
      );
    });
    return bRanks;
  };

  render() {
    return (
      <div>
        {this.aRanks()}
        {this.bRanks()}
      </div>
    );
  }
}

export default RankPlayers;
