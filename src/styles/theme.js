export const theme = {
  colorScheme: "light",
  components: {
    Button: {
      styles: {
        root: {
          backgroundColor: "#1c3881",
          color: "#FFFFFF",
          ":hover": {
            backgroundColor: "#005E9E",
            color: "#FFFFFF",
          },
        },
      },
    },
    DatePickerInput: {
      styles: {
        day: {
          "&[data-selected], &[data-selected]:hover": {
            backgroundColor: "#1C3881",
            color: "white",
          },
        },
      },
    },
    DateInput: {
      styles: {
        day: {
          "&[data-selected], &[data-selected]:hover": {
            backgroundColor: "#1C3881",
            color: "white",
          },
        },
      },
    },
    MonthPickerInput: {
      styles: {},
    },
  },
};
