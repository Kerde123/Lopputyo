import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Divider } from '@rneui/themed';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function InfoScreen() {
  const navigation = useNavigation();

  // funktio, joka navigoi Search-screenille
  const handlePress = () => {
    navigation.navigate('Search');
  };

  return (
    // scrollView-komponentti, sallii sisällön vierittämisen
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* lottieView-komponentti animaation näyttämiseen */}
        <LottieView
          style={styles.animation}
          source={require('./opener-loading.json')}
          autoPlay
          loop
        />
        <View style={styles.titleContainer}>
          {/* otsikon teksti */}
          <Text h3 style={styles.title}>
            TERVETULOA TERAPEUTTIHAKUUN
          </Text>
        </View>
        {/* divider-komponentti -> erottaa otsikon muusta sisällöstä */}
        <Divider style={styles.divider} />
        {/* tekstikomponentti -> kuvailee sovelluksen tarkoitusta */}
        <Text style={styles.description}>
          Tämä sovellus auttaa sinua löytämään psykoterapeutin läheltäsi ja varaamaan ajan helposti ja nopeasti. 
          Löydät laajan valikoiman eri osa-alueisiin erikoistuneita psykoterapeutteja, joilla on kokemusta erilaisten mielenterveyteen liittyvien haasteiden käsittelystä.
        </Text>
        <Text style={styles.description}>
          Oli kyseessä sitten ahdistus, masennus, parisuhdeongelmat tai muu elämän haaste, voit etsiä sopivan psykoterapeutin ja varata ajan suoraan sovelluksen kautta.
        </Text>
        {/* button-komponentti -> navigoi Search-screenille buttonia painettaessa */}
        <Button
          title="Selaa terapeutteja"
          buttonStyle={styles.button}
          onPress={handlePress}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'darkslategrey',
  },
  container: {
    width: '90%',
    alignItems: 'center',
    paddingVertical: 30,
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  titleContainer: {
    backgroundColor: 'darkseagreen',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'darkslategrey',
  },
  title: {
    textAlign: 'center',
    color: '#1E2C22',
  },
  divider: {
    backgroundColor: 'darkseagreen',
    height: 2,
    width: '100%',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'darkseagreen',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'darkseagreen',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 25,
    color: 'darkslategray',
  },
});
