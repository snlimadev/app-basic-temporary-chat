import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //#region General styles / Estilos gerais
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  textCenter: {
    textAlign: 'center',
  },

  fwBold: {
    fontWeight: 'bold',
  },

  labelColor: {
    color: '#86939E',
  },

  roundedBorder: {
    borderRadius: 10,
  },
  //#endregion

  //#region Top bar styles / Estilos da barra superior
  topBarColor: {
    backgroundColor: '#00A2E8',
  },

  topBarText: {
    color: 'white',
  },

  topBarCustomTitle: {
    fontSize: 20,
  },
  //#endregion

  //#region Dark and light theme styles / Estilos dos temas claro e escuro
  darkThemeBgColor: {
    backgroundColor: 'black',
  },

  darkThemeTextColor: {
    color: 'white',
  },

  lightThemeBgColor: {
    backgroundColor: 'white',
  },

  lightThemeTextColor: {
    color: 'black',
  },
  //#endregion

  //#region Padding styles / Estilos que definem o espaçamento interno
  pvTiny: {
    paddingVertical: 4,
  },

  pvSmall: {
    paddingVertical: 10,
  },

  phSmall: {
    paddingHorizontal: 10,
  },

  ptTiny: {
    paddingTop: 5,
  },

  ptSmall: {
    paddingTop: 10,
  },

  prTiny: {
    paddingRight: 6,
  },

  pbTiny: {
    paddingBottom: 5,
  },

  pbSmall: {
    paddingBottom: 10,
  },

  pbMedium: {
    paddingBottom: 20,
  },

  plTiny: {
    paddingLeft: 6,
  },

  plSmall: {
    paddingLeft: 10,
  },
  //#endregion

  //#region Drop down styles / Estilos do drop down
  dropDownLabel: {
    fontSize: 15,
  },

  dropDownInput: {
    fontSize: 17,
  },
  //#endregion

  //#region Text input styles / Estilos dos campos de texto
  inputStyle: {
    borderWidth: 1,
  },

  focusedInput: {
    borderColor: '#00A2E8',
  },
  //#endregion

  //#region Chat screen exclusive styles / Estilos exclusivos da tela de chat
  chatContainer: {
    flexGrow: 1,
  },

  messageContainer: {
    maxHeight: 120,
  },
  //#endregion

  //#region Card styles / Estilos do card
  cardHeader: {
    borderBottomWidth: 1,
    borderColor: '#DEDDE0',
  },

  cardFooter: {
    fontSize: 12,
    textAlign: 'right',
  },
  //#endregion
});

export default styles;