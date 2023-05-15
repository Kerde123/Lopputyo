import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button, Input, ListItem, Avatar } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import * as SQLite from 'expo-sqlite';

// therapists-tietokannan luonti
const db = SQLite.openDatabase('therapists.db');

export default function TherapistScreen() { //tilamuuttujat
  const [therapists, setTherapists] = useState([]);
  const [etunimi, setEtunimi] = useState('');
  const [sukunimi, setSukunimi] = useState('');
  const [terapiasuuntaus, setTerapiasuuntaus] = useState('');
  const [sukupuoli, setSukupuoli] = useState('');
  const [kaupunki, setKaupunki] = useState('');
  const [hinta, setHinta] = useState('');
  const [kuva, setKuva] = useState('');

  //ajetaan vain kerran komponentin 1. renderöinnillä -> luo tietokantataulun, jos ei ole olemassa ja hakee kaikki terapeutit
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS therapists (id INTEGER PRIMARY KEY AUTOINCREMENT, etunimi TEXT, sukunimi TEXT, terapiasuuntaus TEXT, sukupuoli TEXT, kaupunki TEXT, hinta TEXT, kuva TEXT);'
      );
    });
    getTherapists();
  }, []);

 // hakee tietokannasta terapeutit ja asettaa tilamuuttujaan
  const getTherapists = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM therapists;', [], (_, { rows }) =>
        setTherapists(rows._array)
      );
    });
  };
 
  // terapeutin lisäys -toiminto
  const handleAdd = () => {
    if (etunimi === '' || sukunimi === '') {
      alert('Please fill in the first and last name');
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO therapists (etunimi, sukunimi, terapiasuuntaus, sukupuoli, kaupunki, hinta, kuva) VALUES (?, ?, ?, ?, ?, ?, ?);',
        [etunimi, sukunimi, terapiasuuntaus, sukupuoli, kaupunki, hinta, kuva],
        () => {
          setEtunimi('');
          setSukunimi('');
          setTerapiasuuntaus('');
          setSukupuoli('');
          setKaupunki('');
          setHinta('');
          setKuva('');
          getTherapists();
        }
      );
    });
  };

  // terapeutin tietojen muokkaus -toiminto
  const handleUpdate = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE therapists SET etunimi = ?, sukunimi = ?, terapiasuuntaus = ?, sukupuoli = ?, kaupunki = ?, hinta = ?, kuva = ? WHERE id = ?;',
        [etunimi, sukunimi, terapiasuuntaus, sukupuoli, kaupunki, hinta, kuva, id],
        () => {
          setEtunimi('');
          setSukunimi('');
          setTerapiasuuntaus('');
          setSukupuoli('');
          setKaupunki('');
          setHinta('');
          setKuva('');
          getTherapists();
        }
      );
    });
  };

  // terapeutin tietojen poisto -toiminto
  const handleDelete = (id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE , WHERE id = ?;', [id], () => {
        getTherapists();
        });
      });
    };
        
      const handleImagePicker = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setKuva(result.uri);
        }
      };
        
      return (
        <View style={{flex: 1, backgroundColor: 'darkslategrey'}}>
         <ScrollView>
        <View style={styles.addContainer}>
        { /* input-kentät tiedoille */}
        <Input 
          placeholder='Etunimi'
          onChangeText={(value) => setEtunimi(value)}
          value={etunimi}
        />
        <Input
          placeholder='Sukunimi'
          onChangeText={(value) => setSukunimi(value)}
          value={sukunimi}
        />
        <Input
          placeholder='Terapiasuuntaus'
          onChangeText={(value) => setTerapiasuuntaus(value)}
          value={terapiasuuntaus}
        />
        <Input
          placeholder='Sukupuoli'
          onChangeText={(value) => setSukupuoli(value)}
          value={sukupuoli}
        />
        <Input
          placeholder='Kaupunki'
          onChangeText={(value) => setKaupunki(value)}
          value={kaupunki}
        />
        <Input
          placeholder='Hinta'
          onChangeText={(value) => setHinta(value)}
          value={hinta}
        />
        <Button title='Lisää kuva'onPress={handleImagePicker} buttonStyle={styles.button}/>
        <Button title='LISÄÄ TERAPEUTTI' onPress={handleAdd} buttonStyle={styles.button}/>
        </View> 

        { /* näitä ei tarvinnutkaan näytettäväksi sovelluksessa!

        {therapists.map((therapist) => (
        <ListItem key={therapist.id} bottomDivider>
          <Avatar source={{ uri: therapist.kuva }} />
          <ListItem.Content style={styles.container}>
          <ListItem.Title>{therapist.etunimi} {therapist.sukunimi}</ListItem.Title>
          <ListItem.Subtitle>{therapist.terapiasuuntaus}</ListItem.Subtitle>
          <ListItem.Subtitle>{therapist.sukupuoli}</ListItem.Subtitle>
          <ListItem.Subtitle>{therapist.kaupunki}</ListItem.Subtitle>
          <ListItem.Subtitle>{therapist.hinta} €/h</ListItem.Subtitle>
          </ListItem.Content>
            <Button
            title='Edit'
            onPress={() => handleUpdate(therapist.id)}
            buttonStyle={styles.button}
            />
            <Button
            title='Delete'
            onPress={() => handleDelete(therapist.id)}
            buttonStyle={styles.button}
            /> 
        </ListItem>
        ))} */ }
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
          addContainer: {
            backgroundColor: 'darkslategrey',
            padding: 10,
            borderRadius: 5,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          },
          button: {
            color: 'white',
            backgroundColor: 'darkcyan',
            margin: 10,
          },
        });