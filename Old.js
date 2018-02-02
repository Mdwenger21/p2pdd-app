import React, { Componenet } from 'react';
import { AppRegistry, Text, TextInput, View, Button } from 'react-native';



export default class App extends React.Component {
	
  //constructor(props) {
	//  super(props);
    //  this.state = {text: ''}; 
  //}	
  
  //_onPressButton() {
		  
	 // }
  

  render() {
    return (
		<View style={styles.BackSetting}>
			<View style={styles.TextStyle}>
				<Text>{'\n'}{'\n'} Enter an address bbbelow</Text>
	
				//<TextInput
				//style={{height: 40}}
				//placeholder="Type Here"
				//onChangeText={(text) => this.setState({text})}
				///>
			</View>
			//<View style={styles.ButtonBox}>
			//	<Button
			//		onPress={this._onPressButton}
			//		title="Press to deliver"
			//		color="#841584"
			//	/>
			//</View>
		</View>
    );
  }
}

const styles = StyleSheet.create({
	BackSetting: {
		justifyContent: 'center',
	},
	//ButtonBox: {
	//	margin: 20,
	//	flexDirection: 'row',
	},
	TextStyle: {
		flex: 1,
		flexDirection: 'row',
	},
});