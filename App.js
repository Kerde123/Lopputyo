import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import StartScreen from './StartScreen';
import HomeScreen from './HomeScreen';
import BookScreen from './BookScreen';
import * as SQLite from 'expo-sqlite';

// Stack-navigaattorin luonti
const Stack = createNativeStackNavigator();

// 'users.db'-tietokannan luonti
const db = SQLite.openDatabase('users.db');

export default function App() {

  // isLoggedIn alustetaan arvolla 'false'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {!isLoggedIn ? ( // Jos käyttäjä ei ole kirjautunut sisään, näytetään StartScreen, muuten näytetään HomeScreen
        <Stack.Navigator>
          <Stack.Screen name="Aloitus" component={StartScreen} options={{ title: '',
          headerStyle: {
          backgroundColor: 'darkslategrey',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
      }}/>
         <Stack.Screen name="Home" component={HomeScreen} options={{ title: '',
          headerStyle: {
          backgroundColor: 'darkslategrey',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
      }}/>
          <Stack.Screen name="Book" component={BookScreen}/>
        </Stack.Navigator>
      ) : (
        <HomeScreen />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkslategrey',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  textstyle: {
    fontSize: 20,
    color: 'white',
    padding: 5,
  },
  text: {
    marginVertical: 10,
    color: 'white',
  },
});
