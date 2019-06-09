import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';

export default class Stream extends React.Component {
	state = {
		playing: false
	};

	pause = () => {
		this.setState({playing: false});
	}

	play = () => {
		this.setState({playing: true});
	}

	render() {
		if (this.state.playing) {
			return (
				<TouchableOpacity style = {styles.container} activeOpacity={0.5} onPress={this.pause}>
					<Image
						source={require('../assets/play.png')}
						style={styles.image}
					/>
					<View style={styles.separator} />
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity style = {styles.container} activeOpacity={0.5} onPress={this.play}>
					<Image
						source={require('../assets/pause.png')}
						style={styles.image}
					/>
					<View style={styles.separator} />
				</TouchableOpacity>
			);
		}	
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {

	},
	separator: {

	}
});