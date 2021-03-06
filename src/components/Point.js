import React from "react";

const Point = (props)=>{
  return (
    <li
      role="button"
      className="point"
      tabIndex="0"
      onKeyPress={props.openWindow.bind(
        this,
        props.data.marker
      )}
      onClick={props.openWindow.bind(this, props.data.marker)}
    >
      {props.data.name}
    </li>
  );
}

export default Point;
