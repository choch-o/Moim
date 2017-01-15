import React, { Component } from 'react';
import {
	Text,
	View,
	StyleSheet
} from 'react-native';

export default class GeolocationExample extends Component {
	render() {
		return (
	      <View style = {styles.container}>
	      	<Text>Test</Text>         
	      </View>
		);
	}
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   boldText: {
      flex: 1,
      fontWeight: 'bold'
   }
});