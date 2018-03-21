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

  approveDestination(id, address) {
  	return fetch('http://18.218.103.113/destinations/' + id + '/approval', {
  		method: 'GET',
  		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
		}).then((response) => response.json())
		.then((responseJson) => {
			console.log(responseJson);
			Alert.alert("Destination approved", "The drone is on its way to " + address + "!")
		})
		.catch((error) => {
			console.error(error);
		});
  }

  rejectDestination(id) {
  	return fetch('http://18.218.103.113/destinations/' + id +'/', {
  		method: 'DELETE',
  		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
		}).then((response) =>
			Alert.alert("Destination rejected", "This destination has been deleted.")
		)
		.catch((error) => {
			console.error(error);
		});
  }

  checkDestinationToApprove() {
  	return fetch('http://18.218.103.113/destinations/approval', {
  		method: 'GET',
  		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		}
		}).then((response) => response.json())
		.then((responseJson) => {
			Alert.alert("Approval Needed", "Should the drone fly to " + responseJson.address +"?", [
				{ text: "Approve", onPress: () => this.approveDestination(responseJson.id, responseJson.address) },
				{ text: "Reject", onPress: () => this.rejectDestination(responseJson.id) },
				{ text: "Cancel", onPress: () => console.log('Cancel pressed') }
			])
		})
		.catch((error) => {
			Alert.alert("No pending destinations", "Please enter an address and wait for the drone to request.");
		});
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
					style={{height: 35, textAlign: 'center', marginBottom: 25}}
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
				<View style={styles.ButtonStyle}>
					<Button
						onPress={() => {
							this.checkDestinationToApprove();
					}}
					title="Press to approve destination"
					/>
				</View>
			</View>
			<View style={styles.LogoBackground}>
				<Image source={require('./DroneLogo.png')} style={{width: 450, height: 300}} resizeMode='center'/>
			</View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
	TextEntryStyle: {
		padding: 5
	},
	TextStyle: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	ButtonStyle: {
		flexDirection: 'row',
		justifyContent: 'center'
	},
	HeaderBar: {
		flex: 1,
		backgroundColor: 'red',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 0	
	},
	AppBackground: {
		flex: 3,
		backgroundColor: 'white'
	},
	HeaderFont: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 25,
		marginTop: 15
	},
	EnterTextFont: {
		fontSize: 20,
		color: 'red'
	},
	LogoBackground: {
		flex: 5,
		backgroundColor: 'white',
		marginLeft: '3%'
	}
	
})

// Google Maps API key 
