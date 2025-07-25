import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  //#region General styles / Estilos gerais
  containerScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 10,
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

  focusedInput: {
    borderColor: '#00A2E8',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  //#endregion

  //#region Drop down styles / Estilos do drop down
  dropDownContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },

  dropDownLabel: {
    fontSize: 15,
  },

  dropDownInput: {
    fontSize: 17,
  },
  //#endregion

  //#region Card styles / Estilos do card
  cardHeader: {
    borderBottomWidth: 1,
    borderColor: '#CCCCCC40',
    paddingBottom: 5,
  },

  cardBody: {
    paddingTop: 5,
    paddingBottom: 0,
  },

  cardFooter: {
    fontSize: 12,
    textAlign: 'right',
    paddingBottom: 0,
  },
  //#endregion

  //#region Chat screen exclusive styles / Estilos exclusivos da tela de chat
  chatContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },

  messageContainer: {
    maxHeight: 120,
    paddingVertical: 4,
  },

  messageInput: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingLeft: 10,
  },
  //#endregion
});

export default styles;