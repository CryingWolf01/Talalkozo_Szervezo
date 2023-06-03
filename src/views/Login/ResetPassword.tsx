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
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { COLORS } from "../../config/theme";
import { User } from "../../shared/types";

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

const ResetPassword = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<User>();
  const navigate = useNavigate();

  const auth = getAuth();
  const [authing, setAuthing] = useState<boolean>(false);

  const resetPassword = async () => {
    setAuthing(true);
    await sendPasswordResetEmail(auth, watch("email"))
      .then((response) => {
        setAuthing(false);
        enqueueSnackbar(t("common:notification.passwordReset.success"), {
          variant: "success",
        });
      })
      .catch((error) => {
        console.error(error);
        setAuthing(false);
        enqueueSnackbar(t("common:notification.registration.failure"), {
          variant: "error",
        });
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
        <Card
          component="form"
          elevation={10}
          style={{ borderRadius: 10, minWidth: 450 }}
        >
          <CardHeader title={t("Jelszó emlékeztető küldése")} />
          <CardContent style={{ paddingTop: 0 }}>
            <TextField
              {...register("email", {
                required: t("validation.required").toString(),
              })}
              label={t("login.username")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
            >
              <Button
                variant="contained"
                onClick={resetPassword}
                color="primary"
                style={{ height: 35, margin: 2 }}
              >
                {t("Küldés")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ResetPassword;
