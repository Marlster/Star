import React from 'react';
import { StyleSheet} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Counter from './Counter';
import Stream from './components/Stream';

const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Stream url="https://rapid.standrewsradio.com:8081/stream/1.mp3"/>
        {/* <Counter/> */}
      </Provider>
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