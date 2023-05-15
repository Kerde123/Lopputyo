import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import SearchScreen from './SearchScreen';
import AddScreen from './AddScreen';
import BookScreen from './BookScreen';
import InfoScreen from './InfoScreen';
import TestScreen from './TestScreen';

// alareunan navigaattori
const Tab = createBottomTabNavigator();

// komponentti, joka palauttaa alareunan navigaattorin
export default function HomeScreen() {

  return (
    <Tab.Navigator
      screenOptions={({ route } ) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // tabsin ikonien määrittely
          if (route.name === 'Info') {
            iconName = focused
              ? 'information-circle'
              : 'information-circle-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Add') {
            iconName = focused ? 'add' : 'add-outline';
          } else if (route.name === 'Book') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Test') {
            iconName = focused ? 'disc' : 'disc-outline';
          }

          // Ionicons-komponentti, näyttää oikean ikonin valittuna tai ei-valittuna tilassa
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#90EE90',
        tabBarInactiveTintColor: '#FFF',
        tabBarLabelStyle: { fontSize: 12, },
        tabBarStyle: { backgroundColor: 'darkslategrey', }
      })}
    >
      {/* lisätään navigaattoriin eri välilehdet eli Screen-komponentit */}
      <Tab.Screen
        name="Info"
        component={InfoScreen}
        options={{ title: 'INFO',
        headerStyle: {
          backgroundColor: 'darkslategrey',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'HAE JA VARAA',
        headerStyle: {
          backgroundColor: 'darkslategrey',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
        />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{ title: 'Lisää',
        headerStyle: {
          backgroundColor: 'darkslategrey',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}

      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{ title: 'Testaa',
        headerStyle: {
          backgroundColor: 'darkslategrey',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }, 
      }}
      />
    </Tab.Navigator>
  );
}
