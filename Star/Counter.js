import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	return  { 
		count: state.count 
	};
} 

class Counter extends React.Component {
	increment = () => {
		this.props.dispatch({ type: 'INCREMENT' });
	}
			
	decrement = () => {
		this.props.dispatch({ type: 'DECREMENT' });
	}

	render() {
		return (
			<View style={styles.container}>
				<Button 
					onPress={this.increment}
					title="+1"
				/>
				<Button 
					onPress={this.decrement}
					title="-1"
				/>
				<Text>Hello! Count = {this.props.count}</Text>
			</View>
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
});

export default connect(mapStateToProps)(Counter);