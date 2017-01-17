import {
	AppRegistry,
	TextInput,
	Text,
	View,
	Button,
	TouchableHighlight,
	StyleSheet,
	dismissKeyboard,
	TouchableWithoutFeedback
} from 'react-native';

import React, {Component} from 'react'
import * as firebase from 'firebase'
import Database from './includes/firebase/database'
import { Hoshi } from 'react-native-textinput-effects'
import DismissKeyboard from 'dismissKeyboard'

export default class Signup extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	nickname: "",
	  	duplicate: ""
	  };

	  this.setNickname = this.setNickname.bind(this)
	}

	_navigate(scene, name) {
		this.props.navigator.push({
		  name: scene,
		  passProps: {
		  	name: name
		  }
		})
	}

	setNickname() {
		var c = this
		var user = firebase.auth().currentUser;
		if (Database.checkDuplicateNickname(this.state.nickname)) {
			this.setState({ duplicate: "Nickname already exists!" })
		} else {
			this.setState({ duplicate: "" })
			Database.addNickname(this.state.nickname)
			user.updateProfile({
				displayName: this.state.nickname
			}).then(function() {
				c._navigate('Home', 'from signup')
			}, function(error) {
				console.error(error)
			})
		}
	}

	render() {
		console.log("RENDER")
		console.log(this.state.duplicate)
		return (
			<TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
				<View style={{
    				flex: 1,
    				backgroundColor: '#F9F7F6',
    				paddingTop: 50
    			}}>
    				<View>
	    				<Text style={ styles.title }>Choose your nickname</Text>
	    				<Hoshi
	    					label={"NICKNAME"}
	    					borderColor={'#d4e3ef'}
	    					backgroundColor={'#F9F7F6'}
	    					onChangeText={(nickname) => this.setState({nickname})}
	    					autoCapitalize="none"
	    				/>
	    				<Text style={ styles.duplicate }>{ this.state.duplicate }</Text>
	    				<View style={styles.submit}>
	    					<TouchableHighlight onPress={this.setNickname} style={ styles.submit } >
	    						<Text style={ styles.buttonText }>SUBMIT</Text>
	    					</TouchableHighlight>
	    				</View>
	    			</View>
    			</View>
			</TouchableWithoutFeedback>
		)
	}
}

const styles = StyleSheet.create({

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "200",
        opacity: 0.8,
        marginBottom: 50
    },

   	duplicate: {
   		fontSize: 15,
   		fontWeight: '100',
   		marginLeft: 15,
   		marginTop: 10,
   		marginBottom: 60,
   		color: '#ff7777'
   	},

    submit: {
    	backgroundColor: 'powderblue',
    	height: 80,
    	justifyContent: 'center',
    	alignSelf: 'stretch'
    },

    buttonText: {
    	textAlign: 'center',
    	fontSize: 18,
    	color: 'white',
    	fontWeight: "100",
    }

});