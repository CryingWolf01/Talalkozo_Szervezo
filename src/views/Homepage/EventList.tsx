import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import EventRow from "./EventRow";
import { getEventList } from "../../shared/network/events.api";

const EventList = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [eventList, setEventList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    const res = await getEventList();
    setEventList([...res]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Container maxWidth="lg">
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
        <>
          {eventList.length === 0 ? (
            <Box style={{ marginBottom: "20px" }}>
              <Typography variant="h5" align="center" color="secondary">
                {t("noItem")}
              </Typography>
            </Box>
          ) : (
            <>
              {eventList.length &&
                eventList.map((event) => <EventRow event={event} />)}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default EventList;
