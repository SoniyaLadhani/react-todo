import React, { Component } from "react";

export class TodoActions extends Component {
  render() {
    return (
      <div style={{ display: "flex", paddingBottom: "10px", margin: "0 24rem" }}>
        <input
          style={{ marginRight: '5px' }}
          type="button"
          className="btn"
          value="Display All"
          onClick={this.props.displayAll}
        />
        <input
          type="button"
          className="btn"
          value="Display Completed"
          onClick={this.props.displayCompleted}
        />
      </div>
    );
  }
}

export default TodoActions;
