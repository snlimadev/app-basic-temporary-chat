import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, Input, Button } from '@rneui/base';
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
      contentContainerStyle={[styles.containerScrollView, styles.pvSmall]}
      style={props.themeBgColor}
      keyboardShouldPersistTaps='handled'
    >
      {
        (props.buttonText === 'CREATE') ? (
          <View style={[styles.phSmall, styles.pbMedium]}>
            <Text style={[styles.dropDownLabel, styles.fwBold, styles.labelColor, styles.pbSmall]}>
              Max Room Size
            </Text>

            <SelectList
              setSelected={props.setMaxRoomSize}
              data={data}
              defaultOption={data[0]}
              save='key'
              search={false}
              maxHeight={250}
              inputStyles={[styles.dropDownInput, props.themeTextColor]}
              dropdownTextStyles={[styles.dropDownInput, props.themeTextColor]}
              arrowicon={<Ionicons name='chevron-down' size={20} color={'gray'} />}
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
            labelStyle={styles.pbSmall}
            inputStyle={props.themeTextColor}
            inputContainerStyle={[
              (focusedInput === 'roomCode') && styles.focusedInput,
              styles.inputStyle,
              styles.roundedBorder,
              styles.pvTiny,
              styles.phSmall
            ]}
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
        labelStyle={styles.pbSmall}
        inputStyle={props.themeTextColor}
        inputContainerStyle={[
          (focusedInput === 'userName') && styles.focusedInput,
          styles.inputStyle,
          styles.roundedBorder,
          styles.pvTiny,
          styles.phSmall
        ]}
      />

      <Button
        title={props.buttonText}
        size='lg'
        buttonStyle={styles.roundedBorder}
        containerStyle={[styles.phSmall, styles.pvSmall]}
        onPress={props.buttonAction}
        disabled={props.buttonDisabled}
      />
    </ScrollView>
  );
}