import {
  IconButton,
  TextField,
  InputAdornment,
  TextFieldProps,
} from "@material-ui/core";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  {
    input: {
      "& .MuiOutlinedInput-adornedEnd": {
        paddingRight: "0 !important",
      },
    },
  },
  {
    name: "PasswordTextField",
  }
);

const PasswordTextField = (props: TextFieldProps) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);

  return (
    <TextField
      {...props}
      className={classes.input}
      type={show ? "text" : "password"}
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment
            position="end"
            style={{ position: "absolute", right: 12 }}
          >
            <IconButton onClick={() => setShow((prev) => !prev)}>
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordTextField;