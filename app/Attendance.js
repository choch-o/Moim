import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import GeolocationExample from './GeolocationExample'

export default class Attendance extends Component {

  static get defaultProps() {
    return {
      title: 'Attendance'
    };
  }

  constructor(props) {
    super(props);
  
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  }

  watchID = (null: ?number);

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({ initialPosition });
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          style={{ width: 50, height: 50 }}
          onPress={ () => this.props.navigator.pop() } >
          <Text style={{ padding: 40 }}>Back</Text>
        </TouchableHighlight>
        <Text>
          <Text>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text>Current position: </Text>
          {this.state.lastPosition}
        </Text> 
      </View>     
    );
  }
}

Attendance.propTypes = {
  title: PropTypes.string.isRequired,
};