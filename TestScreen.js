import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const TestScreen = () => {

  // testit, joita käyttäjä voi tehdä
  const tests = [
    {
      name: 'Beckin masennuskysely (BDI)',
      url: 'https://www.mielenterveystalo.fi/fi/oirekyselyt/pitka-masennuskysely-bdi-21',
    },
    {
      name: 'Ahdistuneisuuskysely (GAD-7)',
      url: 'https://www.mielenterveystalo.fi/fi/oirekyselyt/ahdistuneisuuskysely-gad-7',
    },
    {
      name: 'Pakko-oirekysely (OCI-R)',
      url: 'https://www.mielenterveystalo.fi/fi/oirekyselyt/pakko-oirekysely-oci-r',
    },
    {
      name: 'Paniikkioirekysely (PDSS-SR)',
      url: 'https://www.mielenterveystalo.fi/fi/oirekyselyt/paniikkioirekysely-pdss-sr',
    },
    {
      name: 'Uupumuksen oirekysely (KEDS)',
      url: 'https://www.mielenterveystalo.fi/fi/oirekyselyt/uupumuksen-oirekysely-keds',
    },
  ];

  //avaa url-osoitteen uudessa ikkunassa
  const handleLinkPress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OIREKYSELYT</Text>
      <Text style={styles.description}>
        Tältä sivulta löydät linkkejä erilaisiin testeihin, joiden avulla voit kartoittaa oireitasi.
      </Text>
      {tests.map((test, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleLinkPress(test.url)}
          style={styles.testContainer}
        >
          <Text style={styles.testName}>{test.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'darkslategrey',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  testContainer: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'darkcyan',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  testName: {
    fontSize: 18,
    color: 'white',
  },
});

export default TestScreen;
