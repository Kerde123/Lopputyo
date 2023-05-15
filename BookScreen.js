import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import SearchScreen from './SearchScreen';

export default function BookScreen({ route }) {
  const { therapist } = route.params; // haetaan terapeutin tiedot 
  const navigation = useNavigation(); // navigaatiotoiminto
  const [selectedDate, setSelectedDate] = useState(null); // päivämäärätilamuuttujien alustaminen
  const [selectedTime, setSelectedTime] = useState(null);

  // kutsutaan, kun käyttäjä painaa päivämäärää kalenterissa
  const onDayPress = day => { 
    setSelectedDate(day.dateString);
  };

  const renderTimeSlot = time => {
    const timeSlot = `${time}:00 - ${time + 1}:00`; // timeslottien muodostus
    let timeSlotStyle = styles.availableTimeSlot; 

    // kun timeslot valittu -> laitetaan tyyliasetus sen mukaan
    if (timeSlot === selectedTime) { 
      timeSlotStyle = [styles.availableTimeSlot, styles.selectedTimeSlot];
    }

    return (
      <TouchableOpacity
        key={time}
        style={timeSlotStyle}
        onPress={() => {
          setSelectedTime(timeSlot); // kun käyttäjä painaa painiketta, asetetaan timeslotin tilaksi 'selectedTime'
        }}
      >
        <Text style={styles.timeSlotText}>{timeSlot}</Text>
      </TouchableOpacity>
    );
  };

  const timeSlots = []; //taulukon alustus
  // luodaan timeslotit klo 9-17
  for (let i = 9; i < 17; i++) { 
    timeSlots.push(renderTimeSlot(i)); 
  } // renderöity aikaväli taulukkoon

  // tapahtumankäsittelijä varaa-buttonille
  const handleBooking = () => { 
    if (selectedDate && selectedTime) {
      Alert.alert(
        'Oletko varma että haluat varata kyseisen ajan?',
        '',
        [
          {
            text: 'Ei',
            style: 'cancel'
          },
          {
            text: 'Kyllä',
            onPress: () => {
              Alert.alert( 
                'Aika varattu',
                'Varausvahvistus lähetetään sähköpostiisi.',
                [
                  {
                    text: 'OK',
                    onPress: () => { // tämä on kuvitteellinen tapahtuma, konfirmaationäyttöä en ole tähän luonut
                      navigation.navigate('ConfirmationScreen', { 
                        therapist,
                        date: selectedDate,
                        timeSlot: selectedTime,
                      });
                    },
                  },
                ]
              );
            },
          },
        ]
      );
    } else {
      Alert.alert('Valitse ensin päivä ja aika');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#2e64e5',
            },
          }}
          firstDay={1}
          hideExtraDays={true}
           // päivien renderöinti
          renderDay={({ date, marking }) => (
            <View style={styles.dayContainer}>
              <Text style={styles.dayText}>
                {date.format('dd').toUpperCase()}
              </Text>
              <Text style={styles.dateText}>{date.format('D')}</Text>
            </View>
          )}
        />
        <Text style={styles.text}>
          Valitse sopiva aika {therapist.etunimi} {therapist.sukunimi} -vastaanotolle
        </Text>
        { /* timeslotien renderöinti */}
        <View style={styles.timeSlotsContainer}>{timeSlots}</View> 
        {/*varaa-button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Varaa</Text> 
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: 'darkslategrey',
  },
  container: {
    flex: 1,
    backgroundColor: 'darkslategrey',
    padding: 20,
    paddingTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
  },
  dayContainer: {
    alignItems: 'center',
    padding: 10,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  dateText: {
    fontSize: 14,
    color: 'white',
  },
  availableTimeSlot: {
    backgroundColor: 'darkcyan',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  selectedTimeSlot: {
    backgroundColor: 'blue', 
  },
  unavailableTimeSlot: {
    backgroundColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  timeSlotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  timeSlotsContainer: {
    marginVertical: 20,
  },
  bookButton: {
    backgroundColor: 'darkcyan',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
