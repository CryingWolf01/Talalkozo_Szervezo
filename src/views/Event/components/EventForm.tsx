import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import { Event } from "../../../shared/types";
import { KeyboardDatePicker } from "@material-ui/pickers";

type Props = { event?: any };

const EventForm = ({ event }: Props) => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { formState, register, setValue } = useFormContext<Event>();

  useEffect(() => {
    if (event) {
      setValue("title", event.title);
      setValue("description", event.description);
    }
  }, [event, setValue]);

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} alignContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            label={t("event.formValues.title")}
            defaultValue={event?.title || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("title", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            error={formState.errors.title && true}
            helperText={formState.errors?.title?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="date"
            defaultValue={event?.date ? new Date(event.date) : new Date()}
            rules={{ required: t("validation.required").toString() }}
            render={({ field, fieldState }) => (
              <KeyboardDatePicker
                {...field}
                ref={undefined}
                variant="inline"
                label={t("event.formValues.date")}
                format="yyyy.MM.dd"
                InputLabelProps={{ shrink: true, required: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                autoOk
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label={t("event.formValues.description")}
            defaultValue={event?.description || ""}
            InputLabelProps={{ shrink: true, required: true }}
            {...register("description", {
              required: {
                value: true,
                message: t("common:validation.required"),
              },
            })}
            multiline
            rows={3}
            error={formState.errors.description && true}
            helperText={formState.errors?.description?.message}
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

export default EventForm;
