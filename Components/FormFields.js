import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Input, Button } from '@rneui/themed';
import { SelectList } from 'react-native-dropdown-select-list';
import Ionicons from '@expo/vector-icons/Ionicons';

import styles from '../css/styles';

export default function FormFields(props) {
  const [focusedInput, setFocusedInput] = useState(null);

  //#region Set drop down values from 2 to 16 / Define os valores do drop down de 2 até 16
  const data = [];

  for (let i = 2; i <= 16; i++) {
    data.push({ key: i, value: `${i} users` });
  }
  //#endregion

  return (
    <ScrollView
      contentContainerStyle={styles.containerScrollView}
      keyboardShouldPersistTaps='handled'
    >
      {
        (props.buttonText === 'CREATE') ? (
          <View style={styles.dropDownContainer}>
            <Text style={[styles.dropDownLabel, styles.fwBold, styles.labelColor]}>
              Max Room Size
            </Text>

            <SelectList
              setSelected={props.setMaxRoomSize}
              data={data}
              defaultOption={data[0]}
              save='key'
              search={false}
              maxHeight={250}
              inputStyles={[styles.dropDownInput, styles.labelColor]}
              dropdownTextStyles={[styles.dropDownInput, styles.labelColor]}
              arrowicon={<Ionicons name='chevron-down' size={20} color={'#86939E'} />}
              boxStyles={{ borderColor: '#86939E' }}
            />
          </View>
        ) : (
          <Input
            label='Room Code'
            placeholder='Enter the room code'
            value={props.roomCode}
            onChangeText={props.setRoomCode}
            keyboardType='number-pad'
            maxLength={6}
            autoFocus={true}
            onFocus={() => setFocusedInput('roomCode')}
            onBlur={() => setFocusedInput(null)}
            inputContainerStyle={[(focusedInput === 'roomCode') && styles.focusedInput]}
          />
        )
      }

      <Input
        label='Username'
        placeholder='Choose your username'
        value={props.userName}
        onChangeText={props.setUserName}
        onFocus={() => setFocusedInput('userName')}
        onBlur={() => setFocusedInput(null)}
        inputContainerStyle={[(focusedInput === 'userName') && styles.focusedInput]}
      />

      <Button
        title={props.buttonText}
        size='lg'
        onPress={props.buttonAction}
        disabled={props.buttonDisabled}
      />
    </ScrollView>
  );
}