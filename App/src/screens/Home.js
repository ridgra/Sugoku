import React, { useState } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity } from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import styleSheet from '../assets/styleSheet';

export default ({ navigation }) => {
  const [level, setLevel] = useState('easy');
  const [username, setUsername] = useState('');

  var radio_props = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];
  return (
    <View style={styleSheet.container}>
      <View style={{ justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styleSheet.textView}>Enter your name:</Text>
          <TextInput
            onChangeText={() => {}}
            style={styleSheet.inputName}
            placeholder="Pikachu"
            value={username}
            onChangeText={setUsername}
          ></TextInput>
        </View>
        <View
          style={{
            marginTop: 10,
            alignItems: 'center',
          }}
        >
          <Text style={styleSheet.textView}>Select level</Text>
          <View>
            <RadioForm
              style={{
                margin: 20,
                padding: 10,
                borderWidth: 0.3,
                borderColor: '#ff9a00',
              }}
              buttonColor={'#ff9a00'}
              formHorizontal={true}
              radio_props={radio_props}
              initial={0}
              buttonSize={10}
              buttonOuterSize={20}
              labelHorizontal={false}
              onPress={(value) => {
                setLevel(value);
              }}
            ></RadioForm>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Game', {
              username,
              level,
            })
          }
          style={styleSheet.buttonPrimary}
        >
          <Text style={styleSheet.buttonPrimaryText}>Play</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Records', {
            })
          }
          style={styleSheet.buttonPrimary}
        >
          <Text style={styleSheet.buttonPrimaryText}>Records</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
