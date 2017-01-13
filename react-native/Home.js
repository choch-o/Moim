import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Navigator, TouchableHighlight} from 'react-native';
import Attendance from './Attendance'

export default class Home extends Component {
	constructor(props) {
	  super(props);
	  this.state = { pressStatus: false };

	}

  _navigate(scene, name) {
    this.props.navigator.push({
      name: scene,
      passProps: {
      	name: name
      }
    })
  }

	render() {
		const textStyle = {
			fontSize: 60,
			color: 'mintcream'
		}
	  return (
	    <View style={{ flex: 1 }} >
	    	<TouchableHighlight
	    		style={ this.state.pressStatus ? styles.buttonPress : styles.lightblue }
	    		onPress={ () => this._navigate('Attendance', 'Hello World') }>
	    		<Text style={textStyle}>출석체크</Text>
	    	</TouchableHighlight>
	    	<TouchableHighlight
	    		style={ this.state.pressStatus ? styles.buttonPress : styles.darkblue}
	    		onPress={ () => this._navigate('Vote', 'Hello Voters') }>
	    		<Text style={textStyle}>투표</Text>
	    	</TouchableHighlight>
	    </View>     
	  );
	}
}

const styles = StyleSheet.create({
	buttonPress: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'skyblue'
	},
	darkblue: {
		flex: 1, 
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'steelblue'
	},
	lightblue: {
		flex: 1,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'powderblue'
	}
});