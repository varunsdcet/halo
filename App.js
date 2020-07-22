/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, {Component} from 'react';
   import {Platform, StyleSheet, Text, View} from 'react-native';
   import AppNavigator from './Navigator.js';

import AnimatedSplash from "react-native-animated-splash-screen";





 const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
 });

 type Props = {};
 export default class App extends Component<Props> {
   state = {
    isLoaded: false
  }

  setAppLoaded = () => {
    alert('fi')
    this.setState({ isLoaded: true });
  };
  render() {
   //StatusBar.setBarStyle('light-content', true);
    return (


        <AppNavigator />
  

    );
  }
 }
