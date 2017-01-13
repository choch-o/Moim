import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class Attendance extends Component {
  static get defaultProps() {
    return {
      title: 'Attendance'
    };
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          style={{ width: 200, height: 200 }}
          onPress={ () => this.props.navigator.pop() } >
          <Text style={{ padding: 40 }}>Back to Home</Text>
        </TouchableHighlight>
      </View>     
    );
  }
}

Attendance.propTypes = {
  title: PropTypes.string.isRequired,
};