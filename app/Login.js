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
import { Hoshi } from 'react-native-textinput-effects'
import DismissKeyboard from 'dismissKeyboard'

export default class Login extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email: "",
	  	password: "",
	  	response: ""
	  };

	  this.signup = this.signup.bind(this);
	  this.login = this.login.bind(this);
	}

	_navigate(scene, name) {
		this.props.navigator.push({
		  name: scene,
		  passProps: {
		  	name: name
		  }
		})
	}

    async signup() {

        DismissKeyboard();

        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "account created"
            });

            setTimeout(() => {
            	this._navigate('Home', 'HOMEHOME')
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    async login() {

        DismissKeyboard();

        try {
            await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);

            this.setState({
                response: "Logged In!"
            });

            setTimeout(() => {
                this._navigate('Home', 'HOMEHOME')
            }, 1500);

        } catch (error) {
            this.setState({
                response: error.toString()
            })
        }

    }

    render() {
    	return (
    		<TouchableWithoutFeedback onPress={() => {DismissKeyboard()}}>
    			<View style={{
    				flex: 1,
    				backgroundColor: '#F9F7F6',
    				paddingTop: 50
    			}}>
	    			<View>
	    				<Text style={ styles.title }>Login</Text>
	    				<Hoshi
	    					label={"EMAIL"}
	    					borderColor={'#d4e3ef'}
	    					backgroundColor={'#F9F7F6'}
	    					onChangeText={(email) => this.setState({email})}
	    					keyboardType="email-address"
	    					autoCapitalize="none"
	    					style={{ marginBottom: 30 }}
	    				/>
	    				<Hoshi
	    					label={"PASSWORD"}
	    					borderColor={'#d4e3ef'}
	    					backgroundColor={'#F9F7F6'}
	    					onChangeText={(password) => this.setState({password})}
	    					password={true}
	    					autoCapitalize="none"
	    					
	    				/>
	    				<View style={styles.submit}>
	    					<TouchableHighlight onPress={this.signup} style={ styles.signup } >
	    						<Text style={ styles.buttonText }>SIGN UP</Text>
	    					</TouchableHighlight>
	    					<TouchableHighlight onPress={this.login} style={ styles.login } textStyle={{ fontSize: 18 }} >
	    						<Text style={ styles.buttonText }>LOGIN</Text>
	    					</TouchableHighlight>
	    				</View>
	    			</View>
	    			<View>
	    				<Text style={ styles.response }>{this.state.response}</Text>
	    			</View>
    			</View>
    		</TouchableWithoutFeedback>
    	);
    }
}

const styles = StyleSheet.create({

    formGroup: {
        padding: 50
    },

    title: {
        paddingBottom: 16,
        textAlign: "center",
        color: "#000",
        fontSize: 35,
        fontWeight: "200",
        opacity: 0.8,
    },

    submit: {
        paddingTop: 30
    },

    response: {
        textAlign: "center",
        paddingTop: 0,
        padding: 50,
    },

    signup: {
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
    },

    login: {
    	backgroundColor: 'steelblue',
    	height: 80,
    	justifyContent: 'center',
    	alignSelf: 'stretch'
    }
});