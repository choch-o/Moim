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

import * as firebase from 'firebase';

import Home from './Home';
import Attendance from './Attendance';
import Vote from './Vote';
import Login from './Login';
import Signup from './Signup';
import Meetings from './Meetings';
import Firebase from './includes/firebase/firebase';

export default class Moim extends Component {

  constructor(props) {
    super(props)

    Firebase.initialise()

    this.getInitialView()

    this.state = {
      userLoaded: false,
      initialView: null
    };

    this.getInitialView = this.getInitialView.bind(this);
  }

  getInitialView() {
    firebase.auth().onAuthStateChanged((user) => {

      let initialView = user ? "Home" : "Login";
      console.log(initialView)
      console.log("GET INITIAL VIEW")

      this.setState({
        userLoaded: true,
        initialView: initialView
      })
    });

  }

  renderScene(route, navigator) {
    console.log(route.name)
    if (route.name == 'Home') {
      return <Home navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'Attendance') {
      return <Attendance navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'Vote') {
      return <Vote navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'Login') {
      return <Login navigator={navigator} {...route.passProps} />
    }
    if (route.name == 'Signup') {
      return <Signup navigator={navigator} {...route.passProps} />
    } 
    if (route.name == 'Meetings') {
      return <Meetings navigator={navigator} {...route.passProps} />
    }
  }

  render() {
    if (this.state.userLoaded) {
      console.log(this.state.initialView)
      console.log(this)
      console.log(this.renderScene)
      return (
        <Navigator
          style={{ flex: 1 }}
          initialRoute={{ name: this.state.initialView }}
          renderScene={ this.renderScene } />
      );
    } else {
      return null;
    }
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
