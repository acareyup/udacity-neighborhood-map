import React, { Component } from "react";
import Point from './Point'

class List extends Component {

  constructor(props) {
    super(props);
    this.state = {
      points: "",
      query: "",
      suggestions: true
    };

    this.filterPoints = this.filterPoints.bind(this);
  }

  filterPoints(event) {
    this.props.closeWindow();
    const { value } = event.target;
    var filteredPoints = [];
    this.props.points.forEach(function(location) {
      if (location.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        location.marker.setVisible(true);
        filteredPoints.push(location);
      } else {
        location.marker.setVisible(false);
      }
    });

    this.setState({
      points: filteredPoints,
      query: value
    });
  }

  componentWillMount() {
    this.setState({
      points: this.props.points
    });
  }

  render() {
    var pointList = this.state.points.map(function(listItem, index) {
      return (
        <Point
          key={index}
          openWindow={this.props.openWindow.bind(this)}
          data={listItem}
        />
      );
    }, this);

    return (
      <div className="search-area">
        <input
          role="search"
          aria-labelledby="filter"
          id="search-field"
          className="search-input"
          type="text"
          placeholder="Filter"
          value={this.state.query}
          onChange={this.filterPoints}
        />
        <ul className="location-list">
          {this.state.suggestions && pointList}
        </ul>
      </div>
    );
  }
}

export default List;
