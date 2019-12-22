import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderComponent from './src/screens/Header';
import ListRepositories from './src/screens/ListRepositories';

export default function App() {
  return (
    <View>
      <HeaderComponent />
      <ListRepositories />
    </View>
  );
}
