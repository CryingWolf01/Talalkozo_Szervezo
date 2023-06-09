import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import PasswordTextField from "../../components/PasswordTextField";
import { COLORS } from "../../config/theme";
import { User } from "../../shared/types";
import { ArrowForward } from "@material-ui/icons";

const useStyles = makeStyles(
  {
    root: {
      display: "flex",
      justifyContent: "center",
      background: COLORS.lighterGrey,
    },
  },
  {
    name: "Login",
  }
);

const Login = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const {
    control,
    register,
    watch,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const auth = getAuth();
  const [authing, setAuthing] = useState<boolean>(false);

  const signInWithEmailPassword = async () => {
    setAuthing(true);
    await signInWithEmailAndPassword(auth, watch("email"), watch("password"))
      .then((response) => {
        navigate("/");
        setAuthing(false);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar(t("common:notification.login.failure"), {
          variant: "error",
        });
        setAuthing(false);
      });
  };

  return (
    <Box className={classes.root}>
      <Loading open={authing} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        height="100vh"
        maxWidth={500}
      >
        <Typography variant="h1">{t("login.appName")}</Typography>
        <Card component="form" elevation={10} style={{ borderRadius: 10 }}>
          <CardHeader title={t("login.title")} />
          <CardContent style={{ paddingTop: 0 }}>
            <TextField
              {...register("email", {
                required: t("validation.required").toString(),
              })}
              label={t("login.username")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: t("validation.required").toString() }}
              render={({ field: { onChange, value } }) => (
                <PasswordTextField
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  label={t("login.password")}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <Link to={"/reset-password"}>Jelszó emlékeztető küldése</Link>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <Button
                variant="contained"
                onClick={signInWithEmailPassword}
                color="primary"
                style={{ height: 35, margin: 2 }}
              >
                {t("login.title")}
              </Button>
              <Button
                component={Link}
                to="/registration"
                color="primary"
                style={{ height: 35, margin: 2 }}
                endIcon={<ArrowForward />}
              >
                {t("Regisztráció")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
