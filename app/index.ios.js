/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Home from './Home';
import Attendance from './Attendance';
import Vote from './Vote';

export default class Moim extends Component {

  renderScene(route, navigator) {
    if (route.name == 'Home') {
      return <Home navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'Attendance') {
      return <Attendance navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'Vote') {
      return <Vote navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    return (
      <Navigator
        style={{ flex: 1 }}
        initialRoute={{ name: 'Home' }}
        renderScene={ this.renderScene } />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Moim', () => Moim);
