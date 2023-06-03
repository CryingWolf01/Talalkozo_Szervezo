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
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import PasswordTextField from "../../components/PasswordTextField";
import { COLORS } from "../../config/theme";
import { createUser } from "../../shared/network/users.api";
import { User } from "../../shared/types";
import { ArrowBack } from "@material-ui/icons";

const useStyles = makeStyles(
  {
    root: {
      display: "flex",
      justifyContent: "center",
      background: COLORS.lighterGrey,
    },
  },
  {
    name: "Regitration",
  }
);

const Registration = () => {
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

  const createAccount = async () => {
    setAuthing(true);
    await createUserWithEmailAndPassword(
      auth,
      watch("email"),
      watch("password")
    )
      .then((response) => {
        setAuthing(false);
      })
      .catch((error) => {
        console.error(error);
        setAuthing(false);
        enqueueSnackbar(t("common:notification.registration.failure"), {
          variant: "error",
        });
      });
    await createUser({
      name: watch("name"),
      uid: auth.currentUser?.uid,
      email: watch("email"),
      password: watch("password"),
    });
    enqueueSnackbar(t("common:notification.registration.success"), {
      variant: "success",
    });
    navigate("/");
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
          <CardHeader title={t("Regisztráció")} />
          <CardContent style={{ paddingTop: 0 }}>
            <TextField
              {...register("name", {
                required: t("validation.required").toString(),
              })}
              label={t("user.formValues.name")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
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
              <Button
                component={Link}
                to="/login"
                color="primary"
                style={{ height: 35, margin: 2 }}
                startIcon={<ArrowBack />}
              >
                {t("Bejelentkezés")}
              </Button>
              <Button
                variant="contained"
                onClick={createAccount}
                color="primary"
                style={{ height: 35, margin: 2 }}
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

export default Registration;
