import React, { Component } from "react";

class EnterPlayers extends Component {
  renderPlayers = () => {
    const list = this.props.set.map((c) => {
      return (
        <input
          type="text"
          key={c.id}
          required
          onChange={(e) => {
            this.props.onChange(e, c, this.props.set);
          }}
        />
      );
    });
    return list;
  };
  render() {
    return (
      <div>
        <div className="text-primary m-3">
          Please Enter The Names For Group {this.props.group}
        </div>
        <div className="m-3">{this.renderPlayers()}</div>
      </div>
    );
  }
}

export default EnterPlayers;
