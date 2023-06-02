import { useSnackbar } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Box, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Event } from "../../shared/types";
import { getEventById, modifyEvent } from "../../shared/network/events.api";
import EventForm from "./components/EventForm";
import { format } from "date-fns";

const EventModify = () => {
  const { t } = useTranslation();
  const history = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get("id");
  const form = useForm<Event>();
  const { enqueueSnackbar } = useSnackbar();
  const [event, setEvent] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getEventById(id ? id : "");
    setEvent({ ...res });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmitModify = async (values: Event) => {
    try {
      await modifyEvent(id ? id : "", {
        ...values,
        date: format(new Date(values.date), "yyyy-MM-dd"),
      });
      enqueueSnackbar(
        t("common:notification.update.success", {
          subject: t("event.subject"),
        }),
        {
          variant: "success",
        }
      );
      history(-1);
    } catch {
      enqueueSnackbar(
        t("common:notification.update.failure", {
          subject: t("event.subject"),
        }),
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Container maxWidth="md">
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="300px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmitModify)}>
            <EventForm event={event} />
          </form>
        </FormProvider>
      )}
    </Container>
  );
};

export default EventModify;
