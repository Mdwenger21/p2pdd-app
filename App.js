import React, { Component } from 'react';
import { Alert, AppRegistry, Platform, StyleSheet, Text, 
		TouchableHighlight, TouchableOpacity, TouchableNativeFeedback,
		TouchableWithoutFeedback, View, TextInput, Button, Image } from 'react-native';
		
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
		
		<View style ={{flex: 1}}>
			<View style={styles.HeaderBar}>
				<Text style={styles.HeaderFont}> {'\n'} Peer To Peer Drone Delivery </Text>
			</View>
			<View style={styles.AppBackground}>	
				<View style={styles.TextStyle}>
					<Text style={styles.EnterTextFont}> {'\n'} Enter your address below: </Text>
				</View>
				<View style={styles.TextEntryStyle}>
					<TextInput
					style={{height: 35}}
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
			<View style={styles.LogoBackground}>
				<Image source={require('./DroneLogo.png')} style={{flex: 15, flexDirection: 'row', justifyContent: 'center'}}/>
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
	},
	HeaderBar: {
		flex: 1,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'center',		
	},
	AppBackground: {
		flex: 3,
		backgroundColor: 'lightslategrey',
	},
	HeaderFont: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 25,
	},
	EnterTextFont: {
		fontSize: 20,
	},
	LogoBackground: {
		flex: 5,
		backgroundColor: 'white',
	}
	
})

// Google Maps API key 
