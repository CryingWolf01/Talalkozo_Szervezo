import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import { User } from "../../../shared/types";

type Props = { user?: any };

const UserForm = ({ user }: Props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, setValue } = useFormContext<User>();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={t("user.formValues.name")}
            defaultValue={user?.name || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("name", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.name && true}
            helperText={formState.errors?.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("user.formValues.email")}
            defaultValue={user?.email || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("email", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.email && true}
            helperText={formState.errors?.email?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("user.formValues.password")}
            defaultValue={""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("password", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.password && true}
            helperText={formState.errors?.password?.message}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center" m={2} gridGap={8}>
        <Button color="primary" variant="text" onClick={() => history(-1)}>
          {t("common:button.cancel")}
        </Button>
        <Button type="submit" color="primary">
          {t("common:button.save")}
        </Button>
      </Box>
    </Container>
  );
};

export default UserForm;
