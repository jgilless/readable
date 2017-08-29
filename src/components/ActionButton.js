import React, { Component } from "react";
import { Link } from "react-router-dom";

import MdAdd from "react-icons/lib/md/add";

class ActionButton extends Component {
  render() {
    const { destination } = this.props;
    return (
      <div className="action-button">
        <Link to={destination}>
          <MdAdd />
        </Link>
      </div>
    );
  }
}

export default ActionButton;
