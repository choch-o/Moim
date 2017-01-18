import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableHighlight, Button, StyleSheet } from 'react-native';

import GeolocationExample from './GeolocationExample'
import * as firebase from 'firebase'
import Database from './includes/firebase/database'

export default class Attendance extends Component {

  constructor(props) {
    super(props);
    this.props = props
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
    return fetch('http://52.79.155.110:3000/attendance/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mongo_id: this.props.name.mongo_id
      })
    })
    // return fetch('http://52.78.52.132:3000/attendance/location/n1')
    
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("Location Response")
        console.log(responseJson)
        console.log("Current location")
        console.log(this.state.currentLatitude)
        console.log(this.state.currentLongitude)
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
        Database.addParticipant(this.props.name.mongo_id, firebase.auth().currentUser.displayName)
      }
    }
  }

  componentDidUpdate() {
    var currLat = parseFloat(this.state.currentLatitude).toFixed(3)
    var currLong = parseFloat(this.state.currentLongitude).toFixed(3)
    var targetLat = parseFloat(this.state.targetLatitude).toFixed(3)
    var targetLong = parseFloat(this.state.targetLongitude).toFixed(3)

    console.log("UPDATE TEST")
    console.log(targetLat)
    console.log(targetLong)
    console.log(currLat)
    console.log(currLong)
    if (!this.state.isNearby) {
      if (!isNaN(currLat) && !isNaN(currLong) && !isNaN(targetLat) && !isNaN(targetLong)) {
        if (((currLat - 0.001) <= targetLat) && ((currLat + 0.001) >= targetLat) && ((currLong - 0.001) <= targetLong)
          && ((currLong + 0.001) >= targetLong)) {
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
        checkButton = <Text style={ styles.buttonText }>CHECKED</Text>
      }
      else {
        checkButton = <TouchableHighlight onPress={ this.onCheckPressed }>
          <Text style={ styles.buttonText }>CHECK</Text>
        </TouchableHighlight>
      }
    } else {
      checkButton = <Text style={ styles.buttonText }>NOT AVAILABLE</Text>
    }

    return (
      <View style={{ flex: 1 }} >
        <View style={ styles.navbar }>
            <TouchableHighlight
            onPress={ () => this.props.navigator.pop() } >
              <Text style={ styles.backText }>BACK</Text>
          </TouchableHighlight>
        </View>
        <View style={ styles.eventView }>
          <Text style={ styles.title }>
            { this.props.name.title }
          </Text>
          <Text style={ styles.time }>
            { this.props.name.time }
          </Text>
        </View>
        <View style={ styles.checkButton }>
            { checkButton }
        </View>
        
      </View>     
    );
  }
}

const styles = StyleSheet.create({
  backText: {
    textAlign: 'left',
    paddingLeft: 15,
    fontSize: 18,
    fontWeight: '100',
    color: '#444444'
  },
  checkButton: {
    flex: 4,
    backgroundColor: 'pink',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: '100',
    color: 'white'
  },
  eventView: {
    flex: 4,
    justifyContent: 'center',
    backgroundColor: '#ffeeee'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '100',
    marginBottom: 50
  },
  time: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '100'
  },
  navbar: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    flexDirection: 'row'
  },
});
