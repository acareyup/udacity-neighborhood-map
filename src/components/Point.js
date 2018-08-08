import React from "react";

const Point = (props)=>{
  return (
    <li
      role="button"
      className="place"
      tabIndex="0"
      onKeyPress={props.openInfoWindow.bind(
        this,
        props.data.marker
      )}
      onClick={props.openInfoWindow.bind(this, props.data.marker)}
    >
      {props.data.name}
    </li>
  );
}

export default Point;