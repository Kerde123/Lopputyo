import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input } from '@rneui/themed';
import * as SQLite from 'expo-sqlite';
import HomeScreen from './HomeScreen';
import { Badge } from '@rneui/themed';

const db = SQLite.openDatabase('users.db'); // avataan users.db-tietokanta

export default function StartScreen({ route, navigation }) { // reititys ja navigointiominaisuudet
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(route.params?.isLoggedIn || false); // tarkistetaan kirjautumisen tila, siirretään propseina Appiin

  
  // taulujen luonti tietokantaan
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, username TEXT, password TEXT);',
      []
    );
  });

  const handleRegister = () => { // rekisteröinnin hallinta
    if (firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
      alert('Täytä kaikki vaaditut kentät');
      return;
    }
  
    // select-kysely, katsotaan onko käyttäjätunnus jo tietokannassa
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?;',
        [username],
        (_, { rows }) => {
          console.log('SELECT query result:', rows);
          if (rows.length > 0) {
            alert('Käyttäjätunnus on jo käytössä');
            return;
          } else {
            // insert-kysely -> rekisteröityminen
            tx.executeSql(
              'INSERT INTO users (firstName, lastName, email, username, password) VALUES (?, ?, ?, ?, ?);',
              [firstName, lastName, email, username, password],
              (_, { rowsAffected }) => {
                console.log('INSERT query result:', rowsAffected);
                if (rowsAffected > 0) {
                  alert('Rekisteröityminen onnistui!');
                  setIsLoggedIn(true);
                  navigation.navigate('Home');
                } else {
                  alert('Rekisteröityminen epäonnistui.');
                }
              }
            );
          }
        }
      );
    });
  };

  const handleLogin = () => { // kirjautumisen hallinta, onko salasana ja käyttäjätunnus oikein ym.
    if (username === '' || password === '') {
      alert('Kirjoita käyttäjätunnuksesi ja salasanasi');
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? AND password = ?;',
        [username, password],
        (_, { rows }) => {
          if (rows.length === 1) {
            setIsLoggedIn(true);
            navigation.navigate('Home');
          } else {
            alert('Virheellinen käyttäjätunnus tai salasana');
          }
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PSYKOTERAPIAHAKU</Text>
      <Badge status= 'success' textStyle={{color: 'white'}} value='Tervetuloa!'></Badge>
      <Text style={styles.textstyle}>Kirjaudu tai rekisteröidy sovellukseen päästäksesi hakemaan sopivaa psykoterapeuttia</Text>
      {/* Jos käyttäjä ei ole kirjautunut sisään, tulee etunimi, sukunimi ja sähköposti syötettäväksi */}
      {!isLoggedIn && ( 
        <>
          <Input
            placeholder="Etunimi"
            onChangeText={setFirstName}
            value={firstName}
          />
          <Input
            placeholder="Sukunimi"
            onChangeText={setLastName}
            value={lastName}
          />
          <Input
            placeholder="Sähköposti"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </>
      )}
       {/* Käyttäjätunnuksen ja salasanan syöttö */}
      <Input 
        placeholder="Käyttäjätunnus"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
      />
      <Input
        placeholder="Salasana"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
      />
      { /* painikkeet ja tekstit sen mukaan, onko käyttäjä kirjautunut/rekisteröitynyt */}
      {isLoggedIn ? ( 
        <Button buttonStyle ={styles.button} title="Kirjaudu" onPress={handleLogin} />
      ) : (
        <Button buttonStyle ={styles.button} title="Rekisteröidy" onPress={handleRegister} />
      )}
      <Text style={styles.text}>
        {isLoggedIn ? 'Etkö ole vielä rekisteröitynyt?' : 'Onko sinulla jo tili?'}
      </Text>
      <Button
        title={isLoggedIn ? 'Rekisteröidy nyt' : 'Kirjaudu palveluun'}
        onPress={() => setIsLoggedIn(!isLoggedIn)}
        type="clear"
      />
    </View>
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
  button: {
    backgroundColor: 'darkseagreen',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 25,
    color: 'darkslategray'
  },
});
