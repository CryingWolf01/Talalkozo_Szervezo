import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import { format } from "date-fns";
import { createEvent } from "../../shared/network/events.api";
import { Event } from "../../shared/types";
import EventForm from "./components/EventForm";

const EventCreate = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const form = useForm<Event>();

  const onSubmitCreate = async (values: Event) => {
    try {
      await createEvent({
        ...values,
        date: format(new Date(values.date), "yyyy-MM-dd"),
      });
      enqueueSnackbar(
        t("common:notification.create.success", {
          subject: t("event.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch (e) {
      enqueueSnackbar(
        t("common:notification.create.failure", {
          subject: t("event.subject"),
        }),
        { variant: "error" }
      );
    }
  };

  return (
    <Container maxWidth="lg">
      <form onSubmit={form.handleSubmit(onSubmitCreate)}>
        <FormProvider {...form}>
          <EventForm />
        </FormProvider>
      </form>
    </Container>
  );
};

export default EventCreate;
