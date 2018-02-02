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

  sendDestination(lat, lon) {
  	return fetch('http://18.218.103.113/destinations/', {
  		method: 'POST',
  		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
  		body: JSON.stringify({
  			lat: lat,
  			lon: lon,
  			pending: true
  		})
		}).then((response) => response.json())
		.then((responseJson) => {
			Alert.alert("Destination Sent", "Destination ID is " + responseJson.id)
		})
		.catch((error) => {
			console.error(error);
		});
  }
  
  makeGoogleMapsApiRequest(addr) {
	  return fetch('https://maps.googleapis.com/maps/api/geocode/json?address="' + addr +'"')
		.then((response) => response.json())
		.then((responseJson) => {
			var lat = responseJson.results[0].geometry.location.lat;
			var lon = responseJson.results[0].geometry.location.lng;
			this.sendDestination(lat, lon)
		})
		.catch((error) => {
			Alert.alert("Destination not found", "Please try another address.")
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
						this.makeGoogleMapsApiRequest(this.state.text);
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
