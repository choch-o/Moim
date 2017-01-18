import React, { Component, PropTypes } from 'react';
import { View, Text, Button, StyleSheet, Navigator, TouchableHighlight } from 'react-native';
import Attendance from './Attendance'

import * as firebase from 'firebase'

export default class Home extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	pressStatus: false,
	  	uid: "",
	  	nickname: firebase.auth().currentUser.displayName
	  };
	  this.logout = this.logout.bind(this);

	}

	_navigate(scene, name) {
		this.props.navigator.push({
		  name: scene,
		  passProps: {
		  	name: name
		  }
		})
	}

	async logout() {
		try {
			await firebase.auth().signOut();

			this._navigate('Login', 'LOGOUT');
		} catch (error) {
			console.log(error)
		}
	}

	async componentDidMount() {
		try {
			let user = await firebase.auth().currentUser;

			this.setState({
				uid: user.uid
			});
		} catch (error) {
			console.log(error);
		}
	}

	render() {
	  return (
	    <View style={{ flex: 1 }} >
	    	<View style={ styles.navbar }>
	    		<Text style={ styles.userInfo }>{ this.state.nickname }</Text>
		    	<TouchableHighlight style={ styles.logout } onPress={ this.logout }>
		    		<Text style={ styles.logoutText }>LOGOUT</Text>
		    	</TouchableHighlight>
	    	</View>
	    	<TouchableHighlight
	    		style={ this.state.pressStatus ? styles.buttonPress : styles.lightblue }
	    		onPress={ () => this._navigate('Meetings', 'from home') }>
	    		<Text style={ styles.textStyle }>출석체크</Text>
	    	</TouchableHighlight>

	    </View>     
	  );
	}
	/*
		<TouchableHighlight
    		style={ this.state.pressStatus ? styles.buttonPress : styles.darkblue}
    		onPress={ () => this._navigate('Vote', 'Hello Voters') }>
    		<Text style={ styles.textStyle}>투표</Text>
    	</TouchableHighlight>
	*/
}

const styles = StyleSheet.create({
	textStyle: {
		fontSize: 60,
		color: 'mintcream',
		fontWeight: '100'
	},
	buttonPress: {
		flex: 8,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'skyblue'
	},
	darkblue: {
		flex: 4, 
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'steelblue'
	},
	lightblue: {
		flex: 8,
		justifyContent: 'center',
		padding: 20,
		backgroundColor: 'powderblue'
	},
	navbar: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 15,
		flexDirection: 'row'
	},
	userInfo: {
		flex: 6,
		paddingLeft: 15,
		fontSize: 18,
		fontWeight: '100',
		color: '#444444'
	},
	logout: {
		flex: 4,
		justifyContent: 'center',
	},
	logoutText: {
		textAlign: 'right',
		paddingRight: 15,
		fontSize: 18,
		fontWeight: '100',
		color: '#444444'
	}
});