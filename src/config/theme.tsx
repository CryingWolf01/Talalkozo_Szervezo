import { createTheme, emphasize, alpha } from "@material-ui/core/styles";

export const COLORS = {
  redHighlight: "#B73225",
  blueMinded: "#004E7C",
  maroon6: "#591C0B",
  greyWater: "#5C5F58",
  lighterGrey: "#DCE1E3",

  cloudBlue: "#E7EEF8",
  cloudBlueDark: "#E9E9F0",
  cloudBlueLight: "#F3F7FC",
  mortarGray: "#A6A5B3",
  mortarGrayDark: "#807F8A",
  mortarGrayLight: "#EDEDF0",
  carbonGray: "#404040",
  mintGreen: "#27C19E",
  mintGreenLight: "#D4F3EC",

  brickRedLight: "#FEEEE9",
  milk: "#F6F7F8",
};

export const BOX_SHADOW = "0px 15px 25px rgba(55, 55, 167, 0.15)";

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.blueMinded,
      light: COLORS.cloudBlue,
    },
    secondary: {
      main: COLORS.greyWater,
      light: COLORS.lighterGrey,
    },
    background: {
      default: COLORS.milk,
    },
    error: {
      main: COLORS.redHighlight,
    },
    success: {
      main: COLORS.mintGreen,
      light: COLORS.mintGreenLight,
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        a: {
          color: COLORS.blueMinded,
        },
      },
    },
    MuiInput: {
      underline: {
        "& :after": {
          borderBottomColor: "green",
        },
      },
    },
    MuiFormControlLabel: {
      labelPlacementStart: {
        marginLeft: 0,
        marginRight: 0,
      },
    },
    MuiFormControl: {
      marginDense: {
        marginTop: 0,
        marginBottom: 0,
      },
    },

    MuiChip: {
      colorPrimary: {
        backgroundColor: COLORS.cloudBlueLight,
        color: COLORS.blueMinded,
      },
      label: {
        fontSize: 14,
        fontWeight: "bold",
      },
      deleteIconColorPrimary: {
        color: COLORS.blueMinded,
        "&:hover": { color: alpha(COLORS.blueMinded, 0.8) },
      },
      deletableColorPrimary: {
        "&:focus": {
          backgroundColor: emphasize(COLORS.cloudBlueLight),
        },
      },
    },
    MuiTooltip: {
      tooltip: {
        fontSize: 14,
      },
    },
    MuiButton: {
      label: {
        textTransform: "unset",
      },
      root: {
        textTransform: "unset",
      },
      contained: {
        boxShadow: "unset",
      },
    },
    MuiSwitch: {
      root: {
        "& + .MuiFormControlLabel-label": {
          margin: "0 4px",
        },
      },
    },
  },
  props: {
    MuiTextField: {
      margin: "none",
      fullWidth: true,
      variant: "filled",
      size: "small",
    },
    MuiButton: {
      variant: "contained",
      color: "primary",
    },
  },
});

export default theme;