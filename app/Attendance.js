import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Button, StyleSheet } from 'react-native';

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
      lastPosition: 'unknown',
      currentLatitude: 'unknown',
      currentLongitude: 'unknown',
      targetLatitude: 'unknown',
      targetLongitude: 'unknown',
      isNearby: false
    };
    this.getTargetLocation()
      .then((location) => {
        this.setState({targetLatitude: location.latitude})
        this.setState({targetLongitude: location.longitude})
      })
    this.onCheckPressed = this.onCheckPressed.bind(this)
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
      this.setState({currentLatitude: position.coords.latitude})
      this.setState({currentLongitude: position.coords.longitude})
    });    
    
  }

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getTargetLocation() {
    return fetch('http://52.78.52.132:3000/attendance/location/n1')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson
      })
      .catch((error) => {
        console.error(error)
      });
  }

  onCheckPressed() {
    if (this.state.isNearby) {
      if (this.state.checked != true) {
        this.setState({ checked: true })
      }
    }
  }

  componentDidUpdate() {
    var currLat = parseFloat(this.state.currentLatitude).toFixed(3)
    var currLong = parseFloat(this.state.currentLongitude).toFixed(3)
    var targetLat = parseFloat(this.state.targetLatitude).toFixed(3)
    var targetLong = parseFloat(this.state.targetLongitude).toFixed(3)

    console.log(currLat)
    console.log(currLong)
    console.log(targetLat)
    console.log(targetLong)

    if (!this.state.isNearby) {
      if (!isNaN(currLat) && !isNaN(currLong) && !isNaN(targetLat) && !isNaN(targetLong)) {
        if ((currLat == targetLat) && (currLong == targetLong)) {
          console.log("SET TRUE")
          this.setState({isNearby: true})
        }
      } 
    }
  }


  render() {
    var checkButton;
    if (this.state.isNearby) {
      if (this.state.checked) {
        checkButton = <Text style={{ textAlign: 'center' }}>CHECKED</Text>
      }
      else {
        checkButton = <TouchableHighlight onPress={ this.onCheckPressed }>
          <Text style={ styles.textStyle }>CHECK</Text>
        </TouchableHighlight>
      }
    } else {
      checkButton = <Text style={{ textAlign: 'center' }}>NOT AVAILABLE</Text>
    }

    return (
      <View style={{ flex: 1, flexDirection: 'column' }} >
        <TouchableHighlight
          style={{ flex: 1 }}
          onPress={ () => this.props.navigator.pop() } >
          <Text style={{ padding: 40 }}>Back</Text>
        </TouchableHighlight>
        <Text style={{ flex: 1 }}>2017.01.18 정모</Text>
        <View style={ styles.checkButton }>
          { checkButton }
        </View>
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  checkButton: {
    flex: 3,
    backgroundColor: 'pink',
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 200,
    marginBottom: 200
  },
  textStyle: {
    textAlign: 'center',
  }
});

Attendance.propTypes = {
  title: PropTypes.string.isRequired,
};