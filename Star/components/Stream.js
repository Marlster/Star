import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import Player from './Player';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';

const source = {
	uri: 'https://garfield.standrewsradio.com:8081/stream/1.mp3'
  };

export default class Stream extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			playingStatus: "nosound"
		}
	}

	handlePress = () => {
		var playing = this.state.playing
		this.setState({playing: !playing});
	}

	async _playRecording() {
		const { sound } = await Audio.Sound.createAsync(
		source,
		{
			shouldPlay: true
		},
		this._updateScreenForSoundStatus
		);
		this.sound = sound;
		this.setState({
		playingStatus: 'playing',
		});
	}
	
	_updateScreenForSoundStatus = status => {
		if (status.isPlaying && this.state.playingStatus !== 'playing') {
		this.setState({ playingStatus: 'playing' });
		} else if (!status.isPlaying && this.state.playingStatus === 'playing') {
		this.setState({ playingStatus: 'donepause' });
		}
	};
	
	async _pauseAndPlayRecording() {
		if (this.sound != null) {
		if (this.state.playingStatus == 'playing') {
			//console.log('pausing...');
			await this.sound.pauseAsync();
			//console.log('paused!');
			this.setState({
			playingStatus: 'donepause',
			});
		} else {
			//console.log('playing...');
			await this.sound.playAsync();
			//console.log('playing!');
			this.setState({
			playingStatus: 'playing',
			});
		}
		}
	}
	
	_syncPauseAndPlayRecording() {
		if (this.sound != null) {
		if (this.state.playingStatus == 'playing') {
			this.sound.pauseAsync();
		} else {
			this.sound.playAsync();
		}
		}
	}
	
	_playAndPause = () => {
		switch (this.state.playingStatus) {
		case 'nosound':
			this._playRecording();
			break;
		case 'donepause':
		case 'playing':
			this._pauseAndPlayRecording();
			break;
		}
	};

	getIcon = () => {
		if (this.state.playingStatus === 'playing') {
			return (
				<Image
					source={require("../assets/pause.png")}
					style={styles.image}
				/>
			);
		} else {
			return (
				<Image
					source={require("../assets/play.png")}
					style={styles.image}
				/>
			);
		}
	}

	render() {
		return (
			<TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={this._playAndPause}>
				{this.getIcon()}
				<View style={styles.separator} />
			</TouchableOpacity>
		);
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