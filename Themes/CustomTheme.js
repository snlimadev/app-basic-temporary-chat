import { createTheme } from '@rneui/themed';

const customTheme = createTheme({
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
    Dialog: (props, theme) => ({
      overlayStyle: {
        borderRadius: 10,
        backgroundColor: theme.colors.white,
        borderWidth: 0.5,
        borderColor: theme.colors.grey4,
      },
      backdropStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    }),
    DialogTitle: (props, theme) => ({
      titleStyle: {
        textAlign: 'center',
        color: theme.colors.black,
      },
    }),
  },
  mode: 'light',
});

export default customTheme;