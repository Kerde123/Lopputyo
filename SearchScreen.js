import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Input, ListItem, Avatar } from '@rneui/themed';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';
import BookScreen from './BookScreen';


export default function SearchScreen() { 
  // tilamuuttujien alustaminen
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [therapy, setTherapy] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');

  const [therapists, setTherapists] = useState([]);

  const db = SQLite.openDatabase('therapists.db'); // therapists-tietokannan avaus
  const navigation = useNavigation(); // navigaatio-muutujan alustaminen


  useEffect(() => { // kun komponentti latautuu, tehdään tietokantakysely
    db.transaction(tx => {
      tx.executeSql( // taulun luonti, jos ei ole olemassa
        'CREATE TABLE IF NOT EXISTS therapists (id INTEGER PRIMARY KEY AUTOINCREMENT, etunimi TEXT, sukunimi TEXT, terapiasuuntaus TEXT, sukupuoli TEXT, kaupunki TEXT, hinta TEXT, kuva TEXT);'
      );
    });
  }, []);

  const searchTherapists = () => { // etsii terapeutteja hakuehtojen perusteella
    db.transaction(tx => {
      const query =
        'SELECT * FROM therapists WHERE etunimi LIKE ? AND sukunimi LIKE ? AND terapiasuuntaus LIKE ? AND sukupuoli LIKE ? AND kaupunki LIKE ? AND hinta LIKE ?;';
      tx.executeSql(
        query,
        [
          '%' + firstName + '%',
          '%' + lastName + '%',
          '%' + therapy + '%',
          '%' + gender + '%',
          '%' + city + '%',
          '%' + price + '%',
        ],
        (_, { rows }) => {
          setTherapists(rows._array);
        }
      );
    });
  };

  // yksittäisen terapeutin tietojen renderöinti
  const renderItem = ({ item }) => ( 
    <ListItem bottomDivider style={{backgroundColor: 'darkslategrey'}}>
       <ListItem.Content style={styles.container}>
      {item.kuva && (
        <Avatar
          source={{ uri: item.kuva }}
          style={{ width: 100, height: 100 }} 
        />
      )}
        <ListItem.Title style={styles.title}>
          {item.etunimi} {item.sukunimi}
        </ListItem.Title>
        <ListItem.Subtitle style={styles.title}>{item.terapiasuuntaus}</ListItem.Subtitle>
        <ListItem.Subtitle style={styles.title}>
          {item.sukupuoli}, {item.kaupunki}
        </ListItem.Subtitle>
        <ListItem.Subtitle style={styles.title}>{item.hinta}</ListItem.Subtitle>
        <Button title="Varaa vastaanotto" size="lg" buttonStyle={styles.button} 
        onPress={() => navigation.navigate('Book', { therapist: item })} />
      </ListItem.Content>
    </ListItem>
  );

  return (
    <View style={{flex: 1, backgroundColor: 'darkslategrey'}}>
      <ScrollView>
      <View style={styles.searchContainer}>
        {/* kentät, joihin tiedot syötetään */}
      <Input 
        placeholder="Etunimi"
        value={firstName}
        onChangeText={setFirstName}
      />
      <Input
        placeholder="Sukunimi"
        value={lastName}
        onChangeText={setLastName}
      />
      <Input
        placeholder="Terapiasuuntaus"
        value={therapy}
        onChangeText={setTherapy}
      />
      <Input
        placeholder="Sukupuoli"
        value={gender}
        onChangeText={setGender}
      />
      <Input
        placeholder="Kaupunki"
        value={city}
        onChangeText={setCity}
      />
      <Input
        placeholder="Hinta"
        value={price}
        onChangeText={setPrice}
      /> 
      {/*button, jolla haetaan */}
      <Button title="HAE" onPress={searchTherapists} size="lg" buttonStyle={styles.button}/> 
      </View>
      <FlatList
        style={{flex: 1, backgroundColor: 'darkslategrey'}}
        contentContainerStyle={{backgroundColor: 'darkslategrey'}}
        data={therapists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />  
      </ScrollView> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'darkslategrey',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  inputstyle: {
    fontSize: 20,
    color: 'white',
    padding: 5,
  },
  text: {
    marginVertical: 10,
    color: 'white',
  },
  button: {
    color: 'white',
    backgroundColor: 'darkcyan',
    margin: 10,
  },
  searchContainer: {
    backgroundColor: 'darkslategrey',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  });