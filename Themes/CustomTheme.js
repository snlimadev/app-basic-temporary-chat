import { createTheme } from '@rneui/themed';

const customTheme = createTheme({
  lightColors: { primary: '#00A2E8' },

  darkColors: { primary: '#00A2E8' },

  components: {
    Text: {
      style: {
        paddingBottom: 10,
      },
    },
    Button: {
      radius: 10,
      containerStyle: {
        paddingVertical: 5,
        paddingHorizontal: 10,
      },
    },
    Input: {
      labelStyle: {
        paddingBottom: 10,
      },
      inputContainerStyle: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 4,
        paddingHorizontal: 10,
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 10,
      },
    },
    Icon: {
      style: {
        paddingVertical: 4,
        paddingHorizontal: 10,
      },
      containerStyle: {
        borderRadius: 20,
        paddingHorizontal: 6,
      },
      disabledStyle: {
        backgroundColor: 'transparent',
      },
    },
  },

  mode: 'light',
});

export default customTheme;