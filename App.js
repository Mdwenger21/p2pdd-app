import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, 
		TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
		TouchableWithoutFeedback, View, TextInput, Button } from 'react-native';
		
import $ from 'jquery'
import MapView from 'react-native-maps';

export default class DroneDeliveryApp extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  
  function MakeGoogleMapsApiRequest() {
	  return fetch('https://maps.googleapis.com/maps/api/geocode/json?address=Florence')
		.then((response) => response.json())
		.then((responseJson) => {
			return responseJson.
		})
		.catch((error) => {
			console.error(error);
		});
  }
  
  render() {
    return (
		
		<View>
			<View style={styles.TextStyle}>
				<Text> {'\n'} {'\n'} Enter your address below: </Text>
			</View>
			<View style={styles.TextEntryStyle}>
				<TextInput
				style={{height: 40}}
				placeholder="Enter your address here"
				onChangeText={(text) => this.setState({text})}
				/>
			</View>
			<View style={styles.ButtonStyle}>
				<Button
					onPress={() => {
						Alert.alert('Sent too', this.state.text)
				}}
				title="Press to send address"
			/>
			</View>
			
		</View>
    );
  }
}

const styles = StyleSheet.create({
	TextEntryStyle: {
		padding: 5,
	},
	TextStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	ButtonStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
	}
})

// Google Maps API key 
